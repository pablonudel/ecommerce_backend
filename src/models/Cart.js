import mongoose from "mongoose";

export default class Cart{
    static get collection(){
        return 'Carts'
    }

    static get schema(){
        return{
            products:[
                {
                    id:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'Products'
                    },
                    name:String,
                    code:String,
                    image:String,
                    price:Number,
                    qty:{
                        type:Number,
                        default:1
                    },
                    subTotal:Number
                }
            ]
        }
    }
}