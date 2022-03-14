require('dotenv').config()
let app = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: 'poc-arun',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      // encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  },
  api_key: process.env.API_KEY,
  otg_service_url: process.env.OTG_SERVICE_URL || 'http://localhost:3000'
}

module.exports = app
