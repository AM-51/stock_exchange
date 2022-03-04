class ShowResults {
  constructor(showResults) {
    this.showResults = showResults;
  }

  async logoAndPercentageFetch(element) {
    const COMPANY_PROFILE_API = `/api/v3/company/profile/${element.symbol}`;
    try {
      const response = await fetch(STOCK_EXCHANGE_URL + COMPANY_PROFILE_API);
      const data = await response.json();
      const company = data.profile;
      return company;
    } catch (error) {
      throw new Error(error);
    }
  }

  async renderResults(allData) {
    showResults.innerHTML = "";
    loaderOn();
    for (let i = 0; i < allData.length; i++) {
      await this.createLink(allData[i]);
    }
  }

  async createLink(element) {
    const company = await this.logoAndPercentageFetch(element);
    const fullLinkContainer = document.createElement("div");
    fullLinkContainer.classList.add("full-link-container");

    const leftSideContainer = document.createElement("div");
    leftSideContainer.classList.add("left-side-container");

    const rightSideContainer = document.createElement("div");
    rightSideContainer.classList.add("right-side-container");

    const companySmallLogo = document.createElement("img");
    companySmallLogo.src = `${company.image}`;
    companySmallLogo.classList.add("small-company-logo");
    companySmallLogo.onerror = function () {
      this.src = "./images/Error_Logo.png";
    };

    const companyNameAndSymbol = document.createElement("a");
    companyNameAndSymbol.href = `./html/company.html?symbol=${element.symbol}`;
    companyNameAndSymbol.classList.add("new-link");
    companyNameAndSymbol.innerHTML = `${element.name} ${element.symbol}`;

    const companyPercentageMinus = document.createElement("span");
    companyPercentageMinus.classList.add("percentage-minus");
    companyPercentageMinus.innerHTML = `(${parseFloat(
      company.changesPercentage
    ).toPrecision(2)}%)`;

    const companyPercentagePlus = document.createElement("span");
    companyPercentagePlus.classList.add("percentage-plus");
    companyPercentagePlus.innerHTML = `(+${parseFloat(
      company.changesPercentage
    ).toPrecision(2)}%)`;

    const compareBtn = document.createElement("button");
    compareBtn.innerText = "Compare";
    compareBtn.classList.add("compare-btn");

    try {
      if (company.changesPercentage < 0) {
        leftSideContainer.appendChild(companySmallLogo);
        leftSideContainer.appendChild(companyNameAndSymbol);
        rightSideContainer.appendChild(companyPercentageMinus);
        rightSideContainer.appendChild(compareBtn);
        fullLinkContainer.appendChild(leftSideContainer);
        fullLinkContainer.appendChild(rightSideContainer);
      } else {
        leftSideContainer.appendChild(companySmallLogo);
        leftSideContainer.appendChild(companyNameAndSymbol);
        rightSideContainer.appendChild(companyPercentagePlus);
        rightSideContainer.appendChild(compareBtn);
        fullLinkContainer.appendChild(leftSideContainer);
        fullLinkContainer.appendChild(rightSideContainer);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      showResults.append(fullLinkContainer);
      this.highlightText(searchInput.value, companyNameAndSymbol);
      loaderOff();
    }
  }

  highlightText(newInput, newName) {
    const regex = new RegExp(newInput, "gi");
    let text = newName.innerHTML;
    text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, "");
    const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
    newName.innerHTML = newText;
  }
}
