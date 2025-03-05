const http = require('http')
const port = 3054

http.createServer(function(req,res){
    let regex= /^\/delay\/([0-9]{1,2})$/
    let url = req.url
    let match = url.match(regex)

    if(req.method==="GET" && match!== null){
        let delay = match[1]
        let delayInMillis = delay * 1000

        console.log(`Response will be generated after ${delay} seconds`);   
            
        setTimeout(()=>{
            res.writeHead(200,"text/plain")
            res.end(http.STATUS_CODES[200])
        },delayInMillis)
    }
}).listen(port,(err)=>{
    if(err){
        console.log("Error on port",port);
    }else{
        console.log("Listenin to port",port);       
    }
})
