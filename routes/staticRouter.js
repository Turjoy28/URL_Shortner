const express= require('express')
const router=express.Router();
const URL= require('../models/url');
const { restrictTo } = require('../middlewares/auth');

router.get('/admin/urls',restrictTo(['Admin']),async (req,res)=>{
  const allUrls=await URL.find({})
  return res.render("home",{
    urls:allUrls,
  })
})


router.get('/',restrictTo(['Normal','Admin']), async (req, res) => {
  
    const allUrls=await URL.find({createdBy:req.user._id})
  return res.render('home', {
    urls:allUrls,
    user:req.user,
  });
});


router.get('/signup',(req,res)=>{
    return res.render("signup")
})
router.get('/login',(req,res)=>{
    return res.render("login")
})


module.exports=router;






























module.exports=router;