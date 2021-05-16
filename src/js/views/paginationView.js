class PaginationView {
  #parentEl = document.querySelector(".pagination");
  #data;

  _clear() {
    this.#parentEl.innerHTML = "";
  }

  addHandlerClick(handler) {
    this.#parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination-button");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  render(data) {
    this._clear();
    this.#data = data;
    const markup = this.#generateMarkup(data);
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup(data) {
    const curPage = data.page;
    const numPages = Math.ceil(data.results.length / data.resultsPerPage);
    //   Page 1 and other pages
    if (curPage === 1 && numPages > 1) {
      return `
      
      <button data-goto='${
        curPage + 1
      }' class="pagination-button btn-next" id="pagination">Page ${
        curPage + 1
      }</button>
  
    `;
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return `
      
      <button data-goto='${
        curPage - 1
      }' class="pagination-button btn-previous" id="pagination">Page ${
        curPage - 1
      }</button>
  
    `;
    }

    // Other Page
    if (curPage < numPages) {
      return `
      
      <button data-goto='${
        curPage - 1
      }' class="pagination-button btn-next" id="pagination">Page ${
        curPage - 1
      }</button>
      <button data-goto='${
        curPage + 1
      }' class="pagination-button btn-next" id="pagination">Page ${
        curPage + 1
      }</button>
  
    `;
    }

    // Page 1 and NO other pages
    return "";
  }
}

export default new PaginationView();
