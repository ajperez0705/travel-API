class SaveView {
  _parentEl = document.querySelector(".saved-card-container");

  //   _generateMarkup() {
  //     console.log(this._data);
  //     return this._data.map(this._generateMarkupPreview).join("");
  //   }

  render(data) {
    console.log(data);
    const markup = this._generateMarkup(data);
  }

  _generateMarkup(data) {
    // const countryCode = window.location.hash.slice(1);
    console.log(data);

    data.forEach((country) => {
      let markup = `
    
      <div id=#${country.alphaCode} class="saved-card destination-btn"
        style="
        background-image: url(${country.flag});
        "
        ><a href="#${country.alphaCode}">
          <div class="saved-card-container ">
                <h6>${country.capital}</h6>
                <h3 class="country-name">${country.name}</h3>
           </div>
           </a>
          </div> 
          `;
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    });
  }
}

export default new SaveView();
