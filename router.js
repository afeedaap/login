
var express = require("express");
var router = express.Router();
const cookieParser = require('cookie-parser');
const credential = {
    email : "sample@gmail.com",
    password : "sample123"
}

// Use the cookie-parser middleware
app.use(cookieParser());

// login user
router.post('/login',(req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful...!");
    }else{
        //res.end("Invalid Username")
        res.render('base', { title: "Express", logout : "invalid username and password"})
    }
});




// Use the cookie-parser and express-session middleware
router.use(cookieParser());
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Login user
router.post('/login', (req, res) => {
  if (req.body.email === credential.email && req.body.password === credential.password) {
    // Set a cookie named 'user' with the email value
    res.cookie('user', req.body.email);

    req.session.user = req.body.email;
    res.redirect('/route/dashboard');
  } else {
    res.render('base', { title: "Express", message: "Invalid username or password" });
  }
});

// Other routes...



// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;
