class NavView {
  _navBtns = document.querySelectorAll(".nav-btn");
  _navContainer = document.querySelector(".nav-bar");
  _contentContainers = document.querySelectorAll(".container");
  _targetData;
  _clickedData;

  render(targetData, clickedData) {
    this._targetData = targetData;
    this._clickedData = clickedData;
    console.log(this._targetData, this._clickedData);
    this._settleNav(this._targetData, this._clickedData);
  }

  // navHandlerClick(handler) {
  //   this._navBtns.forEach((btn) => {
  //     btn.addEventListener("click", function (e) {
  //       e.preventDefault();
  //       handler(e);
  //     });
  //   });
  // }

  navHandlerClick(handler) {
    this._navContainer.addEventListener("click", function (e) {
      let navData = [];
      const btn = e.target.closest(".nav-btn");
      const id = btn.id;
      if (!btn && !id) return;
      navData = [btn, id];
      console.log(navData);
      handler(navData);
    });
  }

  _settleNav(targetData, clickedData) {
    if (!targetData.classList.contains(".active-link")) {
      this._navBtns.forEach((btn) => {
        btn.classList.remove("active-link");

        // All containers have a hidden and active class, and only one container can have active at a time
        // Loop through all containers and if container has active, remove, and add hidden, else, return.
        this._contentContainers.forEach((container) => {
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
