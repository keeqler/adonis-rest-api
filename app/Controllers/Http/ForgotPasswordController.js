'use strict'

const crypto = require('crypto')

const Mail = use('Mail')
const Hash = use('Hash')

const User = use('App/Models/User')

class ForgotPasswordController {
  async store({ request, response }) {
    const email = request.input('email')

    const user = await User.findBy('email', email)

    if (!user)
      return response
        .status(400)
        .send({ error: "Could't find an user using that e-mail address" })

    const token = crypto.randomBytes(10).toString('hex')

    user.token = token
    user.token_expiry = Date.now() + 600000 // Adds 10 minutes

    await user.save()
    await Mail.send(['emails.forgot_password'], { token }, message => {
      message
        .to(email)
        .from('noreply@adonisapi.dev', 'Adonis REST API')
        .subject('Password recovery code')
    })
  }

  async update({ request, response }) {
    const { email, token, password } = request.all()

    const updateSuccess = await User.query()
      .where('email', email)
      .where('token', token)
      .where('token_expiry', '>', Date.now())
      .update({
        password: await Hash.make(password),
        token: null,
        token_expiry: null
      })

    if (!updateSuccess) response.status(401).send({ error: 'Invalid token' })
  }
}

module.exports = ForgotPasswordController
