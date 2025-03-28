const express = require('express');
var app= express();
var bodyParser = require('body-parser')
var router = require("./apiRouter")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const AccountModel =require('./models/account')
const PAGE_SIZE = 2
app.get('/user', (req, res,next)=>{
    var page = req.query.page;
    if(page){
        page = parseInt(page)
        if(page<1){
            page=1
        }
        var skipNumber=(page-1) * PAGE_SIZE

        AccountModel.find({})
        .skip(skipNumber)
        .limit(PAGE_SIZE)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json('loi sever')
        })
    }else{
        AccountModel.find({})
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json('loi sever')
        })
    }
})  
app.listen(3000,()=>{
    console.log('Sever started on port');
});