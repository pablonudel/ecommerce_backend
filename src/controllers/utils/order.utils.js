import MailingService, {generateMailBody} from "../../utils/mailing.js"
import { UserDto, OrderProductDto } from '../../dtos/index.js'

export const stockPriceValidations = async (cartProductsArray, productsArray)=>{
    const validationMsgs = {}
    await cartProductsArray.forEach(product => {
        const item = productsArray.find(p => JSON.stringify(p._id) === JSON.stringify(product._id))

        if(item.stock > 0){
            if(product.qty > item.stock){
                product.qty = item.stock
                product.subTotal = product.price * product.qty
                validationMsgs.StockAlert = `El item ${product.name} se ha modificado por cambio de stock`
            }
            if(product.price  !== item.price){
                product.price = item.price
                product.subTotal = product.price * product.qty
                validationMsgs.PriceAlert = `El item ${product.name} se ha modificado por cambio de precio`
            }
        }
        
        if(item.stock === 0){
            cartProductsArray = cartProductsArray.filter(p => p._id !== product._id)
            validationMsgs.outOfStockAlert = `El item ${product.name} se eliminado del carrito por falta de stock`
        }
    })
    console.log(validationMsgs);
    return validationMsgs
}

export const getSaleTotal = async(cartProductsArray) => {
    let total = 0
    await cartProductsArray.forEach(product => {
        total += product.subTotal
    })
    return total
}

export const emptyCart = async (cartService, id)=>{
    await cartService.update(id, {products:[]})
}

export const updateProductsStock = (cartProductsArray, productService)=>{
    cartProductsArray.forEach(async product =>{
        const updateProduct = await productService.getBy({'_id':product._id})
        const newStock = updateProduct.stock - product.qty
        await productService.update(product._id, {stock:newStock})
    })
}

export const sendSaleMail = async (orden, user) => {
    const mailer = new MailingService()
    const body = generateMailBody(orden)
    await mailer.sendMail({
        from:"Tienda",
        to:user.email,
        subject:"Tienda | Confirmación de compra realizada",
        html:body
    })
}

export const parsedOrder = (order) => {
    const parsedOrder = {id:"", products:[], user:{}, total:0, status:""}
    parsedOrder.id = order._id
    parsedOrder.user = new UserDto(order.user)
    parsedOrder.total = order.total
    parsedOrder.status = order.status
    order.products.forEach(p => {
        parsedOrder.products.push(new OrderProductDto(p))
    });
    return parsedOrder
}

export const parsedOrders = (orders) => {
    const ordersArr = []
    orders.forEach(order => {
        const parsedOrder = {id:"", products:[], user:{}, total:0, status:""}
        order.products.forEach(product => {
            parsedOrder.products.push(new OrderProductDto(product))
        });
        parsedOrder.id = order._id
        parsedOrder.user = new UserDto(order.user)
        parsedOrder.total = order.total
        parsedOrder.status = order.status
        ordersArr.push(parsedOrder)
    });
    return ordersArr
}