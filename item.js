function getProductId(){
    //id is retrieved  from the querystring parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    return id;
}

function getSingleProduct(id){
    fetch('http://localhost:3000/api/cameras/' + id).
     then(response => response.json())
     .then( data => {
         product = data;
         console.log(product);
         createCard(data);
     }).catch(error => console.log(error))
}

//Create and query Elements
function createCard (data){
    const card = document.createElement("Article");
    const img = data.imageUrl;
    const newImage = document.createElement("img");
    const btn = document.createElement("button");
    const form = document.createElement("form");
    const main = document.querySelector("#shop");
    const dropMenuLabel = document.createElement("label");
    const dropMenu = document.createElement("select");
    const paragraph = document.createElement("p");

    //Setup classes and attribute and append to card
    card.classList.add("col", "card", "p-3");
    newImage.classList.add("img");
    newImage.setAttribute("width", "100%");
    newImage.setAttribute("src", img);
    card.appendChild(newImage);

    //Set dropdown menu 
    card.innerHTML += "<h2>" + data.name + "</h2>";
    dropMenuLabel.innerHTML = "choose from Lenses here &nbsp";
    form.appendChild(dropMenuLabel);
    form.appendChild(dropMenu);

    //loop to get all items and display the one selected
    for (let x in data.lenses){
        const option = document.createElement("option");
        option.innerHTML = data.lenses[x];
        option.setAttribute("value", data.lenses[x]);
        dropMenu.appendChild(option);
    }
    card.appendChild(form);

    card.innerHTML += "<p>" + data.description + "</p>";
    card.innerHTML += "<h4>" + "$" + data.price / 100 + "</h4>";
    card.classList.add("product");
    btn.classList.add("btn", "banner-btn", "mx-auto");
    btn.setAttribute('data-id', data._id);
    btn.innerHTML = "Add to Cart";
    btn.classList.add("text-center");
    

    card.append(btn);
    main.append(card);

    //Add item to cart btn
    btn.addEventListener('click', ()  => {
    console.log("Hello");
    cartNumber(data);
    totalCost(data);
    });

    //Check if there are any items on Local Storage
    function cartNumber(data){
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers); 
        //console.log(data.name);
        //if there are any add one to them
        if (productNumbers){
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart-items').textContent = productNumbers + 1;
            //if there is none set local storage to one
        }else{
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.cart-items').textContent = 1;    
        }
        setItems(data);
    }

    function setItems(data){
        //console.log('My Product is ', data);
        //Set cartItems as an array
        let singleProduct = {
            prodId: data._id,
            name: data.name,
            imgUrl: data.imageUrl,
            selectLense: dropMenu.value,
            price: data.price,
            quantity: 1        
        }
        let cartItems = localStorage.getItem('productInCart');
        cartItems = JSON.parse(cartItems); 
        if (cartItems == null){
            cartItems = []; 
        } 
        cartItems.push(singleProduct);
        localStorage.setItem('productInCart', JSON.stringify(cartItems));
 
    }

    /**Checks if there is any number in the localStorage and then displays
    it in cart Span*/
    function onLoadCartNumbers(){
        let productNumbers = localStorage.getItem('cartNumbers');
        if(productNumbers){
            document.querySelector('.cart-items').textContent =  productNumbers;
        }
    }

    //Adds the sum of the products
    function totalCost(response){
        console.log('The product price is', response.price /100);
        let cartCost = localStorage.getItem('totalCost');
        if(cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalCost', cartCost + response.price / 100);
        } else {
            localStorage.setItem('totalCost', response.price / 100);
        }
    }
    onLoadCartNumbers();

}



function init(){
    let productId = getProductId();
    getSingleProduct(productId);
}

init();