import DBlocal from 'db-local'
import crypto from 'crypto'
const { Schema } = new DBlocal({ path: 'db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static create ({ username, password }) {
    // 1. validacion de los datos se puede usar zod
    if (typeof username !== 'string') throw new Error('user must be a string')
    if (username.length < 3) throw new Error('user must be at least 3 characters long')
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 3) throw new Error('password must be at least 3 characters long')

    // 2. que el usuarion no existe

    const user = User.finOne({ username })
    if (user) throw new Error('user already exists')
    // 3. crear el usuario

    const id = crypto.randomUUID()
    User.create({
      _id: id,
      username,
      password
    }).save()
    return id
  }
  /* static login ({ username, password }) {
  } */
}
