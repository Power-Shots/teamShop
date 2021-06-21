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
  },]

localStorage.setItem('Basket', JSON.stringify(products1));

function outputBasket(){
  let data = localStorage.getItem('Basket');
  let basket = JSON.parse(data);
  let table = document.querySelector('.basket-table');
  console.log(basket);
  let el;
  let totalpricenum = 0;
  for(let i=0; i<basket.length;i++){
      el = document.createElement('tr');
      el.innerHTML=`<td>${i}</td><td>${basket[i].title} (${basket[i].country})</td><td>${basket[i].quantity}</td><td>${basket[i].price}</td>`
      table.append(el);
      localStorage.setItem('totalprice', totalpricenum);
      totalpricenum = +localStorage.getItem('totalprice') + basket[i].price;
      localStorage.setItem('totalprice', totalpricenum);
      let num1 = i;
      let num2 = basket.length;
      num1++;

      //console.log(num1,num2);
      if(num1 == num2){
          let totalprice = document.createElement('tr');
          totalprice.innerHTML=`<td colspan=3>Total:</td><td>${totalpricenum}<td>`;
          table.append(totalprice);
      }
      
  }
}

outputBasket();