// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

/*
const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const walkSync = d => {
  return fs.statSync(d).isDirectory()
    ? fs.readdirSync(d).map(f => walkSync(path.join(d, f)))
    : d
}

async function copyAssets() {
  const { stdout, stderr } = await exec(
    `rm -rf css && cp -r '../dist/assets/css/' 'css/'`
  )
  if (stderr) console.error(`error: ${stderr}`)
  console.log(`Number of files ${stdout}`)
  return walkSync('css/')
}
copyAssets().then(res => {
  var style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = res[0]
  // document.head.appendChild(style)
  document.getElementsByTagName('head')[0].appendChild(style)
})
*/

const axios = require('axios')
const api = axios.create({
  baseURL: 'https://design-mate.ru',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    'Access-Control-Allow-Origin': '*',
  },
})

window.qs = document.querySelector.bind(document)
window.qsa = document.querySelectorAll.bind(document)
Element.prototype.on = Element.prototype.addEventListener
Element.prototype.off = Element.prototype.removeEventListener

const $root = qs('html')
const $loader = qs('.js-loader')
const $update = qs('.js-update')
const $results = qs('.js-results')

qs('a[href="#vote"]').on('click', e => {
  e.preventDefault()
  vote()
})

qs('a[href="#update"]').on('click', e => {
  e.preventDefault()
  getResults()
})

const vote = () => {
  api
    .post('/', 'vote=school_vote&vote_index=2')
    .then(response => {
      console.log(response.status)
      getResults()
    })
    .catch(error => error)
}

const getResults = () => {
  console.log('get results')
  // Before fetch
  $root.classList.add('is-loading')
  $update.classList.add('is-rotate')
  $loader.classList.remove('hidden')

  api
    .post('/', 'vote_res_show=true&vote_name=school_vote')
    .then(response => {
      const data = response.data.split('<h6>')[0]
      showResults(data)
    })
    .catch(error => error)
}

const showResults = res => {
  console.log('parse results')
  $results.innerHTML = res // prerender
  const $rlines = Array.from(qsa('.js-results .rline'))

  const rates = $rlines.map(el => el.querySelector('.ocount').innerText)
  const max = Math.max(...rates)

  const map = $rlines.map(el => {
    const str = el.querySelector('span').innerText.split(' / ')
    const rate = el.querySelector('.ocount').innerText
    const percent = Math.round((rate / max) * 100)

    return `
      <article class="rline" data-rate="${rate}">
        <header>
          <h4>${str[0]}</h4> 
          <small>${str[1]}</small>
        </header>
        <big>${rate}</big>
        <span class="rline-bar" style="width:${percent}%"></span>
      </article>`
  })
  $results.innerHTML = map.join('')
  $results.removeAttribute('hidden')

  $root.classList.remove('is-loading')
  $update.classList.remove('is-rotate')
  $loader.classList.add('hidden')
}

/**
 * Init, check document states
 */
console.time('readyStateInteractive')
console.time('readyStateComplete')
document.addEventListener('readystatechange', () => {
  console.log(document.readyState)
  if (document.readyState === 'interactive') {
    $root.classList.remove('is-loading')
    getResults()
    console.timeEnd('readyStateInteractive')
  }
  if (document.readyState === 'complete') {
    const int = setInterval(() => getResults(), 1000 * 600)
    console.timeEnd('readyStateComplete')
  }
})