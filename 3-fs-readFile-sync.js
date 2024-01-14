// ejemplo sincrono "se espera que termine una sentencia para continuar con la siguiente"
const fs = require('node:fs')

console.log('leyendo el primer archivo...');

const primertxt = fs.readFileSync('./archivo.txt','utf-8')

console.log('primer text: ',primertxt);

console.log('----> hacer esto mientras ejecutas el callback...');

console.log('leyendo el segundo archivo...');

const segundotxt = fs.readFileSync('./2archivo.txt','utf-8')

console.log('segundo text: ',segundotxt);
