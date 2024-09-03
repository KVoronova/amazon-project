class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }


    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
        if (!this.cartItems) {
         this.cartItems = [{
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

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }


    addToCart (productId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
        });

        if(matchingItem) {
        matchingItem.quantity += 1;
        } else {
        this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
            });

        this.saveToStorage();   
        }
    }

    removeFromCart(productId) {
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
    
        this.cartItems = newCart;
    
        this.saveToStorage();
    }


    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }

}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(businessCart instanceof Cart);



