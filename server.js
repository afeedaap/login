

const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const router = require('./router');

const app = express();

const port = process.env.PORT || 7000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Define a static session secret
const sessionSecret = 'yourStaticSecret';

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/route', router);

// home route
app.get('/', (req, res) => {
  res.render('base', { title: 'loginpage' });
});

app.listen(port, () => {
  console.log('Listening to the server on http://localhost:7000');
});
