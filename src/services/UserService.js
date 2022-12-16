import User from '../models/User.js'
import GenericRepo from './GenericRepo.js'

export default class UserService extends GenericRepo{
    constructor(dao){
        super(dao, User.collection)
    }
}