'use strict'

const store = require('../store')

const signUpError = function (error) {
  console.log(error)

  $('#sign-up-message').html('<h4>The email you have entered already exists, please try another one or sign in using the email address</h4>')
}

const signUpSuccess = function () {
  $('#sign-up-message').html('')
  $('#sign-up-form').addClass('hidden')
  $('#sign-up-message').html('<h4>Sign up successful! Please login.</h4>')
}

const loginSuccess = function (response) {
  $('#sign-in-message').fadeIn().html('<h4>Login successful!</h4>')
  setTimeout(function () { $('#sign-in-message').fadeOut('slow') }, 1000)
  console.log(response)
  const user = response.user
  store.token = user.token
  $('#login-message').append(`<h4>${user.token}</h4>`)
  $('#sign-out').removeClass('hidden')
  $('#sign-in-form').addClass('hidden')
  $('#sign-up-form').addClass('hidden')
}

const logOutSuccess = function (response) {
  $('#logout-message').fadeIn().html('<h4>Logout successful!</h4>')
  setTimeout(function () { $('#logout-message').fadeOut('slow') }, 1000)
  $('#sign-out').addClass('hidden')
}

module.exports = {
  signUpError,
  signUpSuccess,
  loginSuccess,
  logOutSuccess
}
