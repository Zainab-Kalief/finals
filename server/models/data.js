const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
  name: {type: String},
  scores: [],
  _games: [{type: Schema.Types.ObjectId, ref: 'Game'}]

}, {timestamps: true})

var GameSchema = new mongoose.Schema({
  question: {type: String},
  correct_ans: {type: String},
  fake_ans1: {type: String},
  fake_ans2: {type: String},
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

mongoose.model('User', UserSchema)
mongoose.model('Game', GameSchema)
