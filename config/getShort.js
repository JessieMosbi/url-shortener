const Url = require('../models/urls.js')

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

module.exports = getShort
