'use strict'

class ResetPassword {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|string|email',
      token: 'required|string|min:20|max:20',
      password: 'required|string|min:6'
    }
  }
}

module.exports = ResetPassword
