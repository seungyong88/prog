export default function ImageView({ $app, initialState, onClose }) {
  this.onClose = onClose

  // image url
  this.state = initialState
  this.$target = document.createElement('div')
  this.$target.className = 'Modal ImageView'

  $app.appendChild(this.$target)


  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    this.$target.innerHTML = `<div class="content">${this.state ? `<img src="${this.state}">` : ''}</div>`

    this.$target.style.display = this.state ? 'block' : 'none'
  }

  this.$target.addEventListener('click', (e) => {
    if (Array.from(e.target.classList).includes('ImageView')) {
      onClose()
    }
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  })
  this.render()
}