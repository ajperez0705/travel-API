class SaveDestinationView {
  #parentEl = document.querySelector(".content-container");
  //   #removeBtn = document.querySelector(".modal-container");
  _overlay = document.querySelector(".overlay");
  #data;

  addHandlerClick(handler) {
    this.#parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".save-search");
    });
  }

  toggleModal(modal, overlay) {}

  render(data) {
    this.#data = data;
    const markup = this.#generateModalMarkup(data);
    this._modalContainer.insertAdjacentHTML("afterbegin", markup);
  }

  #generateModalMarkup(data) {
    console.log(data.name);
    return `
        
        `;
  }
}

export default new SaveDestinationView();
