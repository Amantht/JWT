var colors= require('colors')
var dotenv =require('dotenv')
var express = require('express')
var jwt=require('jsonwebtoken')
const PORT= process.env.PORT || 8081;
const key=process.env.JWT_TOKEN;
const app=express();
dotenv.config();
app.get('/api',function(req,res){
    res.json({
        text:'my api success'
    });
});


//normal without json one
// app.post('/api/login',function(req,res){
//     res.json({
//         text:'login success'
//     });
// });


//with json webtoken
app.post('/api/login',function(req,res){
    const user={id:3};
    const token=jwt.sign({user},'key');
    res.json({
        token:token
    });
});

app. get ('/api/protected', ensureToken, function(req, res){
    jwt.verify(req.token, 'key', function (err, data) {
    if(err){
        res.sendStatus(403);
    }else{
    res.json({
    text: 'this data is protected',
    data: data
    });
    }
    })
    });
    function ensureToken (req,res,next){
        const bearerHeader=req.headers ["authorization"];
        if (typeof bearerHeader!=='undefined' ){
        const bearer=bearerHeader. split (" ");
        const bearerToken=bearer[1];
        req. token=bearerToken;
        next ();
        }
        else{
        res.sendStatus(403);
        }
    }
app.listen(PORT,function(){
    console.log('App listening to port ${PORT}'.bgRed);
});