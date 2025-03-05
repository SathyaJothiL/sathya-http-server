const {randomUUID} = require('crypto')
const fs = require('fs')
const path = require('path')
const http = require('http')
const port = 3052

http.createServer(function(req,res){
    if(req.method==="GET" && (req.url ==="/uuid" || req.url ==="/uuid/")){
        let uuid = randomUUID()
        let uuidObject = {uuid}
        let uuidJson = JSON.stringify(uuidObject)
        res.writeHead(200,{"content-type":"application/json"})
        res.end(uuidJson)
    }
}).listen(port,(err)=>{
    if(err){
        console.log("Error listening on port",port);
    }else{
        console.log("Listening on port",port);
        
    }
})