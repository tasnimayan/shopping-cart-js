// ITem remove button removes the last item for all the buttons
// Function declaration vs expression
// event delegation 


class Phone{
  constructor(id, brand, model, variant, color, image, price){
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.variant = variant;
    this.color = color;
    this.image = image;
    this.price = price;
  }
}




const huawei01 = new Phone('hua01','Huawei','Honor 8x', 128, 'Blue','img/honor-8x.jpg', 220); 
const iphone01 = new Phone('iph01','iPhone','X', 128, 'Golden','img/iphone-x.jpg', 599); 
const iphone02 = new Phone('iph02','iPhone','12', 64, 'Ocean','img/iphone-12.jpg', 1400);

class User{
  #userCart = [];
  constructor(userName, userId, email, password, phone){
    this.userName = userName;
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  addToCart(item){
    this.#userCart.push(item);
  }
  deleteFromCart(itemId){
    for (let item of this.#userCart){
      if(item.id === itemId){
        const indexToRemove = this.#userCart.indexOf(item);
        if(indexToRemove !== -1){
          this.#userCart.splice(indexToRemove,1);
        }
      }
    } 
  }
  getCart(){
    return this.#userCart;
  }
  getProductPrice(itemId){
    let i=0;
    while (i< this.#userCart.length){
      if(this.#userCart[i].id == itemId){
        return this.#userCart[i].price;
      }
      i++;
    }
  }

  cartSummary(){
    let cartContainer = document.querySelector('.cart-container');

    for(var item of this.#userCart){
      cartContainer.innerHTML += `<div id="${item.id}" class="item-container">
        <img class="product-image" src=${item.image} alt=${item.brand}>
        <p>${item.brand} ${item.model} ${item.variant}GB ${item.color}
        </p>
      
        <div class="inner-item">
          <button id="${item.id}minus" onclick="onProductChange('${item.id}','minus')"><i class="fa fa-minus"></i></button>
          <input id="${item.id}qty" type="number" class="input" value="1">
          <button id="${item.id}plus" onclick="onProductChange('${item.id}','plus')"><i class="fa fa-plus"></i></button>
          <span>$</span><p id="${item.id}price" class="item-price">${item.price}</p>
          <button id="${item.id}delete" class="btnCancel" onclick="onProductChange('${item.id}','delete')"><i class="fa fa-times fa-2x"> </i></button>
        </div>
      </div>`
    }
    cartSummary();
  }
}

function onProductChange(itemId, option){

  const itemQuantity = document.getElementById(itemId+'qty');
  const toPrice = document.getElementById(itemId+'price');

  // Function to change data if item quantity decrease
  if(option == "minus"){
    if(itemQuantity.value > 0){
      itemQuantity.value = parseInt(itemQuantity.value)-1;
      console.log(ayan.getProductPrice(itemId));
      toPrice.innerHTML = ayan.getProductPrice(itemId) * parseInt(itemQuantity.value);
    }
  }
  // Function to change data if item quantity increases
  if(option == "plus"){
    itemQuantity.value = parseInt(itemQuantity.value)+1;
    toPrice.innerHTML = ayan.getProductPrice(itemId) * parseInt(itemQuantity.value);
  }
  // Function to delete the item from the list
  if(option == "delete"){
    const section = document.getElementById(itemId);
    section.remove();
    ayan.deleteFromCart(itemId);
  }

  // To update the cart summary at every change
  cartSummary();
  
}
// Function for cart summary
function cartSummary(){
  const priceList = document.getElementsByClassName('item-price');
  const subTotal = document.getElementById('subTotal');
  const taxTotal = document.getElementById('taxTotal');
  const totalPrice = document.getElementById('totalPrice');
  let subTotalPrice = 0;
  for(let i=0; i<priceList.length; i++){
    subTotalPrice += parseFloat(priceList[i].innerText);
  }
  let tax = (subTotalPrice * 5)/100;
  let total = subTotalPrice + tax;

  subTotal.innerHTML = `<span>$</span>` + subTotalPrice;
  taxTotal.innerHTML = `<span>$</span>` + tax.toFixed(2);
  totalPrice.innerHTML = `<span>$</span>` + total.toFixed(2);
}

const ayan = new User('ayan', '2019', 'ayan@gmali.com', 'ayanredz', '01645800408');
ayan.addToCart(huawei01);
ayan.addToCart(iphone01);
ayan.addToCart(iphone02);
ayan.cartSummary();


