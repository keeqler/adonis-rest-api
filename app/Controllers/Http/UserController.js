'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request, response }) {
    const data = request.only(['email', 'password'])
    const addresses = request.input('addresses')

    const user = await User.create(data)

    await user.addresses().createMany(addresses)

    response.status(201).send()
  }
}

module.exports = UserController
