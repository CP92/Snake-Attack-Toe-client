'use strict'

const store = require('../store')
const game = require('../game')
//const events = require('./events')

const signUpError = function (error) {
  console.log(error)

  $('#sign-up-message').html('<h4>The email you have entered already exists, please try another one or sign in using the email address</h4>')
}

const error = function () {
  $('#game-state-message').html('<h4>Something broke!</h4>')
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

const notLoggedIn = function () {
  $('#game-state-message').fadeIn().html('<h4>Please log in to do that!</h4>')
  setTimeout(function () { $('#game-state-message').fadeOut('slow') }, 1000)
}

const startGame = function (response) {
  $('#game-state-message').html('<h4>Game in progress!</h4>')
  $('#game-state-message').addClass('in-play')
  $('#game-state-message').removeClass('hidden')
  $('#Player-turn').html(`<h4>Player turn: ${store.currTurn.replace('_', ' ')}</h4>`)
  $('#Player-turn').removeClass('hidden')
  console.log(response.game)
  store.currGame = response
}

const gameUpdate = function (response) {
  console.log(response)

  $(`#box-${store.posClicked}`).html(`<h4>${store.currTurn.replace('player_', '')}</h4>`)
  //Check if there is a winner
  if (store.gameOver) {
    $('#game-state-message').html(`<h2>Winner Winner chicken dinner! ${store.currTurn.replace('_', ' ')}</h2>`)
  } else {

    game.togglePlayer()
    $('#Player-turn').html(`<h4>Player turn: ${store.currTurn.replace('_', ' ')}</h4>`)
  }
  console.log('end of ui')
}



const endGame = function (response) {

}

module.exports = {
  signUpError,
  signUpSuccess,
  loginSuccess,
  logOutSuccess,
  notLoggedIn,
  startGame,
  gameUpdate,
  endGame,
  error
}
