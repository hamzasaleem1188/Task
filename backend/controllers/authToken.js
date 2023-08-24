
const jwt=require('jsonwebtoken');
const authMiddleware=(req,res,next)=>{
    const authHeader=req.header('Authorization');
    if(!authHeader||!authHeader.startWith('Bearer ')){
        return res.status(401).json({error:'Unauthorized'});

    }
    const token=authHeader.split(" ")[1];
    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
        
    } catch(error){
        res.status(401).json({error:'Unauthorized'});
    }
};
module.exports=authMiddleware; 