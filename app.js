require('dotenv').config();
require('./db/db');
const Usr = require('./db/usr');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {engine} = require('express-handlebars');
const app = express();
const port = process.env.PORT;
const router = require('./router');

/* Session Store to Database */
const mySession = MongoStore.create({
  mongoUrl: process.env.URI,
  dbName: 'bcrypt',
  ttl: 6 * 1 * 60 * 60
});

/* Create Cookies */
app.use(session({
  name: 'UsrID',
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: true,
  autoRemove: 'disabled',
  store: mySession,
  cookies:{maxAge:604800000}
}));

/* Body Parser */
app.use(express.urlencoded({extended:false}));

/* Templates Engine */
app.engine('hbs',engine({extname:'hbs'}));
app.set('view engine','hbs');

/* Routes */
app.use(router);

/* Development Server */
app.listen(port,()=>console.log("Server listening on the port 5000"));