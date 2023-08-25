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
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'userModal'},
    clickCount: {
        type: Number,
        default: 0
    }
})

const webhook=mongoose.model('webhook',webhookSchema);
module.exports=webhook; 