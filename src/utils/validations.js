import { userService, productService } from "../services/index.js";
import { config } from "../configs/config.js";

export const stringValidation = async (attr, field) => {
    if(!attr) return `El campo ${field} es requerido`
    if(attr.length < 2) return `El ${field} debe tener al menos 2 caracteres`
    if(field === 'CÓDIGO'){
        const exist = await productService.getBy({'code':attr})
        if(exist) return `Producto con código:${attr} ya se encuentra registrado`
    }
    return false
}

export const numberValidation = (attr, field, minNumber) => {
    if(!attr) return `El campo ${field} es requerido`
    if(attr < minNumber) return `El número ingresado es inválido`
}

export const emailValidation = async (email, unique, isLogin) => {    
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const exist = await userService.getBy({'email':email})
    
    if(!email) return 'El campo EMAIL es requerido'
    if(isLogin === false){
        if(email === config.SERVER.ADMIN.EMAIL) return 'EMAIL no válido'
    }
    if(emailPattern.test(email) === false) return 'El EMAIL debe tener un formato válido'
    if(exist && unique) return 'El EMAIL ya se encuentra registrado'
    
    return false
}

export const passwordValidation = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
    if(!password) return 'El campo PASSWORD es requerido'
    if(passwordPattern.test(password) === false) return 'El PASSWORD debe tener 6 caracteres con al menos 1 letra Mayuscula, 1 letra minuscula y 1 número'
    return false
}

export const roleValidation = (userRole, role)=>{
    if(userRole === 'SuperAdmin'){
        if(!role) return 'El campo ROL es requerido.'
        if(role !== 'user' && role !== 'admin') return 'ROL inválido.'
    }

    if(userRole !== 'SuperAdmin' && role) return 'No permitido'
    return false
}

export const fileValidation = (file) => {
    if(file === undefined) return 'Imagen requerida'
    return false
}