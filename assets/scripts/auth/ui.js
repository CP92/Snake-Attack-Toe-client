'use strict'

const store = require('../store')
const game = require('../game')

//  Warns the player signing up that they've already signed up with that email address
const signUpError = function (error) {
  console.log(error)
  $('#sign-up-message').html('<h4>The email you have entered already exists, please try another one or sign in using the email address</h4>')
}
// Generic error when something unforseen breaks
const error = function () {
  $('#game-state-message').fadeIn().html('<h4>Something broke!</h4>')
  setTimeout(function () { $('#sign-in-message').fadeOut('slow') }, 1000)
}
// shows the player they are signed up
const signUpSuccess = function () {
  $('#sign-up-message').html('')
  $('#sign-up-form').addClass('hidden')
  $('#sign-up-message').fadeIn().html('<h4>Sign up successful! Please login.</h4>')
  setTimeout(function () { $('#sign-up-message').fadeOut('slow') }, 1000)
  $('#sign-up-form').trigger('reset')
}
//  shows the player they are logged in
const loginSuccess = function (response) {
  $('#sign-in-message').fadeIn().html('<h4>Login successful!</h4>')
  setTimeout(function () { $('#sign-in-message').fadeOut('slow') }, 1000)
  console.log(response)
  const user = response.user
  store.token = user.token
  $('#login-message').append(`<h4>${user.token}</h4>`)
  $('#sign-out').removeClass('hidden')
  $('#change-password').removeClass('hidden')
  $('#sign-in-form').addClass('hidden')
  $('#sign-up-form').addClass('hidden')
  $('#sign-in-button').addClass('hidden')
  $('#sign-up-button').addClass('hidden')
  $('#sign-in-form').trigger('reset')
  $('#list-games').removeClass('hidden')
}

const listGames = function (response) {
  console.log(response.games)
  const number = response.games
  $('#game-list').html(`Games played by user: ${number.length}`)
  console.log(response)
}

const onPasswordChangeShow = function () {
  if ($('#change-password-form').hasClass('hidden')) {
    $('#change-password-form').removeClass('hidden')
  } else {
    $('#change-password-form').addClass('hidden')
  }
}

const passChangeSuccess = function () {
  $('#change-password-form').addClass('hidden')
  $('#sign-in-message').fadeIn().html('<h4>Password change successful!</h4>')
  setTimeout(function () { $('#sign-in-message').fadeOut('slow') }, 1000)
  $('#change-password-form').trigger('reset')
}

const loginError = function () {
  $('#game-state-message').fadeIn().html('<h4>Please enter a existing email and password.</h4>')
  setTimeout(function () { $('#game-state-message').fadeOut('slow') }, 1000)
}

const showLoginForm = function () {
  if ($('#sign-in-form').hasClass('hidden')) {
    $('#sign-up-form').addClass('hidden')
    $('#sign-in-form').removeClass('hidden')
  } else {
    $('#sign-in-form').addClass('hidden')
  }
}

const showSignUpForm = function () {
  if ($('#sign-up-form').hasClass('hidden')) {
    $('#sign-in-form').addClass('hidden')
    $('#sign-up-form').removeClass('hidden')
  } else {
    $('#sign-up-form').addClass('hidden')
  }
}

//  Shows the player they are logged out
const logOutSuccess = function (response) {
  // store.token = null
  console.log(store)
  $('#logout-message').fadeIn().html('<h4>Logout successful!</h4>')
  setTimeout(function () { $('#logout-message').fadeOut('slow') }, 1000)
  $('#sign-out').addClass('hidden')
  $('#change-password-form').addClass('hidden')
  $('#change-password').addClass('hidden')
  $('#list-games').addClass('hidden')
  $('#game-list').addClass('hidden')
  $('#sign-in-button').removeClass('hidden')
  $('#sign-up-button').removeClass('hidden')
  $('#change-password-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
}

//  Stops the user from interacting with the game board if the game is over
const noInputAllowed = function () {
  if (!store.token) {
    $('#game-state-message').fadeIn().html('<h4>Please log in to do that!</h4>')
    setTimeout(function () { $('#game-state-message').fadeOut('slow') }, 1000)
  } else if (store.gameOver || !store.gameOn) {
    $('#game-state-message').fadeIn().html('<h4>Please start a new game!</h4>')
    setTimeout(function () { $('#game-state-message').fadeOut('slow') }, 1000)
  }
}

const wipeBoard = function () {
  for (let i = 0; i < 9; i++) {
    $(`#box-${i}`).html('')
  }
  store.gameOver = false
  store.isTie = false
}

//  Updates the ui for a new game
const startGame = function (response) {
  $('#game-state-message').fadeIn().html('<h4>Game in progress!</h4>')
  // $('#game-state-message').addClass('in-play')
  $('#game-state-message').removeClass('hidden')
  $('#Player-turn').html(`<h4>Player turn: ${store.currTurn.replace('_', ' ')}</h4>`)
  $('#Player-turn').removeClass('hidden')
  store.currGame = response
}

const gameUpdate = function (response) {
  console.log(response)
  $(`#box-${store.posClicked}`).html(`<h4>${store.currTurn.replace('player_', '')}</h4>`)
  // Check if there is a winner, update UI if there is
  if (store.gameOver && !store.isTie) {
    $('#game-state-message').html(`<h2>Winner Winner chicken dinner! ${store.currTurn.replace('_', ' ')}</h2>`)
  } else if (store.gameOver && store.isTie) {
    $('#game-state-message').html(`<h2>Its a tie! Both players win and lose.</h2>`)
  } else {
    //  If no winner toggle player turn and update UI
    game.togglePlayer()
    $('#Player-turn').html(`<h4>Player turn: ${store.currTurn.replace('_', ' ')}</h4>`)
  }
}

module.exports = {
  signUpError,
  signUpSuccess,
  loginSuccess,
  logOutSuccess,
  noInputAllowed,
  startGame,
  gameUpdate,
  error,
  onPasswordChangeShow,
  passChangeSuccess,
  wipeBoard,
  listGames,
  showLoginForm,
  showSignUpForm,
  loginError
}
