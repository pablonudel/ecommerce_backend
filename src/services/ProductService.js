import Product from '../models/Product.js'
import GenericRepo from './GenericRepo.js'

export default class ProductService extends GenericRepo{
    constructor(dao){
        super(dao, Product.collection)
    }
}