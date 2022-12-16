import { ServerResponse } from '../utils/serverResponse.js'
export function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        ServerResponse.unauthorized({req:req, res, error:'No autorizado'})
    }
}
export function isAdmin(req, res, next){
    const user = req.user
    if(user.role === 'admin' || user.role === 'SuperAdmin'){
        next();
    }else{
        ServerResponse.unauthorized({req:req, res, error:'No autorizado'})
    }
}

export function isSuperAdmin(req, res, next){
    const user = req.user
    if(user.role === 'SuperAdmin'){
        next();
    }else{
        ServerResponse.unauthorized({req:req, res, error:'No autorizado'})
    }
}

export function ownAccount(req,res, next){
    const user = req.user
    const {id} = req.params
    if(JSON.stringify(user._id) !== JSON.stringify(id)) return ServerResponse.unauthorized({req:req, res, error:'No autorizado'})
    next()
}

export function userOwnAccount(req,res,next){
    const user = req.user
    const {id} = req.params
    if((user.role === 'user' && JSON.stringify(user._id) !== JSON.stringify(id)) || (user.role !== 'SuperAdmin' && user.role !== 'admin') ) return ServerResponse.unauthorized({req:req, res, error:'No autorizado'})
    next()
}