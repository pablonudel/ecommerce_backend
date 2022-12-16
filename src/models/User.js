import mongoose from "mongoose";

export default class User{
    static get collection(){
        return 'Users'
    }

    static get schema(){
        return{
            name:{type:String, required:true},
            lastname:{type:String, required:true},
            email:{type:String, required:true, unique: true},
            password:{type:String, required:true},
            avatar:String,
            role:{
                type:String,
                enum:['user', 'admin'],
                default:'user'
            },
            cart:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'Carts'
            }
        }
    }
}