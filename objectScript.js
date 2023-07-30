// ITem remove button removes the last item for all the buttons


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
  getCart(){
    return this.#userCart;
  }

  cartSummary(){
    let cartContainer = document.querySelector('.cart-container');

    for(var item of this.#userCart){
      cartContainer.innerHTML += `<div id="${item.id}" class="item-container">
        <img class="product-image" src=${item.image} alt=${item.brand}>
        <p>${item.brand} ${item.model} ${item.variant}GB ${item.color}
        </p>
      
        <div class="inner-item">
          <button id="${item.id}minus"><i class="fa fa-minus"></i></button>
          <input id="${item.id}qty" type="number" class="input" value="1">
          <button id="${item.id}plus"><i class="fa fa-plus"></i></button>
          <span>$</span><p id="${item.id}price" class="price">${item.price}</p>
          <button id="${item.id}delete" class="btnCancel"><i class="fa fa-times fa-2x"> </i></button>
        </div>
      </div>`
    }

    this.addListener();
  }
  addListener(){

    for(var item of this.#userCart){
      let qtyPlus = document.getElementById(item.id+'plus');
      let qtyMinus = document.getElementById(item.id+'minus');
      let itemQuantity = document.getElementById(item.id+'qty');
      let itemDelete = document.getElementById(item.id+'delete');
      let toPrice = document.getElementById(item.id+'price');
      let price = item.price;

      qtyPlus.addEventListener('click', ()=>{
        itemQuantity.value = parseInt(itemQuantity.value)+1;
        toPrice.innerHTML = price * parseInt(itemQuantity.value);
      });
  
      qtyMinus.addEventListener('click', ()=>{
        if(itemQuantity.value > 0){
          itemQuantity.value = parseInt(itemQuantity.value)-1;
          toPrice.innerHTML = price * parseInt(itemQuantity.value);
        }
      });

      itemDelete.addEventListener('click', ()=>{
        var section = document.getElementById(item.id);
        section.remove();
        this.#userCart.pop(item);
      });
    }

    
  }


}

const ayan = new User('ayan', '2019', 'ayan@gmali.com', 'ayanredz', '01645800408');
ayan.addToCart(huawei01);
ayan.addToCart(iphone01);
ayan.addToCart(iphone02);
ayan.cartSummary();


