require('../db/db');
const Usr = require('../db/usr');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/login',(req,res)=>{
  if(req.session.name != null){
  res.redirect('/');
  }else{res.render('login')}
});
router.post('/login',async(req,res)=>{
  const {email,pwd} = req.body;
  if(email != null){
    const verify = await Usr.findOne({email:email});
    const isMatch = await bcrypt.compare(pwd,verify.pwd);
    if(verify.email === email && isMatch){
     req.session.name = verify.name;
     req.session.email = verify.email;
     req.session.pwd = verify.pwd;
      res.redirect('/');
    }else{res.json({msg:"Non Registered User"})}
  }
});

router.get('/',(req,res)=>{
  if(req.session.name != null){
  res.render('dashboard',{
    name: req.session.name,
    email: req.session.email,
    hash: req.session.pwd
   });
  }else{res.redirect('/login')}
});

router.post('/logout',(req,res)=>{
  req.session.destroy(()=>{
    console.log("Session Destroy...");
  });
  res.redirect('/');
});

router.get('/reg',(req,res)=>{
  res.render('reg');
});
router.post('/reg',async(req,res)=>{
  try {
    const hashPWD = await bcrypt.hash(req.body.pwd,10);
    const data = new Usr({
      name: req.body.name,
      email: req.body.email,
      pwd: hashPWD
    });
    await data.save();
    res.redirect('/');
  } catch(e) {res.redirect('/reg')}
});


module.exports = router;