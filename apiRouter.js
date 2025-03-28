const express=require('express');
var router = express.Router()

router.get('/',(req,res)=>{
    res.json('router 1 user GET')
})
router.post('/',(req,res)=>{
    console.log(req.headers);
    res.json('router 1 user POST' + " " +req.body.username + " " + req.headers.lam)
})
router.put('/',(req,res)=>{
    res.json('router 1 user PUT')
})
router.delete('/',(req,res)=>{
    res.json('router 1 user DELETE')
})
module.exports = router