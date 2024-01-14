const { error } = require('node:console')
const fs = require('node:fs')

fs.readdir('.',(err,file)=>{
    if(err){
        console.log('error al leer el directorio', err);
        return
    }

    file.forEach(file =>{
        console.log(file);
    })
})