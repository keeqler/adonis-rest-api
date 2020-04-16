'use strict'

class Task {
  get data() {
    return { ...this.ctx.params, ...this.ctx.request.all() }
  }

  get validateAll() {
    return true
  }

  get sanitizationRules() {
    return {
      id: 'to_int',
      projects_id: 'to_int',
      user_id: 'to_int',
      file_id: 'to_int'
    }
  }

  get rules() {
    return {
      id: 'integer',
      projects_id: 'required|integer|exists:users,id',
      user_id: 'integer|exists:users,id',
      file_id: 'integer|exists:projects,id',
      title: 'required|string',
      description: 'string',
      due_date: 'date'
    }
  }
}

module.exports = Task
