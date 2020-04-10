'use strict'

class Session {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|string|email',
      password: 'required|string|min:6'
    }
  }
}

module.exports = Session
