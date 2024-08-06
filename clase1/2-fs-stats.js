// fs file system 

const fs = require('node:fs') // modulo para manipular archivos del sistema

const stats = fs.statSync('./archivo.txt')

console.log(
    stats.isFile(), // si es archivo
    stats.isDirectory(), // si es un directorio
    stats.isSymbolicLink(), // si es un enlace simbolico
    stats.size // su tamaño en bytes
);