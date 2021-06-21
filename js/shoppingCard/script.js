function buyBasket(){
    let inputs = document.querySelectorAll('input');

    let productsData = JSON.parse(localStorage.getItem('productsData'));

    for(let i=0;i<productsData.length;i++){
        // if(productsData[i].quantity <= 0){
        //     let tr = document.querySelectorAll('.tr');
        //     tr[i].remove();
        // }else{
        //     productsData[i].quantity -= +inputs[i].value;
        //     localStorage.setItem('productsData', JSON.stringify(productsData));
        // }
        //try{
            productsData[i].quantity -= +inputs[i].value;
            localStorage.setItem('productsData', JSON.stringify(productsData));
        // }catch{
        //     let elTotal = document.querySelector('.totalPrice');
        //     elTotal.remove();
        // }
        if(productsData[i].quantity <= 0){
            let tr = document.querySelectorAll('.tr');
            tr[i].remove();
            let totalHtml = document.querySelector('.totalHtml');
            totalHtml.innerHTML=0;
        }
    }
}

function outputBasket(){
    let data = localStorage.getItem('Basket');
    let basket = JSON.parse(data);
    if(basket == null || basket.length < 0) return;
    let table = document.querySelector('.basket-table');
    let basketContainer = document.querySelector('.basket');
    console.log(basket);
    let el;
    let totalpricenum = 0;
    for(let i=0; i<basket.length;i++){
        el = document.createElement('tr');
        el.classList.add(`tr`);
        el.innerHTML=`<td>${i}</td><td>${basket[i].title} (${basket[i].country})</td><td><input name="${basket[i].title}" value="${basket[i].quantity}"></td><td>${basket[i].price}</td>`
        table.append(el);
        localStorage.setItem('totalprice', totalpricenum);
        totalpricenum = +localStorage.getItem('totalprice') + +basket[i].price;
        localStorage.setItem('totalprice', totalpricenum);
        let num1 = i;
        let num2 = basket.length;
        num1++;

        //console.log(num1,num2);
        if(num1 == num2){
            let totalprice = document.createElement('tr');
            //totalprice.classList.add('totalPrice');
            totalprice.innerHTML=`<td colspan=3>Total:</td><td class="totalHtml">${totalpricenum}</td>`;
            table.append(totalprice);
            let btnBuy = document.createElement('button');
            btnBuy.innerHTML='Buy';
            basketContainer.append(btnBuy);

            btnBuy.addEventListener('click', buyBasket);
        }
        
    }
}

outputBasket();