const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    assignto:{
        type:String,
        require:true
    }, 
status:{
     type:String,
    require:true
},
 duedate:{
     type:Date,
    require:true
},
 priority:{
     type:String,
    require:true
},
 description:{
    type:String,
     require:true
 }
})
module.exports=mongoose.model('ToDo',todoSchema)