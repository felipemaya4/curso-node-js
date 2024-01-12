const fs = require('node:fs')
// este ejemplo fue hecho con callback 
console.log('leyendo el primer archivo...');

fs.readFile('./archivo.txt','utf-8',(err,text)=>{
    console.log('primer text: ',text);
})

console.log('----> hacer esto mientras ejecutas el callback...');

console.log('leyendo el segundo archivo...');

fs.readFile('./2archivo.txt','utf-8',(err,text)=>{
    console.log('segundo text: ',text);
})
