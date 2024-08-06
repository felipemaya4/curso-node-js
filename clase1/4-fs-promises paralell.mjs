
import { readFile } from 'node:fs/promises'
//ejecuta todas las promesas a la vez liberando recursos y muestra cuando todas esten listas
Promise.all([
    readFile('./archivo.txt','utf-8'),
    readFile('./2archivo.txt','utf-8')
]).then(([text,secondtxt])=>{
    console.log('primer text: ',text)
    console.log('second text: ',secondtxt)
})

