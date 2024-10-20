const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    id:{
        type:String,
        require:true
    }, 
    title:{
     type:String,
    require:true
},
description:{
     type:Date,
    require:true
},
price:{
     type:String,
    require:true
},
category:{
    type:String,
     require:true
 },
 sold:{
    type:String,
     require:true
 }
})
module.exports=mongoose.model('ToDo',todoSchema)