import { userService, cartService } from "../services/index.js";
import { UserDto } from "../dtos/index.js"
import { ServerResponse, hashPass } from '../utils/index.js'
 
const getUsers = async(req,res)=>{
    try {
        const users = await userService.getAll()
        const parsedUsers = users.map(user => new UserDto(user))
        ServerResponse.success({req:req, res, data:parsedUsers})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const getUserById = async(req,res)=>{
    try {
        const {id} = req.params
        
        const user = await userService.getBy({'_id':id})
        if(!user) return ServerResponse.notFound({req:req, res, error:`Usuario con ID:${id} no encontrado`})

        const parsedUser = new UserDto(user)
        ServerResponse.success({req:req, res, data:parsedUser}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const createUser = async(req,res)=>{
    try {
        const data = req.body
        data.password = hashPass(data.password)

        if(data.role === 'user'){
            const cart = await cartService.save()
            data.cart = cart._id
        }

        const newUser = await userService.save(data)
        const parsedUser = new UserDto(newUser)
        ServerResponse.success({req:req, res, data:parsedUser})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateUserById = async(req,res)=>{
    try {
        const {id} = req.params
        const newData = req.body
        const userSession = req.user

        if((JSON.stringify(userSession._id) !== JSON.stringify(id)) && (userSession.role !== 'SuperAdmin')) 
        return ServerResponse.unauthorized({req:req, res, error:'No autorizado'})
       
        const user = await userService.getBy({'_id':id})
        !user && ServerResponse.notFound({req:req, res, error:`Usuario con ID:${id} no encontrado`})

        req.file && (newData.avatar = req.file.filename)
        if(user.avatar && !req.file) newData.avatar = user.avatar
        if(!user.avatar && !req.file) newData.avatar = null
        req.user.role === 'SuperAdmin' ? newData.role = req.body.role : newData.role = req.user.role

        newData.password = hashPass(newData.password)

        await userService.update(id, newData)
        const updatedUser = await userService.getBy({'_id':id})
        const parsedUser = new UserDto(updatedUser)
        ServerResponse.success({req:req, res, data:parsedUser})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const deleteUserById = async(req,res)=>{
    try {
        const {id} = req.params
        const user = await userService.getBy({_id:id})
        const userSession = req.user
        if(!user) return ServerResponse.notFound({req:req, res, error:`Usuario con ID:${id} no encontrado`})
        
        if((JSON.stringify(userSession._id) !== JSON.stringify(id)) && (userSession.role !== 'SuperAdmin')) 
        return ServerResponse.unauthorized({req:req, res, error:'No autorizado'})
        
        const userCart = user.cart
        await cartService.delete(userCart)
        await userService.delete(id)
        
        ServerResponse.success({req:req, res, data:`Usuario con ID:${id} eliminado con éxito`})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}


export default {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
}