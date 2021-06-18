const container = document.querySelector('#content');
let productsList = [
    {
        id: 0,
        title: 'Процессор',
        icon: '',
        country: 'CША',
        quantity: 20,
        price: 10000,
    }
];


function print(){
    let adminBlock = document.createElement('div');
    adminBlock.classList.add('admin-block');
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

    adminBlock.innerHTML = `
            <h2>Admin page</h2>
            <div class="products-list">
                <div class"item">
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
            <button class="add-new-product">Add product</button>
    `;
    container.innerHTML = adminBlock.outerHTML;
}

function start(){
    let productsData = JSON.parse(localStorage.getItem('productsData'));
    if(productsData){
        productsList = productsData;
    }
    print()
}

start()