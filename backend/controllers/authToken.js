
const jwt=require('jsonwebtoken');
const authMiddleware=(req,res,next)=>{
    const authHeader=req.header('Authorization');
    if(!authHeader||!authHeader.startWith('Bearer ')){
        return res.status(401).json({error:'Unauthorized'});

    }
    const token=authHeader.substring(7);
    try{
        const decoded=jwt.verify(token,'secret');
        req.userId=decoded.userId;
        next();
        
    }catch(error){
        res.status(401).json({error:'Unauthorized'});
    }
};
module.exports=authMiddleware; 