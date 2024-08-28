import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()  // funcionen las variables de entorno

const port = process.env.PORT ?? 3000

const app = express() // servidor express
const server = createServer(app) // se la añade funcionalidades de servidor http al servidor "app"
const io = new Server(server,{
  connectionStateRecovery: {}
})// se inicializa el servidor de web socket

const db = createClient({ // datos para crear la conexion con el servidor
  url: "libsql://comic-nightwing-felipemaya4.turso.io",
  authToken: process.env.DB_TOKEN
})

db.execute(`CREATE TABLE IF NOT EXISTS message ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  username TEXT
  )`) // creacion de tabla si no existe

io.on('connection', async (socket)=>{ // se escucha alguien que se conectó
  console.log('a user has conected')

  socket.on('disconnect', ()=>{ // se detecta si alguien se desconecta de la conexion web socket
    console.log('an user has discconected');
  })

  socket.on('chat message', async (msg)=>{ // escucha los mensaje de los clientes con indetificador "chat message" y emite a todos el siguiente mensaje
    let result 
    const username = socket.handshake.auth.username ?? 'anonimus' // recupera el usuario para enviarlo al servidor si noexiste por defeceto es anonimus
    try { 
     result = await db.execute({                            // se realiza la insercion del mensage en la db
      sql:'INSERT INTO message (content, username) VALUES (:msg, :username)',
      args: { msg, username }
     })
    } catch (error) {
      console.error(error)
      return
    }
    io.emit('chat message', msg, result.lastInsertRowid.toString(), username) // se emite el msg con el ultimo id de la tabla message para que el cliente lo guarde 
  
   // console.log('auth');
   // console.log(socket.handshake.auth)
  })

  
  if (!socket.recovered) {
    try {
      const result = await db.execute({
        sql: 'SELECT id, content, username FROM message WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      })

      result.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.username) // se recupera los archivos   que no han visto lo usuari
      })
    } catch (error) {
      console.error(error)
    }
  }
})
app.use(logger('dev')) // se visualisa por consola los eventos de la conexion con el servidor

app.get('/', (req, res)=>{ 
  res.sendFile(process.cwd()+'/client/index.html') // el archivo que sirve 
})

server.listen(port,()=>{  
  console.log(`server on port http://localhost:${port}`)
})