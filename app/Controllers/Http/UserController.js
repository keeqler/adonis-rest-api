'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request, response }) {
    const data = request.only(['email', 'password'])

    await User.create(data)

    response.status(201).send()
  }
}

module.exports = UserController
