const mongoose = require("mongoose");

const planteSchema =mongoose.Schema({

    name:{
        type : String,
        required:true
    },
    color:{
        type : String,
        required:true
    },
    size:{
        type : String,
        required:true
    },
    quantity:{
        type : String,
        required:true
    },
    price:{
        type : Number,
        required:true
    }
    
});

const plante = mongoose.model('Plante',planteSchema)
module.exports = plante 