// Enable webpack HMR for extracted reelements
module.hot && module.hot.accept()

import './styles/app.scss'

/** Node environment */
const BASE_URL = PRODUCTION ? 'https://ollejah.ru:3000' : '/api'

/**
 * DOM helpers
 */
// import '@/helpers/dom'
window.qs = document.querySelector.bind(document)
window.qsa = document.querySelectorAll.bind(document)
Element.prototype.on = Element.prototype.addEventListener
Element.prototype.off = Element.prototype.removeEventListener

/**
 * Votes API
 */
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
  fetch(`${BASE_URL}/vote`, {
    method: 'POST',
  })
    .then(res => res.status === 200 && res.text())
    .then(res => getResults())
    .catch(err => console.error('Request failed', err))
}

const getResults = () => {
  // Before fetch
  $root.classList.add('is-loading')
  $update.classList.add('is-rotate')
  $loader.classList.remove('hidden')

  fetch(`${BASE_URL}/result`, {
    method: 'POST',
  })
    .then(res => res.status === 200 && res.text())
    .then(res => showResults(res))
    .catch(err => console.error('Request failed', err))
}

const showResults = res => {
  $results.innerHTML = res // prerender
  const $rlines = Array.from(qsa('.js-results .rline'))

  const rates = $rlines.map(el => el.querySelector('.ocount').innerText)
  const max = Math.max(...rates)
  // console.log('Prc', (Math.min(...rates) / Math.max(...rates)) * 100);

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

/**
 * Offline plugin (ServiceWorker, AppCache) for webpack
 * https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md
 */
import './scripts/service-worker'