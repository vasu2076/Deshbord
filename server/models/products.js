const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description :{
        type:String,    
        required:true
    },
     catName:{
        type:String,
        default:null,
    },
    brand:{
        type:String,
        default:''
    },
    
     countInStock:{
        type:Number,
        required:true
    },
     price :{
        type :Number,
        default:0
    },
    Oldprice:{
        type:Number,
        default:0,
    },
     discount:{
        type:Number,
        required:true,
    },
     productSize:
        {
            type:String,
            default:null
        },
        rating :{
        type:Number,
        default:0,
    },
    images:[
        {
            type:String,
            required:true,
        }
    ],
})
 
exports.Product = mongoose.model('Product',productSchema) 