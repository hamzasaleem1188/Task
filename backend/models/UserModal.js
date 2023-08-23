const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});
userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRETKEY)
    }
    catch(error){
        return error;
    }
}


module.exports=mongoose.model('userModal',userSchema);; 