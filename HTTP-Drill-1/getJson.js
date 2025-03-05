const http = require('http')
const path = require('path')
const fs = require('fs')
const port = 3051

http.createServer(function(req,res){
    if(req.method==="GET" && (req.url==="/json" || req.url ==='/json/')){
        const filePath = path.join(__dirname,'data.json')
        fs.readFile(filePath,'utf-8',function(err,data){
            if(err){
                console.log(http.STATUS_CODES[500]);
                return
            }else{
                res.writeHead(200,{"content-type":"application/json"})
                res.end(data)
            }
        })
    }
}).listen(port,(err)=>{
    if(err){
        console.log("Error while listeningt to port",port);
    }else{
        console.log("Listening to port",port);
        
    }
})

