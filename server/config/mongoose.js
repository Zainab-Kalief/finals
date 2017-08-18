var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var fs = require('fs')
var path = require('path')
mongoose.connect('mongodb://localhost/finals', {'useMongoClient': true})
var models_path = path.join(__dirname, '../models')
fs.readdirSync(models_path).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(models_path + '/' + file)
  }
})
