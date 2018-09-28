'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const game = require('../game')

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

const onGameStart = function (event) {
  store.currTurn = 'player_x'
  api.sendStartGame()
    .then(ui.startGame)
    .catch(ui.notLoggedIn)
}

const onGameOver = function () {
  api.sendEndGame()
    .then(ui.endGame)
    .catch()
}

const onBoxClick = function (event) {
  if (store.token && store.gameOver !== true) {
    store.posClicked = parseInt(event.target.getAttribute('id').replace('box-', ''))
    store.moves += 1
    //console.log(store.currGame.cells)
    const cellData = store.currGame
    console.log(parseInt(event.target.getAttribute('id').replace('box-', '')))
    cellData.game.cells[parseInt(event.target.getAttribute('id').replace('box-', ''))] = store.currTurn.replace('player_', '')
    //console.log(cellData.game)
    store.currGame = cellData
    //console.log(store.currGame.game.cells)
    game.checkGameOver(store.currGame.game.cells)
    //console.log(store.gameOver)
    api.sendGameUpdate(parseInt(event.target.getAttribute('id').replace('box-', '')))
      .then(ui.gameUpdate)
      .catch(ui.error)
  } else {
    ui.notLoggedIn()
  }
  console.log('before over check')
}



module.exports = {
  onSignUpCreds,
  onLoginCreds,
  onLogOut,
  onBoxClick,
  onGameStart,
  onGameOver
}
