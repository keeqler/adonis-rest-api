'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index({ params }) {
    return await Task.query()
      .where('project_id', params.projects_id)
      .with('user', qb => qb.select('id', 'email'))
      .fetch()
  }

  async store({ params, request }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    return await Task.create({
      ...data,
      project_id: parseInt(params.projects_id)
    })
  }

  async show({ params, response }) {
    const task = await Task.find(params.id)

    if (!task) return response.status(404).send()

    return task
  }

  async update({ params, request, response }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    const updateSuccess = await Task.query().where('id', params.id).update(data)

    if (!updateSuccess) response.status(404).send()
  }

  async destroy({ params, request, response }) {
    const deleteSuccess = await Task.query().where('id', params.id).delete()

    if (!deleteSuccess) return response.status(404).send()
  }
}

module.exports = TaskController
