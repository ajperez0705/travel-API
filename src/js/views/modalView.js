// import * as config from "../config.js";

import { modalContainer } from "../config";

class ModalView {
  #parentEl = document.querySelector(".content-container");
  _modalContainer = document.querySelector(".modal-container");
  _overlay = document.querySelector(".overlay");
  #data;

  modalHandlerClick(handler) {
    /***********Click on card and activate modal + render country details************/
    // Gain access to the parent class (content-container) and add an event listener that checks for e === destination-btn
    this.#parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const destinationBtn = e.target;

      // If e === destination-btn, then toggle hidden class in modal container
      if (destinationBtn.classList.contains("destination-btn")) {
        console.log(destinationBtn.id);
        window.location.hash = destinationBtn.id;

        // If escape is pressed while the container DOES NOT have the hidden class, then toggle class and set html and hash to empty
        // this.#exitModal();

        // Render the country details dependind on the hash alpha code
        handler();
      }
    });
  }

  _toggleModal(modal, overlay) {
    // Control the modal
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  exitModal() {
    this.#parentEl.addEventListener("keydown", function (e) {
      e.preventDefault();
      console.log("clicked");
      if (
        e.key === "Escape" &&
        !this._modalContainer.classList.contains("hidden")
      ) {
        exitModalTwo();
      }
    });
  }

  exitModalTwo() {
    this._modalContainer.classList.add("hidden");
    this._overlay.classList.add("hidden");
    window.location.hash = "";
    this._modalContainer.innerHTML = "";
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateModalMarkup(data);
    this._modalContainer.insertAdjacentHTML("afterbegin", markup);
  }

  #generateModalMarkup(data) {
    return `
      <div class="hero-image" style="background-image: url(${data.flag});">
            
          <div class="save-search-btn-container">
            <span class="save-search"><i  id = heart class="far fa-heart" aria-hidden="true" ></i></a>
          </div>
          <div class="modal-title">
            <h6 class="capital">${data.capital}</h6>
            <h3 class="country-name">${data.name}</h3>
          </div>
        </div>
        <div class="modal-grid">
            <div class="modal-card" id="language">
              <h5 class="modal-card-title">Language</h5>
              <p class="modal-card-content">${data.language}</p>
            </div>
            <div class="modal-card" id="capital">
              <h5 class="modal-card-title">Capital</h5>
              <p class="modal-card-content">${data.capital}</p>
            </div>
            <div class="modal-card" id="bio">
              <h5 class="modal-card-title">Bio</h5>
              <p class="modal-card-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam unde id ipsum vel officiis soluta, impedit, illo, repellendus maxime dicta repudiandae? Ea omnis optio quae sed fugiat pariatur quia sunt.</p>
            </div>
            <div class="modal-card" id="population">
              <h5 class="modal-card-title">Population</h5>
              <p class="modal-card-content">${data.population}</p>
            </div>
            <div class="modal-card" id="Currency">
              <h5 class="modal-card-title">Currency</h5>
              <p class="modal-card-content">${data.currency}</p>
           </div>
          <div class="btn-container">
              <button class="modal-btn" id="cancel-btn"><a href="#"></a>Cancel</button>
              <button class="modal-btn" id="book-btn"><a href="#"></a>Book</button>
          </div>
        </div>
      `;
  }
}

export default new ModalView();
