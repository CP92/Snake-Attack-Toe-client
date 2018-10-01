const store = require('./store')
const events = require('./auth/events')

const game = {}

const checkGameOver = function (gameCells) {
/*
  if (gameCells.some(function (e, i, a) {
    return e !== '' && i > 1 && e === a[i - 2] && e === a[i - 1]
  })) {
    store.gameOver = true
    return store.gameOver
  } else if (gameCells.some(function (e, i, a) {
    return e !== '' && i > 1 && e === a[i - 8] && e === a[i - 4]
  })) {
    store.gameOver = true
    return store.gameOver
  } else if (gameCells.some(function (e, i, a) {
    return e !== '' && i > 1 && e === a[i - 6] && e === a[i - 3]
  })) {
    store.gameOver = true
    return store.gameOver
  } else if (store.moves === 9) {
    store.gameOver = true
    store.isTie = true
    return store.gameOver
  }
*/

  if ((gameCells[0] === gameCells[1] && gameCells[0] !== '') && gameCells[1] === gameCells[2]) {
    store.gameOver = true
    return store.gameOver
  } else if ((gameCells[3] === gameCells[4] && gameCells[3] !== '') && gameCells[4] === gameCells[5]) {
    store.gameOver = true
    return store.gameOver
  } else if ((gameCells[6] === gameCells[7] && gameCells[6] !== '') && gameCells[7] === gameCells[8]) {
    store.gameOver = true
    return store.gameOver
  } else if ((gameCells[0] === gameCells[4] && gameCells[0] !== '') && gameCells[4] === gameCells[8]) {
    store.gameOver = true
    return store.gameOver
  } else if ((gameCells[2] === gameCells[4] && gameCells[2] !== '') && gameCells[4] === gameCells[6]) {
    store.gameOver = true
    return store.gameOver
  } else if ((gameCells[0] === gameCells[3] && gameCells[0] !== '') && gameCells[3] === gameCells[6]) {
    store.gameOver = true
    return store.gameOver
  } else if ((gameCells[1] === gameCells[4] && gameCells[1] !== '') && gameCells[4] === gameCells[7]) {
    store.gameOver = true
    return store.gameOver
  } else if ((gameCells[2] === gameCells[5] && gameCells[2] !== '') && gameCells[5] === gameCells[8]) {
    store.gameOver = true
    return store.gameOver
  } else if (store.moves === 9) {
    store.gameOver = true
    store.isTie = true
    return store.gameOver
  }
}

const togglePlayer = function () {
  //console.log('toggled')
  if (store.currTurn === 'player_x') {
    store.currTurn = 'player_o'
  } else {
    store.currTurn = 'player_x'
  }
}

const doesExist = function (pos) {
  if (store.currGame.game.cells[pos] === '') {
    return false
  } else {
    return true
  }
}

module.exports = {
  togglePlayer,
  checkGameOver,
  doesExist,
  game
}
