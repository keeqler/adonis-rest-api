'use strict'

class Task {
  get data() {
    return { ...this.ctx.params, ...this.ctx.request.all() }
  }

  get validateAll() {
    return true
  }

  get rules() {
    return {
      id: 'integer',
      projects_id: 'integer',
      user_id: 'integer',
      file_id: 'integer',
      title: 'required|string',
      description: 'string',
      due_date: 'date'
    }
  }
}

module.exports = Task
