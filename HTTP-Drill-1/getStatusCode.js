const url = require('url')
const http = require('http')
const port = 3053

http.createServer(function(req,res){
    let regex = /^\/status\/([0-9]{3})$/
    // let parsedUrl = url.parse(req.url,true)
    // let urlPath = parsedUrl.pathname
    let urlPath = req.url
    let match = urlPath.match(regex)

    if(req.method === "GET" && match!==null){
        let statusCode = match[1]
        res.writeHead(200,"text/plain")
        res.end(http.STATUS_CODES[statusCode])
    }
}).listen(port,(err)=>{
    if(err){
        console.log("Error while listening to port",port);       
    }else{
        console.log("Listening to port",port);       
    }
})
