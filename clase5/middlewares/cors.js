import cors from 'cors' // cors permite la gestion de las paginas que consultan a la api rest si tiene todos los permisos para consulta o realizar modificaciones
// metodos normales get/post/head
//metodos complejos put/patch/delete
// para estos ultimos se realiza un pre-fligth para preguntar a la api si se pueden utilizar los metodos put/patch/delete
// es necesario agregregar una cabecera options para poder habilitar estos metodos

const ACCEPTED_ORIGINS = [ // origenes aceptados
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev',
  'http://192.168.101.5:8080'
  ]
  

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({ // manejo de cors habilita las paginas que estan en la lista para realizar consultas y operaciones
  // si no está entonces no podra realizar ninguna accion
origin: (origin, callback) => {

if (acceptedOrigins.includes(origin)) return callback(null, true)

if (!origin) return callback(null, true)

return callback(new error('not allowed by CORS'))
}
})