// esto es para aquellos modulos nativos  que no tiene version de promise

//const {promisify}= require('node:util') // permite convertir cualquier modulo  en promesas "promise"
//const readFilePromise = promisify(fs.readFile); se espesifica que funcion se quiere convertir a version de promesas


import {readFile} from 'node:fs/promises'

console.log('leyendo el primer archivo...');
// se tiene que cambiar la extension del archivo para poder escribir el async de esta manera .mjs
// la forma por dejecto es common js y no lo permite escribir asi
const text = await readFile('./archivo.txt','utf-8')
console.log('primer text: ',text);

console.log('----> hacer esto mientras ejecutas el callback...');

console.log('leyendo el segundo archivo...');

const text2 = await readFile('./2archivo.txt','utf-8')
console.log('segundo text: ',text2);
