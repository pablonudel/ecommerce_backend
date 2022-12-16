import Order from '../models/Order.js'
import GenericRepo from './GenericRepo.js'

export default class OrderService extends GenericRepo{
    constructor(dao){
        super(dao, Order.collection)
    }
}