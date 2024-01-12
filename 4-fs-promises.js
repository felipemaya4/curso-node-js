const fs = require('node:fs/promises')

console.log('leyendo el primer archivo...');

fs.readFile('./archivo.txt','utf-8')
    .then(text =>{
        console.log('primer text: ', text);
    })

console.log('----> hacer esto mientras ejecuta la promise...');

console.log('leyendo el segundo archivo...');

fs.readFile('./2archivo.txt','utf-8')
 .then(text =>{
    console.log('segundo text: ',text);
 })