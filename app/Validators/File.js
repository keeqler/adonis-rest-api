'use strict'

class ForgotPassword {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      file: 'required|object'
    }
  }
}

module.exports = ForgotPassword
