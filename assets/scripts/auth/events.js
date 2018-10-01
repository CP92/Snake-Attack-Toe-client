'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const game = require('../game')

const onSignUpCreds = function (event) {
  event.preventDefault()
  const credData = getFormFields(event.target)
  api.sendSignUpCreds(credData)
    .then(ui.signUpSuccess)
    .catch(ui.signUpError)
}

const onLoginCreds = function (event) {
  event.preventDefault()

  const credData = getFormFields(event.target)

  api.sendLoginCreds(credData)
    .then(ui.loginSuccess)
    .catch(ui.loginError)
}

const onListGamesShow = function () {
  api.sendListGames()
    .then(ui.listGames)
    .catch()
}

const onPasswordChange = function (event) {
  event.preventDefault()
  const passData = getFormFields(event.target)

  api.sendPassChange(passData)
    .then(ui.passChangeSuccess)
    .catch(ui.wrongPassChange)
}

const onLogOut = function (event) {
  //console.log(event)
  event.preventDefault()
  api.sendLogOut()
    .then(ui.logOutSuccess)
    .catch(ui.error)
}

const onGameStart = function (event) {
  store.moves = 0
  store.currGame = null
  store.gameOn = true
  ui.wipeBoard()
  store.currTurn = 'player_x'
  api.sendStartGame()
    .then(ui.startGame)
    .catch(ui.noInputAllowed)
}

const onGameOver = function () {
  api.sendEndGame()
    .then(ui.endGame)
    .catch()
}

const onBoxClick = function (event) {
  if (store.token && store.gameOn && !game.doesExist(parseInt(event.target.getAttribute('id').replace('box-', '')))) {
    store.posClicked = parseInt(event.target.getAttribute('id').replace('box-', ''))
    store.moves += 1
    //console.log(store.moves)
    const cellData = store.currGame
    cellData.game.cells[parseInt(event.target.getAttribute('id').replace('box-', ''))] = store.currTurn.replace('player_', '')
    store.currGame = cellData
    const over = game.checkGameOver(store.currGame.game.cells)
    //console.log(over)
    if (over) {
      store.gameOn = false
    }
    api.sendGameUpdate(parseInt(event.target.getAttribute('id').replace('box-', '')), over)
      .then(ui.gameUpdate)
      .catch(ui.error)
  } else {
    ui.noInputAllowed(event)
  }
}



module.exports = {
  onSignUpCreds,
  onLoginCreds,
  onLogOut,
  onBoxClick,
  onGameStart,
  onGameOver,
  onPasswordChange,
  onListGamesShow
}
