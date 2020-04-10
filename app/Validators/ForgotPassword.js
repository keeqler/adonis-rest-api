'use strict'

class ForgotPassword {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|string|email'
    }
  }
}

module.exports = ForgotPassword
