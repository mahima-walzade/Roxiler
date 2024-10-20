const Todomodel = require('../models/Todomodel')
const ToDomodel = require('../models/Todomodel')

module.exports.getToDo = async(req,res)=>{
    const toDo = await ToDomodel.find()
    res.send(toDo)
}

module.exports.saveToDo =async(req,res)=>{
    const {id,title,description,price,category,sold}=req.body
    Todomodel
    .create({id,title,description,price,category,sold})
    .then((data)=>{
        console.log("Added Successfully");
        console.log(data)
        res.send(data)
    })
}

module.exports.updateToDo =async(req,res)=>{
    const{_id,title,description,price,category,sold}=req.body
    Todomodel
    .findByIdAndUpdate(_id,{title,description,price,category,sold})
    .then(()=>res.send("Updates Successfuly"))
}

module.exports.deleteToDo =async(req,res)=>{
    const {_id}=req.body
    Todomodel
    .findByIdAndDelete(_id)
    .then(()=>res.send("Deleted Successfuly"))
    .catch((err)=>console.log(err))
}

