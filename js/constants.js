const STOCK_EXCHANGE_URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com`;
const companyInfoContainer = document.getElementById("companyInfoContainer");
const logoAndNameContainer = document.getElementById("logoAndNameContainer");
const companyName = document.getElementById("companyName");
const companyLogo = document.getElementById("companyLogo");
const priceAndPercentsContainer = document.getElementById(
  "priceAndPercentsContainer"
);
const stockPrice = document.getElementById("stockPrice");
const companyDescriptionContainer = document.getElementById(
  "companyDescriptionContainer"
);
const companyDescription = document.getElementById("companyDescription");
const chartContainer = document.getElementById("chartContainer");
const loader = document.getElementById("loader");
const marqueeLoader = document.getElementById("marqueeLoader");

function loaderOn() {
  loader.classList.remove("loader-display");
}

function loaderOff() {
  loader.classList.add("loader-display");
}

function marqueeLoaderOn() {
  marqueeLoader.classList.remove("marqueeLoader-display");
}

function marqueeLoaderOff() {
  marqueeLoader.classList.add("marqueeLoader-display");
}
