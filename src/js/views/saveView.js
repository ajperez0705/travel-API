class SaveView {
  _parentEl = document.querySelector(".saved-card-container");
  _container = document.querySelector(".saved-container");
  _errorMessage = "You currently have no saved Destinations!";

  //   _generateMarkup() {
  //     console.log(this._data);
  //     return this._data.map(this._generateMarkupPreview).join("");
  //   }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    const markup = this._generateMarkup(data);
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerClearSaves(handler) {
    this._container.addEventListener("click", function (e) {
      const btn = e.target.closest(".clear-saves");
      console.log(btn);
      if (!btn) return;

      handler();
    });
  }

  clear() {
    this._parentEl.innerHTML = "";
  }

  _generateMarkup(data) {
    // const countryCode = window.location.hash.slice(1);

    data.forEach((country) => {
      let markup = `
    
      <div id=#${country.alphaCode} class="saved-card destination-btn"
        style="
        background-image: url(${country.flag});
        "
        ><a href="#${country.alphaCode}">
          <div class="saved-card-content ">
                <h6>${country.capital}</h6>
                <h3 class="country-name">${country.name}</h3>
           </div>
           </a>
          </div> 
          `;
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
         <p>${message}</p>
       </div>
    `;
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new SaveView();
