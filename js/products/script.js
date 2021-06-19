//name local productsData

const products1 = [
    {
        id: 0,
        title: 'Процессор',
        icon: '1.png',
        country: 'CША',
        quantity: 20,
        price: 10000,
    },
    {
        id: 1,
        title: 'Клавиатура',
        icon: '2.png',
        country: 'CША',
        quantity: 10,
        price: 500,
    },
    {
        id: 2,
        title: 'Корпус',
        icon: '3.png',
        country: 'CША',
        quantity: 20,
        price: 1000,
    },
    {
        id: 3,
        title: 'Кулер',
        icon: '4.png',
        country: 'CША',
        quantity: 25,
        price: 100,
    },
    {
        id: 4,
        title: 'Блок питания',
        icon: '5.png',
        country: 'CША',
        quantity: 5,
        price: 700,
    },
    {
        id: 5,
        title: 'Память',
        icon: '6.png',
        country: 'CША',
        quantity: 20,
        price: 900,
    },
    {
        id: 6,
        title: 'Видео карта',
        icon: '7.png',
        country: 'CША',
        quantity: 2,
        price: 15000,
    },
    {
        id: 7,
        title: 'Жесткий диск',
        icon: '8.png',
        country: 'CША',
        quantity: 16,
        price: 300,
    },
];
const container = document.querySelector('#container');
const basketLink = document.querySelector('#basket');
// const products1 = document.querySelector('#products');

let products = [];
// const products = getLocalStorageData();
basketLink.addEventListener('click' , addDataLocalStorage);
let itemBasket = null;
const basket = [];
window.addEventListener('load' , init);

function init(){
    getLocalStorageData();
    createContent(products);
    setOptionsInputs();
    setEventBtn();
    console.log(products);
}






function getLocalStorageData(){
    localStorage.setItem('Products', JSON.stringify(products1));
    //имя локал productsData
    let dataProducts = localStorage.getItem('productsData');
    dataProducts = JSON.parse(dataProducts);
    products = dataProducts;
    return dataProducts;
}
// убрать путь у картинки УТОЧНИТЬ!!!
function createContent(data){
    const content = data.map(item => `
        <div class="item-product">
            <h4>${item.title}</h4>
            <div class="icon-product">
            
                <img src="${item.icon}">
            </div>
            <p>${item.country}</p>
            <div class="buy-block">
                <p class="price-product">${item.price}$</p>
                <input class="count-product" data-quantity="${item.quantity}"type="number" min="0" max="999">
                <button class="buy-product" data-id="${item.id}">Buy</button>
            </div>
        </div>
    `);
    printItem(content);
}
function printItem(content){
    container.innerHTML = `
        <h3>All products</h3>
        <div id="products">
            ${content.join('')}
        </div>
    `;
}

function setOptionsInputs(){
    const inputs = document.querySelectorAll('.count-product');
    for(let i=0; i < inputs.length; i++){
        inputs[i].setAttribute('max' , inputs[i].dataset.quantity);
        inputs[i].addEventListener('input' , function(){
            inputs[i].value = Math.floor(inputs[i].value);
            // inputs[i] = +Math.floor(inputs[i].value);
            if(+inputs[i].value > +inputs[i].dataset.quantity){
                inputs[i].value = inputs[i].dataset.quantity;
            }
            if(+inputs[i].value < 0){
                inputs[i].value = '';
            }
        });
    }
}
function setEventBtn(){
    const buyBtn = document.querySelectorAll('.buy-product');
    for(const item of buyBtn){
        item.addEventListener('click' , getIDValue);
    }
}
function getIDValue(){
    const inpVal = this.previousElementSibling.value;
    if(inpVal == 0) return;
    itemBasket = {
        id: +this.dataset.id,
        val: +inpVal
    };
    addInBasket();
}
function addInBasket(){
    let buy;
    for(const item of products){
        if(item.id == itemBasket.id){
            buy = item;
            buy.quantity = itemBasket.val;
        }
    }
    if(basket.length > 0){
        for(let i = 0;i < basket.length; i++){
            const index = basket.indexOf(buy);
            if(index < 0) {
                basket.push(buy);
            }
            else{
                basket[index] = buy;
            }
            console.log(basket);
        }
    }
    else{
        basket.push(buy);
    }
    //Добовляю тут
    // localStorage.setItem('Basket', JSON.stringify(basket));
}
//Добовляю тут
function addDataLocalStorage(){
    if(basket.length > 0){
        localStorage.setItem('Basket', JSON.stringify(basket));
    }
}

