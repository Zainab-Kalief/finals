const mongoose = require('mongoose')
const User = mongoose.model('User')
const Game = mongoose.model('Game')

module.exports = {
  create_user: (request, response) => {
    User.findOne({name: request.body.name})
      .then(data => {
        if(data) {
          request.session.user_id = data._id
          response.json({data: 'Welcome back', status: true})
        } else {
          var user = new User({name: request.body.name})
          user.save()
            .then(data => {
              request.session.user_id = data._id
              response.json({data: data, status: true})
            })
            .catch(error => {response.json({data: error, status: false})})
        }
      })
  },
  current_user: (request, response) => {
    if(request.session.user_id) {
      User.findOne({_id: request.session.user_id})
        .then(data => {
          response.json({data: data, status: true})
        })

    } else {
      response.redirect('/')
    }
  },
  create_game: (request, response) => {
    User.findOne({_id: request.session.user_id})
      .then(user => {
        if(user) {
          var game = new Game({question: request.body.question, correct_ans: request.body.correct_ans,
              fake_ans1: request.body.fake_ans1 ,fake_ans2: request.body.fake_ans2, _user: user._id})
          game.save()
            .then(data => {
              user._games.push(data)
              user.save()
                .then(saved => {
                  console.log(saved, data);
                  response.json({data: data, status: true})
                })
                .catch( error => {response.json({data: error, status: false})})
            })
            .catch( error => {response.json({data: error, status: false})})
        } else {
          response.redirect('/')
        }
      })
      .catch( error => {response.json({data: error, status: false})})

  },
  log_out: (request, response) => {
    request.session.destroy()
    response.redirect('/')
  },
  all_games: (request, response) => {
    Game.find()
      .then(data => {
        if(data) {
          response.json({data: data, status: true})
        } else {
          response.json({data: 'No Games yet, create one', status: false})
        }
      })
  },

  user_score: (request, response) => {
    var result = 0
    User.findOne({_id: request.session.user_id})
      .then(user => {
        if(user) {

          Game.findOne({_id: request.params.game1_id})
            .then(game1 => {
              if(game1.correct_ans == request.body.option1) {
                result += 1
              }
              Game.findOne({_id: request.params.game2_id})
                .then(game2 => {
                  if(game2.correct_ans == request.body.option2) {
                    result += 1
                  }
                  Game.findOne({_id: request.params.game3_id})
                    .then(game3 => {
                      if(game3.correct_ans == request.body.option3) {
                        result += 1
                      }
                    user.scores.push(result)
                    user.save()
                      .then(data => {
                        response.json({data: data, status: true})
                      })
                      .catch( error => {response.json({data: error, status: false})})
                    })
                })
            })

        } else {
          response.redirect('/')
        }
      })
  },
  all_users: (request, response) => {
    User.find()
      .then(data => {
        response.json(data)
      })
  }
}
