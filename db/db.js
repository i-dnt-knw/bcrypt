require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.URI;

mongoose.connect(db).then(()=>console.log('Connection Successful 🚀🚀')).catch(e=>console.log(e,'Database connection faild'));