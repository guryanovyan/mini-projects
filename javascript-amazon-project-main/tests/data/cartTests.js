import cart from "../../data/cart-class.js"

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const quantity1 = 1;

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    })

    it('adds an existing product to the cart', () => {
        cart.cartItems = [
            {
                productId: productId1,
                quantity: quantity1,
                deliveryOptionId: '1'
            }
        ]

        cart.addToCart(productId1, quantity1); 
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'   
            }
        ]));
    })
    
    it('adds a new product to the cart', () => {        
        cart.cartItems = [];

        cart.addToCart(productId1, quantity1); 
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: productId1,
                quantity: quantity1,
                deliveryOptionId: '1'   
            }
        ]));
    })
})

describe('test suite: removeFromCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        cart.cartItems = [
            {
                productId: productId1,
                quantity: quantity1,
                deliveryOptionId: '1'
            }
        ]
    })

    it('removes a productId that is in the cart', () => {
        cart.removeFromCart(productId1);
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    })
    
    it('does nothing if product is NOT in the cart', () => {
        cart.removeFromCart('not-exist');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(quantity1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: productId1,
                quantity: quantity1,
                deliveryOptionId: '1'
            }
        ]));
    })  
})

describe('test suite: updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    })

    it('updates the delivery option', () => {
        cart.cartItems = [
            {
                productId: productId1,
                quantity: quantity1,
                deliveryOptionId: '1'
            }
        ]

        cart.updateDeliveryOption(productId1, '2');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(quantity1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: productId1,
                quantity: quantity1,
                deliveryOptionId: '2'
            }
        ]));
    })

    it('does nothing if the product is not in the cart', () => {
        cart.cartItems = [
            {
                productId: productId1,
                quantity: quantity1,
                deliveryOptionId: '1'
            }
        ]
        
        cart.updateDeliveryOption('not-in-the-cart', '2');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(quantity1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })
    
    it('does nothing if the delivery option does not exist', () => {
        cart.cartItems = [
            {
                productId: productId1,
                quantity: quantity1,
                deliveryOptionId: '1'
            }
        ]
        
        cart.updateDeliveryOption(productId1, 'not-exist');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(quantity1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })
})