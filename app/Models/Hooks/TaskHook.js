'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = (exports = module.exports = {})

async function sendMail(modelInstance) {
  const { title } = modelInstance

  const { username, email } = await modelInstance.user().fetch()
  const file = await modelInstance.file().fetch()

  await Mail.send(
    ['emails.new_task'],
    { username, title, hasAttachment: !!file },
    message => {
      message
        .to(email)
        .from('noreply@adonisapi.dev', 'Adonis REST API')
        .subject("There's a task for you")

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}

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
