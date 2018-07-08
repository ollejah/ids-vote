// const bodyParser = require('body-parser')
const express = require('express')
const axios = require('axios')
const app = express()

// app.use(bodyParser.urlencoded({
//   extended: false
// }))
// app.use(bodyParser.json())

app.all('*', function(req, res, next) {
  if (!req.get('Origin')) return next()

  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET,POST')
  res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')

  if ('OPTIONS' == req.method) return res.send(200)
  next()
})

/**
 * Vote
 */
app.post('/vote', (req, res) => {
  const params = new URLSearchParams()
  params.append('vote', 'school_vote')
  params.append('vote_index', 2)

  // axios.post('https://design-mate.ru/', params)
  axios
    .post('https://design-mate.ru/', 'vote=school_vote&vote_index=2')
    .then(response => {
      console.log(response.status)
      res.sendStatus(response.status) // <= send status to the client
    })
    .catch(error => {
      console.log(error)
      res.send({
        err,
      }) // <= send error
    })
})

app.post('/result', (req, res) => {
  axios
    .post('https://design-mate.ru/?vote_res_show=true&vote_name=school_vote')
    .then(response => {
      const data = response.data.split('<h6>')[0]
      res.send(data) // <= send data to the client
    })
    .catch(error => {
      console.log(error)
      res.send({
        err,
      }) // <= send error
    })
})

app.listen(3000, () => {
  console.log('Started on http://localhost:3000')
})

const options = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: '10d',
  redirect: false,
  setHeaders: (res, path, stat) => {
    res.set('x-timestamp', Date.now())
  },
}

/**  Serve Static */
app.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
app.use('/', express.static(`${__dirname}/dist/`, options))