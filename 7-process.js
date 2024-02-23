 console.log(process.argv); // argumentos de entrada ireccion de ejecucion y direccion de ubicacion del archivo ejecutado

//controlar proceso y su salida

//process.exit(0)// 0 finaliza todo bien 1 finaliza con errorer

// podemos controlar los eventos del proceso

//process.on('exit',() =>{
    // limpiar los recursos
//})

// current working directory

console.log('cwd: ',process.cwd()) // te muestra la ubicacion desde donde se llamo la ejecucion del app