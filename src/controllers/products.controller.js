import { productService } from "../services/index.js";
import { ProductDto } from "../dtos/index.js"
import { ServerResponse } from '../utils/serverResponse.js'
 

const getProducts = async(req,res)=>{
    try {
        const products = await productService.getAll()
        const parsedProducts = products.map(product => new ProductDto(product))
        ServerResponse.success({req:req, res, data:parsedProducts})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const getProductById = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await productService.getBy({'_id':id})
        if(!result) return ServerResponse.notFound({req:req, res, error:`Producto con ID:${id} no encontrado`})
        const parsedProduct = new ProductDto(result)
        ServerResponse.success({req:req, res, data:parsedProduct}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const saveProduct = async(req,res)=>{
    try {        
        const data = req.body
        data.image = req.file.filename

        const product = await productService.save(data)
        const parsedProduct = new ProductDto(product)
        ServerResponse.success({req:req, res, data:parsedProduct}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateProductById = async(req,res)=>{
    try {
        const {id} = req.params
        const data = req.body
        
        const product = await productService.getBy({'_id':id})
        if(!product) return ServerResponse.badRequest({req:req, res, error:`Producto con ID:${id} no encontrado`})
        
        req.file ? data.image = req.file.filename : data.image = product.image
        
        await productService.update(id, data)
        const productUpdated = await productService.getBy({'_id':id})
        const parsedProduct = new ProductDto(productUpdated)
        ServerResponse.success({req:req, res, data:parsedProduct})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const deleteProductById = async(req,res)=>{
    try {
        const {id} = req.params
        const product = await productService.getBy({'_id':id})
        if(!product) return ServerResponse.notFound({req:req, res, error:`Producto con ID:${id} no encontrado`})
        
        await productService.delete(id)
        ServerResponse.success({req:req, res, data:`Producto con ID:${id} eliminado con éxito`})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}


export default {
    getProducts,
    getProductById,
    saveProduct,
    updateProductById,
    deleteProductById
}