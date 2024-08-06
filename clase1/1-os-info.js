const os = require('node:os')

console.log('info de sistema operativo');

console.log('nombre de sistema ', os.platform());
console.log('version ' , os.release());
console.log('arquitectura ', os.arch() );
console.log('cpus ', os.cpus()); //para poder escalar procesos en node
console.log('memoria libre ', os.freemem()/1024/1024);
console.log('memoria total ', os.totalmem()/1024/1024);
console.log('tiempo encendido', os.uptime()/60/60);