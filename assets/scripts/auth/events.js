'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('/home/pappy/wdi/projects/Snake-Attack-Toe-client/lib/get-form-fields.js')

const onSignUpCreds = function (event) {

  console.log('events fired')
  console.log(event)
  event.preventDefault()

  const credData = getFormFields(event.target)

  console.log(credData)

  api.sendSignUpCreds(credData)
    .then(ui.signUpSuccess)
    .catch(ui.signUpError)
}

const onLoginCreds = function (event) {
  console.log(event)
  event.preventDefault()

  const credData = getFormFields(event.target)

  console.log(credData)

  api.sendLoginCreds(credData)
    .then(ui.loginSuccess)
    .catch(ui.error)
}

const onLogOut = function (event) {
  console.log(event)
  event.preventDefault()
  api.sendLogOut()
    .then(ui.logOutSuccess)
    .catch(ui.error)
}

module.exports = {
  onSignUpCreds,
  onLoginCreds,
  onLogOut
}
