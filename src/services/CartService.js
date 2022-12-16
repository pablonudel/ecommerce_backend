import Cart from '../models/Cart.js'
import GenericRepo from './GenericRepo.js'

export default class CartService extends GenericRepo{
    constructor(dao){
        super(dao, Cart.collection)
    }
}