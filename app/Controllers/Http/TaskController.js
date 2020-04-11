'use strict'

const Task = use('App/Models/Task')
const User = use('App/Models/User')
const Project = use('App/Models/Project')
const File = use('App/Models/File')

class TaskController {
  async index({ params, request }) {
    const { page } = request.get()

    return await Task.query()
      .where('project_id', params.projects_id)
      .with('user', qb => qb.select('id', 'email'))
      .paginate(page)
  }

  async store({ params, request, response }) {
    const { projects_id: project_id } = params
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    const userExists = await User.find(data.user_id)

    if (!userExists)
      return response.status(404).send({ error: 'User not found' })

    const projectExists = await Project.find(project_id)

    if (!projectExists)
      return response.status(404).send({ error: 'Project not found' })

    const fileExists = await File.find(data.file_id)

    if (!fileExists)
      return response.status(404).send({ error: 'File not found' })

    return await Task.create({ ...data, project_id })
  }

  async show({ params, response }) {
    const task = await Task.findBy({
      id: params.id,
      project_id: params.projects_id
    })

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

    const updateSuccess = await Task.query()
      .where({
        id: params.id,
        project_id: params.projects_id
      })
      .update(data)

    if (!updateSuccess) response.status(404).send()
  }

  async destroy({ params, response }) {
    const deleteSuccess = await Task.query()
      .where({
        id: params.id,
        project_id: params.projects_id
      })
      .delete()

    if (!deleteSuccess) return response.status(404).send()
  }
}

module.exports = TaskController
