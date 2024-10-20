const Todomodel = require('../models/Todomodel')
const ToDomodel = require('../models/Todomodel')

module.exports.getToDo = async(req,res)=>{
    const toDo = await ToDomodel.find()
    res.send(toDo)
}

module.exports.saveToDo =async(req,res)=>{
    const {assignto,status,duedate,priority,description}=req.body
    Todomodel
    .create({assignto,status,duedate,priority,description})
    .then((data)=>{
        console.log("Added Successfully");
        console.log(data)
        res.send(data)
    })
}

module.exports.updateToDo =async(req,res)=>{
    const{_id,assignto,status,duedate,priority,description}=req.body
    Todomodel
    .findByIdAndUpdate(_id,{assignto,status,duedate,priority,description})
    .then(()=>res.send("Updates Successfuly"))
}

module.exports.deleteToDo =async(req,res)=>{
    const {_id}=req.body
    Todomodel
    .findByIdAndDelete(_id)
    .then(()=>res.send("Deleted Successfuly"))
    .catch((err)=>console.log(err))
}

