'use strict'

class Project {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      title: 'required|string',
      description: 'required|string'
    }
  }
}

module.exports = Project
