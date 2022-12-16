import { ServerResponse, unhashPass, stringValidation, emailValidation, passwordValidation, numberValidation, roleValidation, fileValidation } from "../utils/index.js";
import { userService, productService } from "../services/index.js";
import { config } from '../configs/index.js'

export const registerValidations = async (req, res, next) => {
    const validationMsgs = {}
    const nameValidate = await stringValidation(req.body.name, 'NOMBRE')
    const lastNameValidate = await stringValidation(req.body.lastname, 'APELLIDO')
    const emailValidate = await emailValidation(req.body.email, true, false)
    const passwordValidate = passwordValidation(req.body.password)

    if(nameValidate) validationMsgs.nameError = nameValidate
    if(lastNameValidate) validationMsgs.lastNameError = lastNameValidate
    if(emailValidate) validationMsgs.emailError = emailValidate
    if(passwordValidate) validationMsgs.passwordError = passwordValidate

    if(Object.keys(validationMsgs).length > 0) return ServerResponse.badRequest({req:req, res, error:validationMsgs})    
    next();
}

export const loginValidations = async (req,res,next) => {
    const validationMsgs = {}
    const emailValidate = await emailValidation(req.body.email, false, true)
    const passwordValidate = passwordValidation(req.body.password)
    const exist = await userService.getBy({'email':req.body.email})
    
    if(emailValidate){
        validationMsgs.emailError = emailValidate
    }else{
        if(!exist && req.body.email !== config.SERVER.ADMIN.EMAIL) return ServerResponse.badRequest({req:req, res, error:{accessError:'El email no se encuentra registrado'}})
    }
        
    if(passwordValidate){
        validationMsgs.passwordError = passwordValidate
    }else{
        if(exist && !unhashPass(exist, req.body.password)) return ServerResponse.badRequest({req:req, res, error:'Password incorrecto'})
    }

    if(Object.keys(validationMsgs).length > 0) return ServerResponse.badRequest({req:req, res, error:validationMsgs})    
    next();
}

export const addProductValidations = async (req,res,next) =>{
    const validationMsgs = {}
    const nameValidate = await stringValidation(req.body.name, 'NOMBRE')
    const codeValidate = await stringValidation(req.body.code, 'CÓDIGO')
    const priceValidate = numberValidation(req.body.price, 'PRECIO', 0)
    const qtyValidate = numberValidation(req.body.stock, 'STOCK', 1)
    const fileValidate = fileValidation(req.file)

    if(nameValidate) validationMsgs.nameError = nameValidate
    if(codeValidate) validationMsgs.codeError = codeValidate
    if(priceValidate) validationMsgs.priceError = priceValidate
    if(qtyValidate) validationMsgs.stockError = qtyValidate
    if(fileValidate) validationMsgs.fileError = fileValidate

    if(Object.keys(validationMsgs).length > 0) return ServerResponse.badRequest({req:req, res, error:validationMsgs})    
    next();
}

export const updateProductValidations = async (req,res,next) =>{
    const validationMsgs = {}
    const nameValidate = await stringValidation(req.body.name, 'NOMBRE')
    const codeValidate = await stringValidation(req.body.code, 'CÓDIGO')
    const priceValidate = numberValidation(req.body.price, 'PRECIO', 0)
    const qtyValidate = numberValidation(req.body.stock, 'STOCK', 1)
    const exist = await productService.getBy({'_id':req.params.id})

    if(nameValidate) validationMsgs.nameError = nameValidate
    if(exist && exist.code !== req.body.code){
        if(codeValidate) validationMsgs.codeError = codeValidate
    }
    if(priceValidate) validationMsgs.priceError = priceValidate
    if(qtyValidate) validationMsgs.stockError = qtyValidate
    if(req.body.category === "") validationMsgs.categoryError = 'El campo CATEGORIA es requerido'
    if(req.body.active === "") validationMsgs.activeError = 'El campo ACTIVE es requerido'

    if(Object.keys(validationMsgs).length > 0) return ServerResponse.badRequest({req:req, res, error:validationMsgs})    
    next();
}

export const createUserValidations = async(req,res,next)=>{
    const validationMsgs = {}
    const nameValidate = await stringValidation(req.body.name, 'NOMBRE')
    const lastNameValidate = await stringValidation(req.body.lastname, 'APELLIDO')
    const emailValidate = await emailValidation(req.body.email, true, false)
    const passwordValidate = passwordValidation(req.body.password) 
    const roleValidate = roleValidation(req.user.role, req.body.role)

    if(nameValidate) validationMsgs.nameError = nameValidate
    if(lastNameValidate) validationMsgs.lastNameError = lastNameValidate
    if(emailValidate) validationMsgs.emailError = emailValidate
    if(passwordValidate) validationMsgs.passwordError = passwordValidate
    if(roleValidate) validationMsgs.roleError = roleValidate

    if(Object.keys(validationMsgs).length > 0) return ServerResponse.badRequest({req:req, res, error:validationMsgs})    
    next();
}

export const updateUserValidations = async(req,res,next)=>{
    const validationMsgs = {}
    const nameValidate = await stringValidation(req.body.name, 'NOMBRE')
    const lastNameValidate = await stringValidation(req.body.lastname, 'APELLIDO')
    let emailValidate = await emailValidation(req.body.email, true, false)
    const passwordValidate = passwordValidation(req.body.password) 
    const roleValidate = roleValidation(req.user.role, req.body.role)
    const user = await userService.getBy({'_id': req.params.id})
    if((req.body.email === req.user.email) || (req.body.email === user.email)) emailValidate = await emailValidation(req.body.email, false, false)

    if(nameValidate) validationMsgs.nameError = nameValidate
    if(lastNameValidate) validationMsgs.lastNameError = lastNameValidate
    if(emailValidate) validationMsgs.emailError = emailValidate
    if(passwordValidate) validationMsgs.passwordError = passwordValidate
    if(roleValidate) validationMsgs.roleError = roleValidate

    if(Object.keys(validationMsgs).length > 0) return ServerResponse.badRequest({req:req, res, error:validationMsgs})    
    next();
}