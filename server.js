const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartial(__dirname + "/views/partial");
var app = express();
app.set('view engine', 'hbs');
//adding interceptor/middleware
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now =  new Date().toString()
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log);
    next();// next calls the next middleware if exist or else calls the request handler functions
} );
app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle : 'Maintenance Page',
        message : 'We will be right back',
        year : new Date().getFullYear()
    });
});


app.get("/", (req, res) => {
    // res.send({
    //     name : "Bubai",
    //     likes : [
    //         "Computing",
    //         "Reading"
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        message : 'Welcome',
        year : new Date().getFullYear()
    })
});

app.get("/about", (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
        message : 'About',
        year : new Date().getFullYear()
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage : "Error handling the request."
    })
});

app.listen(8000, ()=> {
    console.log('Server is listening on port 8000');
});