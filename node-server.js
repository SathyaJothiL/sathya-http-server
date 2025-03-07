const http = require('http')
const port = 3010
const fs = require('fs')
const path = require('path')
const {randomUUID} = require('crypto')
 
const server = http.createServer((req,res)=>{
    try{
        if(req.method!=="GET"){
            res.writeHead(405,{"Content-Type":"text/plain"})
            res.end(`Error: 405 ${http.STATUS_CODES[405]}`)
            return
        }

        let url = req.url
        url = url.replace(/\/$/,'')

        if(url==='/html'){
            let filePath = path.join(__dirname,'index.html')
            fs.readFile(filePath,'utf-8',function(err,data){
                if(err){
                    res.writeHead(404,http.STATUS_CODES[404],{"content-type":"text/plain"})
                    res.end(`Error: 404 ${http.STATUS_CODES[404]}`)
                    return
                }else{
                    res.writeHead(200,http.STATUS_CODES[200],{"content-type":"text/html"})
                    res.end(data)
                }
            })
        }

        else if(url==='/json'){
            console.log("Reading JSON File");
            
            let filePath = path.join(__dirname,'data.json')
            fs.readFile(filePath,'utf-8',function(err,data){
                if(err){
                    res.writeHead(404,{"content-type":"text/plain"})
                    res.end(`Error: 404 ${http.STATUS_CODES[404]}`)
                    return
                }else{
                    res.writeHead(200,{"content-type":"application/json"})
                    res.end(data)
                }
            })
        }

        else if(url==='/uuid'){
            let uuid = randomUUID()
            let uuidObj = {uuid}
            let uuidJSON = JSON.stringify(uuidObj)
            res.writeHead(200,http.STATUS_CODES[200],{'content-type':'application/json'})
            res.end(uuidJSON)
        }

        else if(url.startsWith('/status')){
            let regex = /^\/status\/([0-9]{3})$/
            let match = url.match(regex)
            if(match===null){
                res.writeHead(400,{"content-type":"text/plain"})
                res.end(`Error:400 ${http.STATUS_CODES[400]}`)
                return
            }else{
                let statusCode = match[1]
                let responseData = {[statusCode]:http.STATUS_CODES[statusCode]}

                res.writeHead(200,{"content-type":"text/plain"})
                res.end(JSON.stringify(responseData))
            }
        }

        else if(url.startsWith('/delay')){
            let regex= /^\/delay\/([0-9]{1,2})$/

            let match = url.match(regex)

            if(match===null){
                res.writeHead(400,{"content-type":"text/plain"})
                res.end(`Error:400 ${http.STATUS_CODES[400]}`)
                return
            }else{
                let delay = match[1]
                let delayInMillis = delay * 1000          
                setTimeout(()=>{
                    res.writeHead(200,"text/plain")
                    res.end(http.STATUS_CODES[200])
                    },delayInMillis)
            }
        }else{
            res.writeHead(400,{"content-type":"text/plain"})
                res.end(`Error:400 ${http.STATUS_CODES[400]}`)
        }

    }catch(err){
            console.log("Error in server",err.message);               
            res.writeHead(500,{"content-type":"text/plain"})
            res.end(`Error:500 ${http.STATUS_CODES[500]}`)     
    }  
})


server.listen(3010,err=>{
    if(err){
        console.log("Error on listenting to Port",port);
        return
    }
    console.log("Listenting to port",port); 
})