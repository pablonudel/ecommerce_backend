import mongoose from "mongoose";

export default class Order{
    static get collection(){
        return 'Orders'
    }

    static get schema(){
        return{
            products:[
                {
                    _id:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'Products'
                    },
                    name:String,
                    code:String,
                    price:Number,
                    qty:Number,
                    subTotal:Number
                }
            ],
            user:{
                _id:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Users'
                },
                name:String,
                lastname:String,
                email:String
            },
            total:Number,
            status:{
                type:String,
                enum:['abierta', 'cancelada', 'enviada', 'cerrada'],
                default:'abierta'
            }
        }
    }
}