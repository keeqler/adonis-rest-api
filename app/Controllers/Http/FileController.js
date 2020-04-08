'use strict'

const crypto = require('crypto')

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async show({ params, response }) {
    const file = await File.findBy('file', params.name)

    if (!file) return response.status(404).send()

    response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store({ request, response }) {
    const file = request.file('file', { size: '2mb' })
    const fileName = `${crypto.randomBytes(16).toString('hex')}.${file.subtype}`

    await file.move(Helpers.tmpPath('uploads'), { name: fileName })

    if (!file.moved()) return response.status(500).send()

    return await File.create({
      file: fileName,
      name: file.clientName,
      type: file.type,
      subtype: file.subtype
    })
  }
}

module.exports = FileController
