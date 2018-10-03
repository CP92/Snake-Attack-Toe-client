'use strict'

const config = require('../config')
//const ui = require('./ui')
const store = require('../store')

const sendSignUpCreds = function (data) {
  //console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const sendLoginCreds = function (data) {
  //console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const sendPassChange = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'PATCH',
    data
  })
}



const sendLogOut = function () {
  //console.log(store)
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

const sendGameUpdate = function (slot, over) {
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
        },
        'over': over
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

const sendListGames = function () {
  //console.log('List api called')
  return $.ajax({
    url: config.apiUrl + '/games?over=true',
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'GET'
  })
}

module.exports = {
  sendSignUpCreds,
  sendLoginCreds,
  sendLogOut,
  sendStartGame,
  sendGameUpdate,
  sendEndGame,
  sendPassChange,
  sendListGames
}
