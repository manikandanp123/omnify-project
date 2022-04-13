const mongoose=require("mongoose");
const {Schema}=mongoose;

const userSchema=new Schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String,required:true}
},{
    timestamps:true
})

const users=mongoose.model("User",userSchema);

module.exports=users;
