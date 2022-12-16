import multer from 'multer'
import __dirname from '../utils.js'

const storageAvatar = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, __dirname+'/public/avatars')
    },
    filename:function(req,file,cb){
        cb(null,  Date.now()+'-avatar-'+file.originalname)
    }
})

const storageProducts = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, __dirname+'/public/products')
    },
    filename: function(req,file,cb){
        cb(null,  Date.now()+'-product-'+file.originalname) 
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

export const uploadAvatar = multer({storage: storageAvatar, fileFilter:fileFilter})
export const uploadProduct = multer({storage: storageProducts, fileFilter:fileFilter})