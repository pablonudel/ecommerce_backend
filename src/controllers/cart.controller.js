import { cartService, productService } from "../services/index.js"
import { CartProductDto } from "../dtos/index.js"
import { ServerResponse } from '../utils/serverResponse.js'
import { stockValidation, addQty } from './utils/cart.utils.js'
 

const getCartById = async(req,res)=>{
    try {
        const id_cart = req.user.cart
        
        if(!id_cart) return ServerResponse.unauthorized({req:req, res, error:`No autorizado`})
        const cart = await cartService.getBy({'_id':id_cart})
        
        ServerResponse.success({req:req, res, data:cart.products}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const addProductToCart = async(req,res)=>{
    try {
        const id_cart = req.user.cart
        const id = req.params.id_prod
        const qty = req.body.qty
        
        if(!id_cart) return ServerResponse.unauthorized({req:req, res, error:`No autorizado`})
        const cart = await cartService.getBy({'_id':id_cart})

        const products = await productService.getAll()
        const cartProduct = cart.products.find(p => JSON.stringify(p._id) === JSON.stringify(id))
        const indexOfProduct = cart.products.indexOf(cartProduct)
        
        const product = products.find(p => JSON.stringify(p._id) === JSON.stringify(id))
        if(!product) return ServerResponse.notFound({req:req, res, error:`Producto con ID:${id} encontrado`})
        const newCartProduct = new CartProductDto(product, qty)
                
        const invalidQty = stockValidation(cartProduct,qty,product,newCartProduct)
        if (invalidQty) return ServerResponse.badRequest({req:req, res, error:invalidQty}) 

        cartProduct ? addQty(cart.products, indexOfProduct, qty) : cart.products.push(newCartProduct)

        await cartService.update(id_cart, {products:cart.products})
        const result = await cartService.getBy({'_id':id_cart})

        ServerResponse.success({req:req, res, data:result.products})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateCartProductById = async(req,res)=>{
    try {
        const id_cart = req.user.cart
        const id = req.params.id_prod
        const qty = req.body.qty

        if(!id_cart) return ServerResponse.unauthorized({req:req, res, error:`No autorizado`})
        const cart = await cartService.getBy({'_id':id_cart})

        const product = await productService.getBy({'_id':id})
        if(!product){
            cart.products = cart.products.filter(p => JSON.stringify(p._id) !== JSON.stringify(id))
            await cartService.update(id_cart, {products:cart.products})
            return ServerResponse.notFound({req:req, res, error:'El producto no esta disponible y fue eliminado del carrito'})
        } 
        const cartProduct = cart.products.find(p => JSON.stringify(p._id) === JSON.stringify(product._id))
        if(!cartProduct) return ServerResponse.badRequest({req:req, res, error:{productError:`Producto con ID:${id} con encontrado en el carrito`}})

        if(qty < 1) return ServerResponse.badRequest({req:req, res, error:{stockError:'Stock inválido.'}})
        if(qty > product.stock) return ServerResponse.badRequest({req:req, res, error:{stockError:'Stock no disponible'}})

        const indexOfProduct = cart.products.indexOf(cartProduct)
        cart.products[indexOfProduct] = new CartProductDto(product, qty)

        await cartService.update(id_cart, {products:cart.products})
        const result = await cartService.getBy({'_id':id_cart})
        ServerResponse.success({req:req, res, data:result.products})

    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const deleteCartProductById = async(req,res)=>{
    try {
        const id_cart = req.user.cart
        const {id_prod} = req.params

        if(!id_cart) return ServerResponse.unauthorized({req:req, res, error:`No autorizado`})
        const cart = await cartService.getBy({'_id':id_cart})
        
        const product = cart.products.find(p => JSON.stringify(p._id) === JSON.stringify(id_prod))
        if(!product) return ServerResponse.notFound({req:req, res, error:`Producto con ID:${id_prod} no encontrado`})

        cart.products = cart.products.filter(p => JSON.stringify(p._id) !== JSON.stringify(id_prod))
        await cartService.update(id_cart, {products:cart.products})
        const result = await cartService.getBy({'_id':id_cart})

        ServerResponse.success({req:req, res, data:result.products})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const emptyCart = async(req,res)=>{
    try {
        const id_cart = req.user.cart
        
        if(!id_cart) return ServerResponse.unauthorized({req:req, res, error:`No autorizado`})
        
        await cartService.update(id_cart, {products:[]})
        const result = await cartService.getBy({'_id':id_cart})
        ServerResponse.success({req:req, res, data:result.products})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error})
    }
}


export default {
    getCartById,
    addProductToCart,
    updateCartProductById,
    deleteCartProductById,
    emptyCart
}