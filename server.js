const express = require('express');
var app= express();
var bodyParser = require('body-parser')
const path = require('path');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname,'public')))

const AccountModel =require('./models/account')
const PAGE_SIZE = 2
app.get('/home',(req,res, next)=>{
    res.sendFile(path.join(__dirname,'home.html'))
})
app.get('/user', (req, res, next)=>{
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
            AccountModel.countDocuments({}).then((total)=>{
                console.log(total);
                var totalPage=Math.ceil(total/PAGE_SIZE)
                res.json({
                    total: total,
                    totalPage: totalPage,
                    data: data
                });
            })
        })
        .catch(err=>{
            res.status(500).json('error sever')
        })
    }else{
        AccountModel.find({})
        .then(data=>{
            AccountModel.countDocuments({}).then((total)=>{
                console.log(total);
                var totalPage=Math.ceil(total/PAGE_SIZE)
                res.json({
                    total: total,
                    totalPage: totalPage,
                    data: data
                });
            })
        })
        .catch(err=>{
            res.status(500).json('error sever')
        })
    }
}) 
app.listen(3000,()=>{
    console.log('Sever started on port ');
});