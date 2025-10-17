const express= require('express')
const path=require('path')
const URL = require("./models/url");  // ✅ Correct import
const urlRoute=require('./routes/url')
const { connect } = require('mongoose');
const connectMongoDB = require('./connect');
const app=express();
const PORT=8001;
app.set("view engine","ejs")
app.set('views',path.resolve('./views'))



app.use(express.json())

app.get("/front/test",async(req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home')
})


app.use("/url",urlRoute);

app.get('/url/:shortId',async(req,res)=>{

    const shortId=req.params.shortId;

   const entry= await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push:{
        visitHistory:{
            timestamp:Date.now(),
        },
    }},{new:true})
  res.redirect(entry.redirectURL);

})


connectMongoDB( "mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDB connected"))

app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`))