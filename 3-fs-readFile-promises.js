// esto es para aquellos modulos nativos  que no tiene version de promise
//const {promisify}= require('node:util') // permite convertir cualquier modulo  en promesas "promise"
//const readFilePromise = promisify(fs.readFile); se espesifica que funcion se quiere convertir a version de promesas

const fs = require('node:fs/promises')

// este ejemplo fue hecho transformado para trabajar con promesas
console.log('leyendo el primer archivo...');

fs.readFile('./archivo.txt','utf-8')
    .then(text =>{
         console.log('primer text: ',text);
});

console.log('----> hacer esto mientras ejecutas el callback...');

console.log('leyendo el segundo archivo...');

fs.readFile('./2archivo.txt','utf-8')
    .then(text =>{
        console.log('segundo text: ',text);
})
