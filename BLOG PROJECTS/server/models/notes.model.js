const mongoose=require("mongoose")

const notesSchema=new mongoose.Schema({
    title:String,
    body:String,
    notesImage:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROlpbROsuLWFnUQWjoTX-rtcoX3__48J66Zw&s"
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

const Notesmodel=mongoose.model("notes",notesSchema)
module.exports=Notesmodel;