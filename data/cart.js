export let cart;

loadFromStorage();

//START FOR TEST JASMINE
export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
     cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }, {
            productId: '77919bbe-0e56-475b-adde-4f24dfed3a04',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
}
//END TEST JASMINE

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
     if(productId === cartItem.productId) {
         matchingItem = cartItem;
     }
    });

    if(matchingItem) {
     matchingItem.quantity += 1;
    } else {
     cart.push({
         productId: productId,
         quantity: 1,
         deliveryOptionId: '1'
        });

    saveToStorage();   
    }
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
     if(productId === cartItem.productId) {
         matchingItem = cartItem;
     }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
    
      xhr.addEventListener('load', () => {

      fun();
      
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }