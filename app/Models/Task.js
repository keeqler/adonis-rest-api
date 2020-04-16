'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  static boot() {
    super.boot()

    this.addHook('afterCreate', 'TaskHook.sendMailAfterCreate')
    this.addHook('afterUpdate', 'TaskHook.sendMailAfterUpdate')
  }

  project() {
    return this.belongsTo('App/Models/Project')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  file() {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
