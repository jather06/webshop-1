let carts = document.querySelectorAll('.add-cart');

let products = [ 
    {
        name: "Docent zonder haar",
        tag: "docentzonderhaar",
        price: 15,
        inCart: 0
    },
    {
        name: "Docent met baard",
        tag: "docentmetbaard",
        price: 15,
        inCart: 0
    },
    {
        name: "Docent met haar",
        tag: "docentmethaar",
        price: 15,
        inCart: 0
    },
    {
        name: "Studiepunten",
        tag: "studiepunten",
        price: 100,
        inCart: 0
    },
	    {
        name: "Minnaert gebouw",
        tag: "minnaertgebouw",
        price: 40000,
        inCart: 0
    },
	    {
        name: "Academie gebouw",
        tag: "academiegebouw",
        price: 60000,
        inCart: 0
    },
	{
        name: "Bachelor diploma",
        tag: "bachelordiploma",
        price: 10000,
        inCart: 0
    },
	{
        name: "Docent met lang haar",
        tag: "docentmetlanghaar",
        price: 400,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-circle"></ion-icon>
			
				<img src="./images/${item.tag}.jpg" /><br><br>
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">&#8364 ${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">&#8364 ${item.inCart * item.price},00</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Totaal</h4>
                <h4 class="basketTotal">&#8364 ${cart},00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}


function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}


onLoadCartNumbers();
displayCart();



// AAAA

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".products");
    const cartTotal = document.createElement("h3");

    function updateCartUI() {
        cartContainer.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                let itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;

                let productDiv = document.createElement("div");
                productDiv.classList.add("cart-item");
                productDiv.innerHTML = `
                    <h5>${item.name}</h5>
                    <p>€${item.price.toFixed(2)}</p>
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
                    <p>€${itemTotal.toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartContainer.appendChild(productDiv);
            });
        }

        cartTotal.innerHTML = `Total: €${totalPrice.toFixed(2)}`;
        cartContainer.appendChild(cartTotal);
    }

    cartContainer.addEventListener("change", function (event) {
        if (event.target.classList.contains("quantity-input")) {
            let index = event.target.getAttribute("data-index");
            cart[index].quantity = parseInt(event.target.value);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    });

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    });

    updateCartUI();
});

// Functie om producten toe te voegen vanuit de productpagina
document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        let productCard = this.closest(".flip-card"); // Get the main product card
        // Correctly fetch the product name from .flip-card-front
        let productName = productCard.querySelector(".flip-card-front h3").innerText;
        let productPriceText = productCard.querySelector(".price-tag").innerText; // Fetch price correctly
        let productPrice = parseFloat(productPriceText.replace("€", "").replace(",", ".").trim());
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${productName} added to cart!`);
    });
});




