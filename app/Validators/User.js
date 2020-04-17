'use strict'

class User {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|string|email|unique:users,email',
      password: 'required|string|min:6',
      addresses: 'required|array',
      'addresses.*.street': 'required|string',
      'addresses.*.number': 'required|integer',
      'addresses.*.city': 'required|string',
      'addresses.*.state': 'required|string'
    }
  }
}

module.exports = User
