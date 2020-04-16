'use strict'

class User {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|string|email|unique:users,email',
      password: 'required|string|min:6'
    }
  }
}

module.exports = User
