class NavView {
  #navBtns = document.querySelectorAll(".nav-btn");
  #navContainer = document.querySelector(".nav-bar");
  #navLinks = document.querySelectorAll(".nav-link");
  #contentContainer = document.querySelector(".content-container");
  #targetData;
  #clickedData;

  render(targetData, clickedData) {
    this.#targetData = targetData;
    this.#clickedData = clickedData;
    console.log(this.#targetData, this.#clickedData);
    this.#settleNav(this.#targetData, this.#clickedData);
  }

  navHandler(handler) {
    ["click"].forEach((ev) => this.#navContainer.addEventListener(ev, handler));
  }

  #settleNav(targetData, clickedData) {
    if (!targetData.classList.contains(".active-link")) {
      this.#navBtns.forEach((btn) => {
        btn.classList.remove("active-link");

        // All containers have a hidden and active class, and only one container can have active at a time
        // Loop through all containers and if container has active, remove, and add hidden, else, return.
        this.#contentContainer.forEach((container) => {
          if (container.classList.contains("active")) {
            container.classList.remove("active");
            container.classList.add("hidden");
          }
          if (container.id === clickedData) {
            container.classList.remove("hidden");
            container.classList.add("active");
          }
          // Then, check if ids mathch, if they do, remove hidden, add active
        });
        targetData.classList.add("active-link");
      });
    } else return;
  }
}
export default new NavView();
