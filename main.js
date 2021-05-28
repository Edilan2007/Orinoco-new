// API request to get the products
class Products{
    async getProducts(){
        let url = 'http://localhost:3000/api/cameras';
        try{
           let response = await fetch(url);
           let data = await response.json();
           
           return data;
        } catch (error){
            console.log(error);
        }
    }
}

// display Products
class UI {
 displayProducts(data){
    let shopItems = document.getElementById('shop');
    for (let i in data){
        //console.log(data[i]);
        let id = data[i]._id;
        let name = data[i].name;
        let description = data[i].description;
        let image = data[i].imageUrl;
        let price = data[i].price / 100;
        let lenses = data[i].lenses;
        
        
        let product = document.createElement('div');
        product.classList.add('col');
        product.innerHTML= `
            <!--  single products -->
            <article  class="product">
                <div class="img-container">
                    <img src=${image} alt="product" class="product-img">
                    <a href="item.html?id=${id}" class="bag-btn" data-id=${id}>
                        <i class="fas fa-eye"></i>
                        Item details
                    </a>
                </div>
                <h3><b>${name}</b></h3>
                <!-- <h5>${description}</h5>  -->
                <h4>$${price}</h4>
            </article>
            <!--  end of single products -->
            `;
        shopItems.appendChild(product);
    }
    //Checks if there is any number in the localStorage and then displays
    //it in cart Span
    function onLoadCartNumbers(){
        let productNumbers = localStorage.getItem('cartNumbers');
        if(productNumbers){
            document.querySelector('.cart-items').textContent =  productNumbers;
        }
    }
    onLoadCartNumbers();
 }
 
}
  
document.addEventListener('DOMContentLoaded',()=> {
    const ui = new UI();
    const products = new Products();
    // setup application

    // get all products
    products.getProducts().then(data => {
        ui.displayProducts(data);
    });
});
  