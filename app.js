const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Url = require('./models/urls.js')

const createShort = () => {
  return new Promise((resolve, reject) => {
    const randomChar = Math.random().toString(36).slice(-5)
    Url.findOne({ short: randomChar })
      .then((data) => {
        if (!data) return resolve(randomChar)
        // console.log(randomChar + '!!!')
        // if (randomChar.substr(0, 1) === 'n') return resolve(randomChar)
        else return resolve()
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

async function getShort () {
  try {
    let short = false
    while (!short) {
      short = await createShort()
    }
    return short
  } catch (e) {
    console.warn(e)
  }
}

// Web Server
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

// DB
mongoose.connect('mongodb://localhost/shorten-url', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

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
      if (data) return res.redirect(data.url);
    })
    .catch((err) => console.log(err))
})

app.post('/', (req, res) => {
  const { url } = req.body
  // 檢查有無此 url 的縮寫
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

app.listen(3000, () => {
  console.log('Server listen to port 3000')
})
