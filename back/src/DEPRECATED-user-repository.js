import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { z } from 'zod'
import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const strongPassword = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .refine(
    (pw) => /[A-Z]/.test(pw),
    'Debe contener al menos una letra mayúscula'
  )
  .refine(
    (pw) => /[a-z]/.test(pw),
    'Debe contener al menos una letra minúscula'
  )
  .refine((pw) => /[0-9]/.test(pw), 'Debe contener al menos un número')
  .refine(
    (pw) => /[^A-Za-z0-9]/.test(pw),
    'Debe contener al menos un símbolo especial'
  )

const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(4, 'Username must be at least 3 characters long'),
  password: strongPassword
})

const createUserSchema = userSchema.omit({ _id: true })
const loginSchema = z.object({
  username: z.string().min(1, 'El username es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria')
})

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create({ username, password }) {
    const result = createUserSchema.safeParse({ username, password })
    if (!result.success) {
      throw new Error(result.error.errors.map((e) => e.message).join(','))
    }
    const hashedPassword = await bcrypt.hash(result.data.password, SALT_ROUNDS)

    if (User.findOne({ username })) {
      throw new Error('El username ya está en uso')
    }

    const id = crypto.randomUUID()

    User.create({
      _id: id,
      username: result.data.username,
      password: hashedPassword
    }).save()

    return id
  }

  static async login({ username, password }) {
    const result = loginSchema.safeParse({
      username,
      password
    })
    if (!result.success) {
      throw new Error(result.error.errors.map((e) => e.message).join(','))
    }

    const user = User.findOne({ username: result.data.username })
    if (!user) throw new Error('Credenciales inválidas')

    const isValid = await bcrypt.compare(result.data.password, user.password)

    if (!isValid) {
      throw new Error('Credenciales inválidas')
    }

    return {
      _id: user._id,
      username: user.username
    }
  }
}
