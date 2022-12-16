export default class Product{
    static get collection(){
        return 'Products'
    }

    static get schema(){
        return{
            name:{type:String, required:true},
            description:String,
            code:{type:String, required:true, unique:true},
            image:{type:String, required:true},
            price:{type:Number, required:true},
            category:{
                type:String,
                default:'Sin Categoria'
            },
            stock:{type:Number, dafault:1},
            active:{type:Boolean, default:true}
        }
    }
}