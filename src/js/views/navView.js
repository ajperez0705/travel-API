import MasterView from "./masterView";

class NavView extends MasterView {
  _navBtns = document.querySelectorAll(".nav-btn");
  _parentEl = document.querySelector(".nav-bar");
  _contentContainers = document.querySelectorAll(".container");
  _targetData;
  _clickedData;

  renderNav(targetData, clickedData) {
    this._targetData = targetData;
    this._clickedData = clickedData;
    console.log(this._targetData, this._clickedData);
    this._settleNav(this._targetData, this._clickedData);
  }

  navHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".nav-btn");
      if (!btn) return;
      handler(btn);
    });
  }

  _settleNav(targetData, clickedData) {
    if (!targetData.classList.contains(".active-link")) {
      this._navBtns.forEach((btn) => {
        btn.classList.remove("active-link");

        this._contentContainers.forEach((container) => {
          if (container.classList.contains("active")) {
            container.classList.remove("active");
            container.classList.add("hidden");
          }
          if (container.id === clickedData) {
            container.classList.remove("hidden");
            container.classList.add("active");
          }
        });
        targetData.classList.add("active-link");
      });
    } else return;
  }
}
export default new NavView();
