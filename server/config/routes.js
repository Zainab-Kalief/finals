const game = require('../controllers/methods.js')
const path = require('path')

module.exports = function (app) {
  app.post('/create_user', game.create_user)
  app.get('/current_user', game.current_user)
  app.post('/create_game', game.create_game)
  app.get('/log_out', game.log_out)
  app.get('/all_games', game.all_games)
  app.post('/user_score/:game1_id/:game2_id/:game3_id', game.user_score)
  app.get('/all_users', game.all_users)

  app.all('*', (request, response) => {
    response.sendFile(path.resolve('./client/dist/index.html'))
  })
}
