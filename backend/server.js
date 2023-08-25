//Import dependencies
const express=require('express')
const connectToDb=require("./config/connectToDb");
const webhook=require("./models/webhook");
const cors=require('cors');
require("dotenv").config()
const app =express();
const webHookRoutes = require("./routes/webhook");
const authRoutes = require("./routes/auth");
const authMiddleware = require('./controllers/authToken');
//Configure express app
app.use(express.json());
app.use(cors());

//Start Server
//Database call
connectToDb();
app.use('/api/auth', authRoutes)
app.use(authMiddleware)
app.use('/api/user', authRoutes)
app.use('/api/webhook', webHookRoutes)
//Routing
app.get('/',(req,res)=>{
    res.json({hello:'world'});
});

app.listen(process.env.PORT,()=>{
    console.log('Server listening on',process.env.PORT)
});