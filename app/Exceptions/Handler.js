'use strict'

const Raven = require('raven')

const Env = use('Env')
const Config = use('Config')
const Youch = use('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException')
      return response.status(400).send(error.messages)

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)

      return response.status(500).send(await youch.toJSON())
    }

    return response.status(500)
  }

  async report(error) {
    Raven.config(Config.get('services.sentry.dsn'))
    Raven.captureException(error)
  }
}

module.exports = ExceptionHandler
