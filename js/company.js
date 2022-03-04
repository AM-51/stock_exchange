const urlParams = new URLSearchParams(window.location.search);

const companyInfo = urlParams.entries();
for (symbol of companyInfo) {
  console.log(symbol[1]);
}

async function companyProfile() {
  loaderOn();
  const COMPANY_PROFILE_API = `/api/v3/company/profile/${symbol}`;
  try {
    const response = await fetch(STOCK_EXCHANGE_URL + COMPANY_PROFILE_API);
    const data = await response.json();
    profileData(data);
    stockChanges(data);
  } catch (error) {
    throw new Error(error);
  }
}

companyProfile();

function profileData(data) {
  const profileData = data.companyProfiles[0].profile;

  companyName.innerHTML = `${profileData.companyName}`;
  companyName.href = `${profileData.website}`;
  companyLogo.src = `${profileData.image}`;
  companyLogo.onerror = function () {
    this.src = "../images/Error_Logo.png";
  };
  companyDescription.innerHTML = `${profileData.description}`;
  stockPrice.innerHTML = `$${profileData.price}`;
}

function stockChanges(data) {
  const percentage = document.getElementById("percentage");
  const percent = data.companyProfiles[0].profile.changesPercentage;
  priceAndPercentsContainer.appendChild(percentage);
  if (percent < 0) {
    percentage.innerHTML =
      "(" + parseFloat(`${percent}`).toPrecision(2) + "%" + ")";
    percentage.classList.add("percentage-minus");
  } else {
    percentage.innerHTML =
      "(" + "+" + parseFloat(`${percent}`).toPrecision(2) + "%" + ")";
    percentage.classList.add("percentage-plus");
  }
}
