'use strict'

const Raven = require('raven')

const Config = use('Config')
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { response }) {
    if (error.name === 'ValidationException')
      response.status(error.status).send(error.messages)
  }

  async report(error) {
    Raven.config(Config.get('services.sentry.dsn'))
    Raven.captureException(error)
  }
}

module.exports = ExceptionHandler
