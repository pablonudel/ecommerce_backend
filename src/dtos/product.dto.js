export default class ProductDto{
    constructor(product){
        this.id = product._id
        this.name = product.name
        this.description = product.description
        this.image = product.image
        this.price = product.price
        this.category = product.category
        this.stock = product.stock
        this.active = product.active
    }
}