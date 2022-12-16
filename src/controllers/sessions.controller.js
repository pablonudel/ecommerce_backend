import { ServerResponse } from "../utils/index.js";

const register = (req,res)=>{
    if(req.error) return req.error
    const user = {id:req.user._id, name:req.user.name, lastname:req.user.lastname, email:req.user.email, role:req.user.role, cart:req.user.cart}
    ServerResponse.success({req:req, res, data:user})    
}

const login = (req,res)=>{
    const user = {id:req.user._id, name:req.user.name, lastname:req.user.lastname, email:req.user.email, role:req.user.role, avatar:req.user.avatar, cart:req.user.cart}
    ServerResponse.success({req:req, res, data:user})
}

const logOut = (req,res)=>{
    req.session.destroy(error => {
        if(error) return ServerResponse.internalError({req:req, res, data:'Internal Server Error'})
        ServerResponse.success({req:req, res, data:'Deslogueado'})
    })
}

export default {
    register,
    login,
    logOut
}