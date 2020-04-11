'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  async handle({ response, auth }, next) {
    try {
      await auth.check()
    } catch (error) {
      return response
        .status(401)
        .json({ message: 'Missing or invalid jwt token' })
    }
    await next()
  }
}

module.exports = Auth
