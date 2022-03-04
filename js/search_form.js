class SearchForm {
  constructor(inputBtnContainer) {
    this.inputBtnContainer = inputBtnContainer;
    this.searchInput;
    this.searchBtn;
    this.data;
    this.createForm();
  }

  createForm() {
    this.createInput();
    this.createBtn();
  }

  createInput() {
    const searchInput = document.createElement("input");
    searchInput.id = "searchInput";
    searchInput.type = "text";
    searchInput.placeholder = "Search";
    searchInput.classList.add("search-input");
    inputBtnContainer.appendChild(searchInput);
    this.searchInput = searchInput;
    searchInput.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchBtn").click();
      }
    });
  }

  createBtn() {
    const searchBtn = document.createElement("button");
    searchBtn.id = "searchBtn";
    searchBtn.type = "button";
    searchBtn.innerText = "Search";
    searchBtn.classList.add("search-btn");
    inputBtnContainer.appendChild(searchBtn);
    this.searchBtn = searchBtn;
    searchBtn.addEventListener("click", () => {
      this.runSearch();
    });
  }

  async companyResultsFetch() {
    const NASDAQ_API = `/api/v3/search?query=${this.searchInput.value}&limit=10&amp;exchange=NASDAQ`;
    try {
      const response = await fetch(STOCK_EXCHANGE_URL + NASDAQ_API);
      this.data = await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  onSearch(callback) {
    this.runSearch = async () => {
      await this.companyResultsFetch();
      callback(this.data);
    };
  }

  runSearch = () => {};
}
