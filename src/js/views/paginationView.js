class PaginationView {
  #parentEl = document.querySelector(".pagination");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup(data);
    // this._modalContainer.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup(data) {
    const numPages = data.results / data.resultsPerPage;
    console.log(numPages);
    //   Page 1 and other pages
    // Page 1 and NO other pages
    // Last Page
    // Other Page
  }
}

export default new PaginationView();
