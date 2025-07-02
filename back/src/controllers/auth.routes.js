import { Router } from 'express'
import { AuthRepository } from '../repositories/auth.repository.js'
import { createUserSchema, loginSchema } from '../schemas/auth.schema.js'
const router = Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.errors })
  }
  try {
    const id = await AuthRepository.register(parsed.data)
    return res.status(201).json({ message: 'Usuario creado', id })
  } catch (err) {
    return res.status(409).json({ message: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.errors })
  }
  try {
    const user = await AuthRepository.login(parsed.data)
    return res.status(200).json({ message: 'Usuario logueado', user })
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
})

export default router
