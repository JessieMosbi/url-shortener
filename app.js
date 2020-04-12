const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Url = require('./models/urls.js')
const getShort = require('./config/getShort.js')

// Web Server
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

// DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shorten-url', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

// route
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:shortChar', (req, res) => {
  Url.findOne({ short: req.params.shortChar })
    .then((data) => {
      if (data) return res.redirect(data.url)
      else return res.render('error')
    })
    .catch((err) => console.log(err))
})

app.post('/', (req, res) => {
  const { url } = req.body
  // ** 若需要防止有重覆的網址組合出現 **
  Url.findOne({ url })
    .then((data) => {
      if (data) {
        // 已經有資料
        return res.render('index', { message: 'Already have shorten URL! Please use this link:', url: `${req.headers.origin}/${data.short}` })
      } else {
        // 未有資料: 檢查是否有重複 short，若沒有則新增
        getShort()
          .then((randomChar) => {
            const newUrl = new Url({
              url: url,
              short: randomChar
            })

            newUrl.save()
              .then(() => res.render('index', { message: 'Success! Please use this link:', url: `${req.headers.origin}/${randomChar}` }))
              .catch((err) => console.log(err))
          })
      }
    })
})

app.get('*', (req, res) => {
  res.render('error')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listen to port 3000')
})
