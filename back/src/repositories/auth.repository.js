import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { DB_PATH, SALT_ROUNDS } from '../config/index.js'
import { MESSAGES } from '../constants/messages.js'

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
      throw new Error(MESSAGES.USERNAME_IN_USE)
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
      throw new Error(MESSAGES.INVALID_CREDENTIALS)
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS)
    }
    return { _id: user._id, username: user.username }
  }
}
