const store = require('./store')
const events = require('./auth/events')

const checkGameOver = function (gameCells) {
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
}

const togglePlayer = function () {
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
  doesExist
}
