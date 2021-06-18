const container = document.querySelector('#content');
let productsList = [
    {
        id: 0,
        title: 'Процессор',
        icon: 'img/GPU.png',
        country: 'CША',
        quantity: 20,
        price: 10000,
    }
];

function closeModalWindow(){
    console.log(1)
    let modalDiv = document.querySelector('.modal-window')
    modalDiv.remove()
}

function createForm(el){
    if(el.closest('.add-new-product-btn')){
        console.log('add')
        let block = `
            <h3>Add product</h3>
            <form>
                <p>
                    <label>Title</label>
                    <input type="text">
                </p>
                <p>
                    <label>Icon url</label>
                    <input type="text">
                </p>
                <p>
                    <label>Country</label>
                    <input type="text">
                </p>
                <p>
                    <label>Quantity</label>
                    <input type="text">
                </p>
                <p>
                    <label>Price</label>
                    <input type="text">
                </p>
            </form>
        `;
        return block;

    }
    else if(el.closest('.edit')){
        console.log('edit')
    }
}

function createModalWindow(){
    let adminBlock = container.querySelector('.admin-block');
    let modalDiv = document.createElement('div');
    let cover = null;
    modalDiv.classList.add('modal-window');
    modalDiv.innerHTML = `
        <div class="cover"></div>
        <div class="modal">
            ${createForm(this)}
        </div>
    `
    document.body.prepend(modalDiv);
    cover = modalDiv.querySelector('.cover')
    cover.addEventListener('click', closeModalWindow)
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
    let addProductBtn = container.querySelector('.add-new-product-btn');
    let editBtn = container.querySelector('.edit');
    addProductBtn.addEventListener('click', createModalWindow);
    editBtn.addEventListener('click', createModalWindow)
}

function start(){
    let productsData = JSON.parse(localStorage.getItem('productsData'));
    if(productsData){
        productsList = productsData;
    }
    print()
}

start()