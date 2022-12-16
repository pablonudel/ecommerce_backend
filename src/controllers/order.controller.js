import { cartService, productService, orderService } from "../services/index.js"
import { ServerResponse } from '../utils/serverResponse.js'
import {stockPriceValidations, getSaleTotal, emptyCart, updateProductsStock, sendSaleMail, parsedOrders, parsedOrder} from './utils/order.utils.js'


const getOrders = async(req,res)=>{
    try {
        const orders = await orderService.getAll()
        ServerResponse.success({req:req, res, data:orders})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const getOrderById = async(req,res)=>{
    try {
        const {id} = req.params
        const order = await orderService.getBy({'_id':id})
        if(!order) return ServerResponse.notFound({req:req, res, error:`Orden con ID:${id} no encontrada`})

        ServerResponse.success({req:req, res, data:order})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const saveOrder = async(req,res)=>{
    try {
        const user = req.user
        const cart = await cartService.getBy({'_id':user.cart})
        const products = await productService.getAll()


        if(!cart) return ServerResponse.notFound({req:req, res, error:`Carrito con ID:${user.cart} no encontrado`})
        if(cart.products.length < 1) return ServerResponse.badRequest({req:req, res, error:{emptyError:`No hay productos en el carrito`}})
        const validationMsgs = await stockPriceValidations(cart.products, products)

        await cartService.update(cart._id,{products:cart.products})
        if(Object.keys(validationMsgs).length > 0) return ServerResponse.badRequest({req:req, res, error:validationMsgs})

        const total = await getSaleTotal(cart.products)
        const order = {products:cart.products, user:user, total:total}
        
        if(req.user.role === 'admin') return ServerResponse.unauthorized({req:req, res, error:'Admin no está autorizado a generar órdenes'})
        await orderService.save(order)
        
        emptyCart(cartService, cart._id)
        updateProductsStock(cart.products, productService)
        sendSaleMail(order, user)

        ServerResponse.success({req:req, res, data:'Orden creada con éxito'})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateOrderById = async(req,res)=>{
    try {
        const {id} = req.params 
        const order = await orderService.getBy({'_id':id})
        if(!order) return ServerResponse.notFound({req:req, res, error:`Orden con ID:${id} no encontrada`})
        
        const status = req.body.status
        if(!status) return ServerResponse.badRequest({req:req, res, error:{statusError:'El campo ESTADO requerido'}})
        if(status !== 'abierta' && status !== 'cancelada' && status !== 'enviada' && status !== 'cerrada') return ServerResponse.badRequest({req:req, res, error:{statusError:'Las opciones de estado disponibles son: abierta | cancelada | enviada | cerrada'}})

        await orderService.update({'_id':id}, {status:status})
        const updatedOrder = await orderService.getBy({'_id':id})

        ServerResponse.success({req:req, res, data:updatedOrder})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}


export default {
    getOrders,
    getOrderById,
    saveOrder,
    updateOrderById
}