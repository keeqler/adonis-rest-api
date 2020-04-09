'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up() {
    this.create('projects', table => {
      table.increments()

      table.string('title').notNullable()
      table.string('description').notNullable()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
