const express = require('express')
const app = express()
const path = require('path')

app.use('/public', express.static(path.join(__dirname,'/public')))
app.get('/', function(req, res) {
    var duongDanCuaFile=path.join(__dirname,'home.html')
    res.sendFile(duongDanCuaFile)
})



app.listen(3000, function(){
  //console.log(`Example app listening on port http://localhost:${port}`)
})