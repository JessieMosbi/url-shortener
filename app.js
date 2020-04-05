const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

// route
app.get('/', (req, res) => {
  res.send('index')
})

app.listen(3000, () => {
  console.log(`Server listen to port 3000`)
})