'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index() {
    return await Project.query()
      .with('user', qb => qb.select('id', 'email'))
      .fetch()
  }

  async store({ request, auth }) {
    const data = request.only(['title', 'description'])

    return await Project.create({ ...data, user_id: auth.user.id })
  }

  async show({ params, response }) {
    const project = await Project.query()
      .with('user', qb => qb.select('id', 'email'))
      .with('tasks')
      .where({ id: params.id })
      .first()

    if (!project) return response.status(404).send()

    return project
  }

  async update({ params, request, response }) {
    const data = request.only(['title', 'description'])

    const updateSuccess = await Project.query()
      .where({ id: params.id })
      .update(data)

    if (!updateSuccess) return response.status(404).send()
  }

  async destroy({ params, response }) {
    const deleteSuccess = await Project.query().where('id', params.id).delete()

    if (!deleteSuccess) return response.status(404).send()
  }
}

module.exports = ProjectController
