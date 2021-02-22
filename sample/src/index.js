import App from './App.js'

new App({
  $app: document.querySelector('.app'),
  onError: (e) => {
    alert(e.message)
  }
})
