const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const scheduleSchema=new Schema({
    name:{type:String},
    description:{type:String},
    start_time:{type:String},
    end_time:{type:String},
    day:{type:String},
    date:{type:Array},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
},{
    timestamps:true
})

const schedules=mongoose.model("Schedule",scheduleSchema);

module.exports=schedules;