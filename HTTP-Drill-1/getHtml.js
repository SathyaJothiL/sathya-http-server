const http = require('http')
const path = require('path')
const fs = require('fs')
const port = 3050

http.createServer(function(req,res){
    if(req.method==="GET" && (req.url === "/html" || req.url ==="/html/")){
        const filePath = path.join(__dirname,'../index.html')
        fs.readFile(filePath,'utf-8',function(err,data){
            if(err){
                console.log(http.STATUS_CODES['500']);        
                console.log(err);
                       
            }
            res.writeHead(200,{"content-type":"text/html"})
            res.end(data)
        })
    }
}).listen(port,(err)=>{
    if(err){
        console.log("Error on listening to port",port);
    }
    console.log("Listening to port",port);
    
})