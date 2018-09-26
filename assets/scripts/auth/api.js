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

module.exports = {
  sendSignUpCreds,
  sendLoginCreds,
  sendLogOut
}
