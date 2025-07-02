export const ERROR_MESSAGES = {
  USERNAME_MIN_LENGTH: 'El username debe tener al menos 4 caracteres',
  PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres',
  USERNAME_IN_USE: 'El username ya está en uso',
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  ROUTE_NOT_FOUND: 'Ruta no encontrada',
  PASSWORD_LOWERCASE_REQUIRED: 'Debe contener al menos una letra minúscula',
  PASSWORD_NUMBER_REQUIRED: 'Debe contener al menos un número',
  PASSWORD_SPECIAL_CHAR_REQUIRED: 'Debe contener al menos un símbolo especial',
  PASSWORD_UPPERCASE_REQUIRED: 'Debe contener al menos una letra mayúscula',
  USERNAME_REQUIRED: 'El username es obligatorio',
  PASSWORD_REQUIRED: 'La contraseña es obligatoria'
}
export const SUCCESS_MESSAGES = {
  USER_CREATED: 'Usuario creado correctamente',
  USER_LOGGED_IN: 'Usuario logueado correctamente'
}

export const MESSAGES = {
  ...ERROR_MESSAGES,
  ...SUCCESS_MESSAGES
}
