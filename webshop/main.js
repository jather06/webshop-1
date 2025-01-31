let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "Wireless Earbuds",
        tag: "WirelessEarbuds",
        price: 59.99,
        inCart: 0
    },
    {
        name: "Smartwatch",
        tag: "Smartwatch",
        price: 129.99,
        inCart: 0
    },
    {
        name: "Portable Speaker",
        tag: "PortableSpeaker",
        price: 49.99,
        inCart: 0
    },
    {
        name: "Air Fryer",
        tag: "AirFryer",
        price: 89.99,
        inCart: 0
    },
    {
        name: "Electric Kettle",
        tag: "ElectricKettle",
        price: 29.99,
        inCart: 0
    },
    {
        name: "Weighted Blanket",
        tag: "WeightedBlanket",
        price: 69.99,
        inCart: 0
    },
    {
        name: "Athleisure Wear",
        tag: "AthleisureWear",
        price: 39.99,
        inCart: 0
    },
    {
        name: "Classic Leather Wallet",
        tag: "ClassicLeatherWallet",
        price: 24.99,
        inCart: 0
    },
    {
        name: "Skincare Set",
        tag: "SkincareSet",
        price: 34.99,
        inCart: 0
    },
    {
        name: "Aromatherapy Diffuser",
        tag: "AromatherapyDiffuser",
        price: 44.99,
        inCart: 0
    },
    {
        name: "Building Block Set",
        tag: "BuildingBlockSet",
        price: 29.99,
        inCart: 0
    },
    {
        name: "Electric Scooter",
        tag: "ElectricScooter",
        price: 349.99,
        inCart: 0
    }
];

// i + 2, want er is iets mis gegaan bij het invoegen van producten en ik kan het niet fixen :D
// nu worden de juiste producten ingeladen.
for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    let totalCost = localStorage.getItem('totalCost');

    if (!productNumbers || isNaN(productNumbers)) {
        localStorage.setItem('cartNumbers', 0);
        productNumbers = 0;
    }

    if (!totalCost || isNaN(totalCost)) {
        localStorage.setItem('totalCost', 0);
        totalCost = 0;
    }

    document.querySelector('.cart span').textContent = productNumbers;
}


function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action === "decrease" ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product, action);
}

function setItems(product, action) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        let currentProduct = product.tag;
        if (!cartItems[currentProduct]) {
            cartItems[currentProduct] = product;
        }

        if (action === "decrease") {
            cartItems[currentProduct].inCart = Math.max(cartItems[currentProduct].inCart - 1, 0);
        } else {
            cartItems[currentProduct].inCart += 1;
        }

        if (cartItems[currentProduct].inCart === 0) {
            delete cartItems[currentProduct];
        }
    } else {
        product.inCart = 1;
        cartItems = { [product.tag]: product };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    displayCart();
}


function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");
    cart = cart ? parseFloat(cart) : 0; 

    if (action === "decrease") {
        cart = Math.max(cart - product.price, 0); 
    } else {
        cart += product.price;
    }

    localStorage.setItem("totalCost", cart.toFixed(2)); 
    displayCart();
}



function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let cart = parseInt(localStorage.getItem("totalCost"));
    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).forEach(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <span>${item.name}</span>
                </div>
                <div class="price">€${item.price}</div>
                <div class="quantity">
                    <button class="decrease" data-tag="${item.tag}">-</button>
                    <span>${item.inCart}</span>
                    <button class="increase" data-tag="${item.tag}">+</button>
                </div>
                <div class="total">€${item.inCart * item.price}</div>
            `;
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4>Totaal</h4>
                <h4>€${cart},00</h4>
            </div>
        `;

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                let tag = button.dataset.tag;
                cartNumbers(products.find(p => p.tag === tag));
                totalCost(products.find(p => p.tag === tag));
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                let tag = button.dataset.tag;
                cartNumbers(products.find(p => p.tag === tag), "decrease");
                totalCost(products.find(p => p.tag === tag), "decrease");
            });
        });
    }
}

onLoadCartNumbers();
displayCart();