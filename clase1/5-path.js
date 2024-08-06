const path = require('node:path')

// tipo de barra separadora segun SO
console.log(path.sep);

//unir rutas con path.join
const filePath = path.join('content','subfolder','test.txt')
console.log(filePath);
//obtener el nombre del archivo de la direccion con su extension
const base = path.basename('/temp/midu/secret/test.js')
console.log(base);
// obtiene el nombre del archivo de la direccion sin la extension
const fileName = path.basename('/temp/midu/secret/test.js','.js')
console.log(fileName);

//obtener solo la extension del nombre del archivo
const extension = path.extname('mi.juego.fav.exe')
console.log(extension);
