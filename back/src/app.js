import express from 'express'
import authRoutes from './controllers/auth.routes.js'
import { MESSAGES } from './constants/messages.js'

export const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use((req, res) =>
  res.status(404).json({ message: MESSAGES.ROUTE_NOT_FOUND })
)
