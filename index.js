var app = require('choo')()
var css = require('sheetify')

css('tachyons')

app.model(require('./model'))

app.router((route) => [
  route('/', require('./view'))
])

const tree = app.start()
document.body.appendChild(tree)
