'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('forgotPassword', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('forgotPassword', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.group(() => {
  Route.get('files/:name', 'FileController.show')
  Route.post('files', 'FileController.store').validator('File')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(
      new Map([
        [['projects.store'], ['Project']],
        [['projects.update'], ['Project']]
      ])
    )
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(
      new Map([
        [['projects.tasks.store'], ['Task']],
        [['projects.tasks.update'], ['Task']]
      ])
    )
    .middleware(['auth'])
})
