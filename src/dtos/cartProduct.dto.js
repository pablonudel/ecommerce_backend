export default class CartProductDto{
    constructor(cartProduct, qty){
        this._id = cartProduct._id
        this.name = cartProduct.name
        this.code= cartProduct.code
        this.image= cartProduct.image
        this.price= cartProduct.price
        this.qty= qty
        this.subTotal= cartProduct.price * qty
    }
}