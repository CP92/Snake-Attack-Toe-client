'use strict'

const config = require('../config')
const ui = require('./ui')
const store = require('../store')

const sendSignUpCreds = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const sendLoginCreds = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const sendLogOut = function () {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'DELETE'
  })
}

const sendStartGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'POST'
  })
}

const sendGameUpdate = function (slot) {
  // debugger
  return $.ajax({
    url: config.apiUrl + '/games/' + store.currGame.game.id,
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'PATCH',
    data: {
      'game': {
        'cell': {
          'index': slot,
          'value': store.currTurn.replace('player_', '')
        }
      }
    }})
}

const sendEndGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.currGame.game.id,
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'PATCH',
    data: {
      'game': {
        'over': true
      }
    }
  })
}

module.exports = {
  sendSignUpCreds,
  sendLoginCreds,
  sendLogOut,
  sendStartGame,
  sendGameUpdate,
  sendEndGame
}
