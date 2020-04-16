'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

async function sendMail(modelInstance) {
  console.log(1)
  const { title } = modelInstance

  const { username, email } = await modelInstance.user().fetch()
  const file = await modelInstance.file().fetch()

  Kue.dispatch(Job.key, { email, username, file, title })
}

const TaskHook = (exports = module.exports = {})

TaskHook.sendMailAfterCreate = async modelInstance => {
  if (modelInstance.user_id) await sendMail(modelInstance)
}

TaskHook.sendMailAfterUpdate = async modelInstance => {
  if (
    modelInstance.user_id &&
    modelInstance.user_id !== modelInstance.$originalAttributes.user_id
  )
    await sendMail(modelInstance)
}
