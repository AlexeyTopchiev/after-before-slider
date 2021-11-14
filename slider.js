function getTemplate(state) {
  return `
      <div class="slider__before" style="width: ${state.width}px; background-image: url(${state.before})">
        <div class="slider__resize" data-type="resize"></div>
      </div>
      <div class="slider__after" style="background-image: url(${state.after})"></div>
  `
}

class Slider {
  constructor(selector, state) {
    this.$slider = document.getElementById(selector)
    this.state = {
      ...state,
      width: state.width || 512
    }
    this.render(this.state)
    this.listen()
  }

  render(state) {
    this.$slider.innerHTML = getTemplate(state)
  }

  update(props) {
    this.state = {
      ...this.state,
      ...props
    }
    this.render(this.state)
  }

  listen() {
    this.$slider.addEventListener("mousedown", this.mouseDownHandler)
    this.$slider.addEventListener("mouseup", this.mouseUpHandler)
  }

  mouseDownHandler = event => {
    if (event.target.dataset.type === "resize") {
      this.$slider.addEventListener("mousemove", this.moveHandler)
      this.currentClientX = event.clientX
    }
  }

  mouseUpHandler = () => {
    this.$slider.removeEventListener("mousemove", this.moveHandler)
  }

  moveHandler = event => {
    let newClientX = this.currentClientX - event.clientX
    this.update({ width: this.state.width - newClientX })
    this.currentClientX = event.clientX
  }
}

const slider = new Slider("slider", {
  before: "./assets/bruce.png",
  after: "./assets/batman.png"
})
