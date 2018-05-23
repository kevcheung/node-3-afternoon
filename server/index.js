require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');


const checkForSession = require(`${__dirname}/middlewares/checkForSession`);

const swag = require('./controllers/swag_controller');
const auth = require('./controllers/auth_controller');
const cart = require('./controllers/cart_controller');
const search = require('./controllers/search_controller');
const app = express();

app.use(json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
);
app.use( checkForSession );

app.get('/api/swag', swag.read);

app.post('/api/login', auth.login);
app.post('/api/register', auth.register);
app.post('/api/signout', auth.signout);
app.get('/api/user', auth.getUser);

app.post('/api/cart', cart.add);
app.post('/api/cart/checkout', cart.checkout);
app.delete('/api/cart', cart.delete);

app.get('/api/search', search.search);

const port = process.env.PORT || 3000;
app.listen( port, () => {console.log(`${port}, I READ YOU`)});