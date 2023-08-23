const routes = require("express").Router()
const authController = require("../controllers/authController");
const authMiddleware = require("../controllers/authToken");
routes.post("/SignUp",async(req,res,next)=>{
    
    const user=await authController.SignUpUser(req.body);
    res.json(user);
    next();
})

routes.post("/Login",async(req,res,next)=>{
    const user=await authController.LoginUser(req.body);
    res.json(user);
    next();
})
routes.get('/authorized',authMiddleware,(req,res)=>{
    res.json({message:'Authorized access',userId:req.userId});
})
module.exports = routes;