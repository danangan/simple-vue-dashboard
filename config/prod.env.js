'use strict'

require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  API_DOMAIN: JSON.stringify(process.env.API_DOMAIN_PROD),
  FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY_PROD),
  FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN_PROD),
  FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID_PROD),
  FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID_PROD),
  FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET_PROD),
  FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL_PROD)
}
