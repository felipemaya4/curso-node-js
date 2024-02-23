
const fs = require('node:fs/promises')
// con promesas

fs.readdir('.')
    .then(files =>{
       files.forEach(file =>{
         console.log(file);
       })
    })
    .catch(err =>{
        if(err){
            console.log('error al leer el directorio', err);
            return
        }
    })