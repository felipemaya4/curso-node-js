// esto es para aquellos modulos nativos  que no tiene version de promise

//const {promisify}= require('node:util') // permite convertir cualquier modulo  en promesas "promise"
//const readFilePromise = promisify(fs.readFile); se espesifica que funcion se quiere convertir a version de promesas


const {readFile} = require('node:fs/promises')

//IIFE INMEDIATLY INVOKED FUNCTION EXPRESSION
// se realiza esta forma para poder utilizar async await en extensiones common js  .js

async function init(){
    console.log('leyendo el primer archivo...');
        
        const text = await readFile('./archivo.txt','utf-8')
        console.log('primer text: ',text);

        console.log('----> hacer esto mientras ejecuta');

        console.log('leyendo el segundo archivo...');

        const text2 = await readFile('./2archivo.txt','utf-8')
        console.log('segundo text: ',text2);   
}

init()

// esta expresion es igual a la anterior ;(async()=>{***} )()
//  ;(
//    async ()=>{
//          console.log('leyendo el primer archivo...');         
//            const text = await readFile('./archivo.txt','utf-8')
//            console.log('primer text: ',text);
//
//            console.log('----> hacer esto mientras ejecutas el callback...');
//
//            console.log('leyendo el segundo archivo...');
//
//            const text2 = await readFile('./2archivo.txt','utf-8')
//            console.log('segundo text: ',text2);
//        }
//    )()


