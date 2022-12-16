export default class OrderProductDto{
    constructor(orderProduct){
        this.id = orderProduct._id
        this.name = orderProduct.name
        this.code= orderProduct.code
        this.price= orderProduct.price
        this.qty= orderProduct.qty
        this.subTotal= orderProduct.price
    }
}