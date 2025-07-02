import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { DB_PATH, SALT_ROUNDS } from '../config/index.js'

const { Schema } = new DBLocal({ path: DB_PATH })
const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class AuthRepository {
  /**
   * Crea un usuario: hash de password + UUID + inserción
   */
  static async register({ username, password }) {
    if (User.findOne({ username })) {
      throw new Error('El username ya está en uso')
    }
    const hashed = await bcrypt.hash(password, SALT_ROUNDS)
    const id = crypto.randomUUID()
    User.create({ _id: id, username, password: hashed }).save()
    return id
  }

  /**
   * Loguea un usuario: compara password hasheada
   */
  static async login({ username, password }) {
    const user = User.findOne({ username })
    if (!user) {
      throw new Error('Credenciales inválidas')
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Credenciales inválidas')
    }
    return { _id: user._id, username: user.username }
  }
}
