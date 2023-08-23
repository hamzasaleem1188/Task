const mongoose=require('mongoose');

const webhookSchema=new mongoose.Schema({
    webURL:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    btnName:{
        type:String,
        required:true,
    },
})

const webhook=mongoose.model('webhook',webhookSchema);
module.exports=webhook; 