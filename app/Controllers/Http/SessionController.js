'use strict'

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all()

    try {
      return await auth.attempt(email, password)
    } catch (error) {
      response.status(401).send()
    }
  }
}

module.exports = SessionController
