/* todo: borrrar */
/* import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    res.status(200).send({
      message: 'Usuario logueado',
      user
    })
  } catch (error) {
    res.status(401).send({
      message: error.message || 'Error al iniciar sesion'
    })
  }
})
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log('req.body', req.body)
  try {
    const id = await UserRepository.create({ username, password })
    res.status(201).send({
      message: 'Usuario creado',
      id
    })
  } catch (error) {
    res.status(400).send({
      message: error.message || 'Error al crear el usuario'
    })
  }
})
app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
 */

import { app } from './app.js'
import { PORT } from './config/index.js'
import { MESSAGES } from './constants/messages.js'

app.listen(PORT, () =>
  console.log(`${MESSAGES.SERVER_RUNNING_MESSAGE} ${PORT}`)
)
