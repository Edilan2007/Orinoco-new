//DOM ELEMENT REFERENCES
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let mailAddress = document.getElementById('mailAddress');
let address = document.getElementById('address');
let country = document.getElementById('country');
let invalidFeedback = document.querySelectorAll("p.invalid-feedback");
let submitButton = document.getElementById('submitBtn');
// initialize Validation Boolean To False
let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isAddressValid = false;
let isCountryValid = false;

let orderId;
//const data = orderId;
//const cartContent = document.querySelector('.cart_items');
//const buttonRemove = document.getElementById('remove');

function makeRequest(data){
    fetch('http://localhost:3000/api/cameras/order',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => { 
        return response.json();})
    .then((data) => {
        console.log(data);

        orderId = data.orderId;
        sessionStorage.setItem("orderId", orderId);
        location.replace('confirmation.html');

    }).catch(error => console.log(error))
}



// Adding Items to the Cart
function displayCart() {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    const cartItemsWrapper = document.getElementById('cart_items');
    //console.log(cartItemsWrapper);
    console.log(cartItems);
  
    if (cartItems) {
      console.log('running');
      // Creates table with items from localStorage
      for (let i = 0; i < cartItems.length; i++) {
        let tr = document.createElement('tr');
  
        let nameCell = document.createElement('p');
        let lenseCell = document.createElement('td');
        let priceCell = document.createElement('td');
        let btnRemove = document.createElement('td');
        let imgCell = document.createElement('img');
        let divName = document.createElement('td');
        let quantityCell = document.createElement('td');
        priceCell.style.color = '#3bc492';
        
  
        nameCell.innerHTML = cartItems[i].name;
        lenseCell.innerHTML = cartItems[i].selectLense;
        priceCell.innerHTML = ((cartItems[i].price / 100) * cartItems[i].quantity) + ' $';
        imgCell.setAttribute('src', cartItems[i].imgUrl);
        imgCell.setAttribute("width", "90px")
  
        btnRemove.innerHTML = `<button class="btn-del" id="remove" data-id=${cartItems[i].prodId} onclick='deleteItem(${i})'>X</button>`;
        quantityCell.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" value ="${cartItems[i].quantity}" class="quantity" onclick="changeQuantity(${i}, event.target.value)">`;
  
        divName.append(imgCell, nameCell);
        divName.classList.add('divImage');
  
        // Create cart item row & add it to table
        tr.append(divName, lenseCell, quantityCell, priceCell, btnRemove);
        cartItemsWrapper.appendChild(tr);
      }
  
    }
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
      document.querySelector('.cart-items').textContent = productNumbers;
    }
}

function calculateTotalPrice(){
    let totalItemCost = JSON.parse(localStorage.getItem('productInCart'));
    let total = document.getElementById('total');
    let totalCartPrice = 0;
    if(totalItemCost){
        for(let i in totalItemCost){
            let productPrice = (totalItemCost[i].price / 100) * totalItemCost[i].quantity;
            totalCartPrice += productPrice;
        }
    }
    
    if(total){
        total.innerHTML = totalCartPrice + " $";
        sessionStorage.setItem('Total', JSON.stringify(totalCartPrice));
        console.log(totalCartPrice);
    }
}


//Remove item from cart and update localStorage 
function deleteItem(index){
    let cartItems = JSON.parse(localStorage.getItem('productInCart'));
    cartItems.splice(index, 1);

    localStorage.setItem('productInCart', JSON.stringify(cartItems));
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers--;
    localStorage.setItem('cartNumbers', JSON.stringify(productNumbers));
  
    location.reload();
    
    //localStorage.setItem('cartNumbers',JSON.stringify(itemNumber));
    //Re-render.....
    //displayCart();
    //Re-calculate....
    calculateTotalPrice();  
    
}

function changeQuantity (index, value){
    let cartItems = JSON.parse(localStorage.getItem('productInCart'));
    cartItems[index].quantity = parseInt(value);
    localStorage.setItem('productInCart', JSON.stringify(cartItems));
    
    
    //displayCart();
    calculateTotalPrice();
    //location.reload(); 
}
    
function init(){
    displayCart();
    onLoadCartNumbers();
    calculateTotalPrice();   
}

//ADD event to the submit button
submitBtn.addEventListener('click', ($event) => {
    $event.preventDefault();
    let products = [];
    //get id prod and push it in array
    let cartItems = JSON.parse(localStorage.getItem('productInCart'));
    for (let i= 0; i< cartItems.length; i++){
      products.push(cartItems[i].prodId);
      console.log(products);
    }
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: mailAddress.value,
      address: address.value,
      country: country.value,
    }
    let data = {
      contact: contact,
      products: products,
    }
  
    if (isFirstNameValid && isLastNameValid && isEmailValid && isAddressValid && isCountryValid) {
      makeRequest(data);
    }
    if (isFirstNameValid === false) {
      invalidFeedback[0].style.display = 'block';
    }
    if (isFirstNameValid === true) {
      invalidFeedback[0].style.display = 'none';
    }
    if (isLastNameValid === false) {
      invalidFeedback[1].style.display = 'block';
    }
    if (isLastNameValid === true) {
      invalidFeedback[1].style.display = 'none';
    }
    if (isEmailValid === false) {
      invalidFeedback[2].style.display = 'block';
    }
    if (isEmailValid === true) {
      invalidFeedback[2].style.display = 'none';
    }
    if (isAddressValid === false) {
      invalidFeedback[3].style.display = 'block';
    }
    if (isAddressValid === true) {
      invalidFeedback[3].style.display = 'none';
    }
    if (isCountryValid === false) {
      invalidFeedback[4].style.display = 'block';
    }
    if (isCountryValid === true) {
      invalidFeedback[4].style.display = 'none';
    }
  
});

  //firstName Validation
  firstName.addEventListener('blur', () => {
    const regName = /^[a-zA-Z]{3,32}$/;
    if (!regName.test(firstName.value)) {
      firstName.style.borderBottom = 'red solid 1px';
      return false;
    }
    else {
      firstName.style.borderBottom = 'green solid 1px';
      isFirstNameValid = true;
    }
  })
  //lastName Validation
  lastName.addEventListener('blur', () => {
    const regName = /^[a-zA-Z]{3,32}$/;
    if (!regName.test(lastName.value)) {
      lastName.style.borderBottom = 'red solid 1px';
      return false;
    }
    else {
      lastName.style.borderBottom = 'green solid 1px';
      isLastNameValid = true;
    }
  })
  //mailAddress Validation
  mailAddress.addEventListener('blur', () => {
    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!regEmail.test(mailAddress.value)) {
        mailAddress.style.borderBottom = 'red solid 1px';
      return false;
    }
    else {
        mailAddress.style.borderBottom = 'green solid 1px';
        isEmailValid = true;
    }
  })
  //address Validation
  address.addEventListener('blur', () => {
    const regAddress = /^\s*\S+(?:\s+\S+){2}/;
    if (!regAddress.test(address.value)) {
      address.style.borderBottom = 'red solid 1px';
      return false;
    }
    else {
      address.style.borderBottom = 'green solid 1px';
      isAddressValid = true;
    }
  })
  //country Validation
  country.addEventListener('blur', () => {
    const regName = /^[a-zA-Z]+$/;
    if (!regName.test(country.value)) {
      country.style.borderBottom = 'red solid 1px';
      return false;
    }
    else {
      country.style.borderBottom = 'green solid 1px';
      isCountryValid = true;
    }
  })


  init();
 
