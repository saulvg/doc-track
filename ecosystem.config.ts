/* Configuracion global de pm2 para el back y el front */
/* 
Ejemplo -> 
module.exports = {
  apps: [
    {
      name: 'api',
      cwd: './back',
      script: 'npm',
      args: 'start',
      env: { NODE_ENV: 'production', PORT: 4000 }
    },
    {
      name: 'frontend',
      cwd: './front',
      script: 'npm',
      args: 'start',
      env: { NODE_ENV: 'production', PORT: 3000 }
    }
  ]
};

*/
