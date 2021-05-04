class DestinationModalView {
  #parentEl = document.querySelector(".content-container");
  #data;

  render(data) {
    this.#data = data;
    this.#generateModalDestination(this.#data);
  }

  addHandlerRender(handler) {}

  #generateModalDestination(data) {}
}

export default new DestinationModalView();
