var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views',path.resolve('views'));
app.use(express.static(path.join(__dirname,'public')));
var users = [
    // {userName : 'li',userPassword : '123'},
    // {userName : 'liweina',userPassword : '456'}
];
//注册
app.get('/signup',function (req,res) {
    res.render('signup',{title:'注册'});
});

console.log(users);
app.post('/signup',function (req,res) {
    users.push(req.body);
    res.redirect('/signin')
});
//登录
app.get('/signin',function (req,res) {
    res.render('signin',{title:'登录'});
});
app.post('/signin',function (req,res) {
    console.log(req.body);
    var flag = users.find(function (item) {
       return item.userName == req.body.userName && item.userPassword == req.body.userPassword
    });
    if(flag) {
        res.redirect('welcome');
    }
    else {
         res.redirect('signin');
    }

});
//欢迎页
app.get('/welcome',function (req,res) {
    res.render('welcome',{title:'主页'});
});
app.listen(8080);

