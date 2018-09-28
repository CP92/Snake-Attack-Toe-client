'use strict'

const authEvents = require('./auth/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  $('#sign-up-form').on('submit', authEvents.onSignUpCreds)
  $('#sign-in-form').on('submit', authEvents.onLoginCreds)
  $('#sign-out').on('click', authEvents.onLogOut)
  $('.box').on('click', authEvents.onBoxClick)
  $('#start-game-button').on('click', authEvents.onGameStart)
})
