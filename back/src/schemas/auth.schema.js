import { z } from 'zod'
import { MESSAGES } from '../constants/messages.js'

const strongPassword = z
  .string()
  .min(8, MESSAGES.USERNAME_MIN_LENGTH)
  .refine((pw) => /[A-Z]/.test(pw), MESSAGES.PASSWORD_UPPERCASE_REQUIRED)
  .refine((pw) => /[a-z]/.test(pw), MESSAGES.PASSWORD_LOWERCASE_REQUIRED)
  .refine((pw) => /[0-9]/.test(pw), MESSAGES.PASSWORD_NUMBER_REQUIRED)
  .refine(
    (pw) => /[^A-Za-z0-9]/.test(pw),
    MESSAGES.PASSWORD_SPECIAL_CHAR_REQUIRED
  )

const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(4, MESSAGES.USERNAME_MIN_LENGTH),
  password: strongPassword
})

export const createUserSchema = userSchema.omit({ _id: true })
export const loginSchema = z.object({
  username: z.string().min(1, MESSAGES.USERNAME_REQUIRED),
  password: z.string().min(1, MESSAGES.PASSWORD_REQUIRED)
})
