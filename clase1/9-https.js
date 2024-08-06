const http = require('node:http');
const { findAvaliablePort } = require('./10-free-ports');
const desiredPort = process.env.PORT ?? 1234
const server = http.createServer((req,res)=>{
    console.log('request recived');
    res.end('hola mundo');
})

findAvaliablePort(desiredPort)
.then(port =>{
    server.listen(port,()=>{
    console.log(`server listening on port http://localhost:${port}`);
})
})

