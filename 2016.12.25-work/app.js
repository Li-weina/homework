var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var fs = require('fs');
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));

// var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views',path.resolve('views'));
app.use(express.static(path.join(__dirname,'public')));

function getUser(callback) {
    fs.readFile('./users.json', 'utf8', function (err,data) {
        try{
            data = JSON.parse(data);
        }catch (e){
            data = [];
        }
        callback(data);
    })
}
function setUser(data,callback) {
    fs.writeFile('./users.json', JSON.stringify(data),callback);
}

app.get('/signup',function(req,res){
    res.render('signup',{title:'用户注册',error:req.session.error});
});

app.post('/signup',function(req,res){
    var user = req.body;
    getUser(function (data) {
        var flag = data.find(function (item) {
            return item.username == user.username;
        });
        console.log(flag);
        if(flag){
            req.session.error = '用户名已注册';
            res.redirect('/signup');
        }else {
            req.session.error = '';
            req.session.value = 'user.username';
            data.push(user);
            setUser(data,function () {
                res.redirect('/signin');
            })
        }
    })

});
//登录
app.get('/signin',function(req,res){
    res.render('signin',{title:'用户登录',error:req.session.error,value:req.session.value});
});
app.post('/signin',function(req,res) {
    var user = req.body;
    getUser(function (data) {
        var flag = data.find(function (item) {
            return item.username == user.username && user.password == item.password;
        });
        if (flag) {
            req.session.error = '';
            res.redirect('/welcome');

        } else {
            req.session.error = '用户名或密码不正确';
            res.redirect('/signin');
        }

    });
});
//欢迎页
app.get('/welcome',function(req,res){
    res.render('welcome',{title:'欢迎页'});
});
app.listen(8080);