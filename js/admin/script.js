const container = document.querySelector('#content');
let productsList = [
];

let regEx = {
    text: /^[a-zA-Zа-яА-Я0-9-]{2,}$/,
    number: /^[0-9]{1,}$/,
    url: /^[a-zA-Zа-яА-Я0-9-_/]{1,}[.]{1}[a-z]{3,4}$/
}

function closeModalWindow(){
    let modalDiv = document.querySelector('.modal-window')
    modalDiv.remove()
}

function verification(e){
    e.preventDefault();
    let myTarget = e.target;
    let form = document.querySelector('.modal-window form');
    let inputs = form.querySelectorAll('input');
    let verificationStatus = true;
    let newProduct = {};
    for(let i=0; i<inputs.length; i++){
        let typeVerification = inputs[i].getAttribute('data-verification');
        let objKey = inputs[i].getAttribute('data-objKey');
        inputs[i].innerHTML = inputs[i].innerHTML.trim();
        if(regEx[typeVerification].test(inputs[i].value) === false){
            console.log(inputs[i].value+' Ошибка')
            verificationStatus = false;
        }
        if(typeVerification === 'number' && inputs[i].value === "0"){
            console.log(inputs[i].value+' Ошибка');
            verificationStatus = false;
        }
        newProduct[objKey] = inputs[i].value;
    }

    if(verificationStatus){
        if(myTarget.closest('#addProductToLocalStorage')){
            newProduct.id = productsList.length;
            productsList.push(newProduct);
            localStorage.setItem('productsData', JSON.stringify(productsList));
            start();
            closeModalWindow();
        }
        else if(myTarget.closest('#editProductFromLocalStorage')){
            let index = +myTarget.getAttribute('data-index');
            newProduct.id = index;
            productsList[index] = newProduct;
            localStorage.setItem('productsData', JSON.stringify(productsList));
            start();
            closeModalWindow();
        }
    }
}

function createForm(el){
    if(el.closest('.add-new-product-btn')){
        let block = `
            <h3>Add product</h3>
            <form>
                <p>
                    <label>Title</label>
                    <input type="text" data-verification="text" data-objKey="title">
                </p>
                <p>
                    <label>Icon url</label>
                    <input type="text" data-verification="url" data-objKey="icon">
                </p>
                <p>
                    <label>Country</label>
                    <input type="text" data-verification="text" data-objKey="country">
                </p>
                <p>
                    <label>Quantity</label>
                    <input type="text" data-verification="number" data-objKey="quantity">
                </p>
                <p>
                    <label>Price</label>
                    <input type="text" data-verification="number" data-objKey="price">
                </p>
                <p>
                    <label>Add new product</label>
                    <button id="addProductToLocalStorage" data-operation="add">Add</button>
                </p>
            </form>
        `;
        return block;
    }
    else if(el.closest('.edit')){
        let item = el.closest('.item')
        if(item){
            let id = item.getAttribute('data-id');
            let block = `
            <h3>edit product</h3>
            <form>
                <p>
                    <label>Title</label>
                    <input type="text" data-verification="text" value="${productsList[id].title}" data-objKey="title">
                </p>
                <p>
                    <label>Icon url</label>
                    <input type="text" data-verification="url" value="${productsList[id].icon}" data-objKey="icon">
                </p>
                <p>
                    <label>Country</label>
                    <input type="text" data-verification="text" value="${productsList[id].country}" data-objKey="country">
                </p>
                <p>
                    <label>Quantity</label>
                    <input type="text" data-verification="number" value="${productsList[id].quantity}" data-objKey="quantity">
                </p>
                <p>
                    <label>Price</label>
                    <input type="text" data-verification="number" value="${productsList[id].price}" data-objKey="price">
                </p>
                <p>
                    <label>Edit product</label>
                    <button id="editProductFromLocalStorage" data-operation="edit" data-index="${id}">Edit</button>
                </p>
            </form>
        `;
        return block;     
        }
    }
}

function deleteItem(el){
    let item = el.closest('.item');
    if(item){
        let arrId = item.getAttribute('data-id');
        productsList.splice(arrId,1);
        console.log(productsList)
        for(let i=0; i<productsList.length; i++){
            productsList[i].id = i;
        }
        localStorage.setItem('productsData', JSON.stringify(productsList));
        start();
    }
}

function createModalWindow(el){
    let adminBlock = container.querySelector('.admin-block');
    let modalDiv = document.createElement('div');
    let cover = null;
    let btn = null;
    modalDiv.classList.add('modal-window');
    modalDiv.innerHTML = `
        <div class="cover"></div>
        <div class="modal">
            ${createForm(el)}
        </div>
    `;

    document.body.prepend(modalDiv);
    cover = modalDiv.querySelector('.cover');
    btn = modalDiv.querySelector('button');
    btn.addEventListener('click', verification)
    cover.addEventListener('click', closeModalWindow);
}

function checkTarget(e){
    if(e.target.closest('.add-new-product-btn')||e.target.closest('.edit')){
        createModalWindow(e.target);
    }
    else if(e.target.closest('.delete')){
        deleteItem(e.target);
    }
}

function print(){
    let content = productsList.map(item => `
        <div class="item" data-id="${item.id}">
            <div>${item.id}</div>
            <div>${item.title}</div>
            <div>
                <div class="img-block">
                    <img src="${item.icon}">
                </div>
            </div>
            <div>${item.country}</div>
            <div>${item.quantity} шт</div>
            <div>${item.price}</div>
            <div>
                <button class="edit">Edit</button>
            </div>
            <div>
                <button class="delete">Delete</button>
            </div>
        </div>
    `);

    container.innerHTML = `
            <div class="admin-block">
                <h2>Admin page</h2>
                <div class="products-list">
                    <div class="item">
                        <div>id</div>
                        <div>Title</div>
                        <div>Icon</div>
                        <div>Country</div>
                        <div>Quantity</div>
                        <div>Price</div>
                        <div>Edit</div>
                        <div>Delete</div>
                    </div> 
                    ${content.join('')}
                </div>
                <button class="add-new-product-btn">Add product</button>
            </div>

    `;
    let adminBlock = container.querySelector('.admin-block');
    adminBlock.addEventListener('click', checkTarget);
}

function start(){
    let productsData = JSON.parse(localStorage.getItem('productsData'));
    if(productsData){
        productsList = productsData;
    }
    print()
}

start()