async function stockPriceHistory() {
  const STOCK_PRICE_HISTORY_API = `/api/v3/historical-price-full/${symbol}?serietype=line`;
  try {
    const response = await fetch(STOCK_EXCHANGE_URL + STOCK_PRICE_HISTORY_API);
    const data = await response.json();
    chartPriceHistory(data);
  } catch (error) {
    chartContainer.innerHTML = "No chart to display";
    throw new Error(error);
  } finally {
    loaderOff();
  }
}

stockPriceHistory();

function chartPriceHistory(data) {
  const historyData = data.historicalStockList[0].historical;
  let dateArray = [];
  for (let i = 0; i <= 90; i++) {
    dateArray[i] = historyData[i].date;
  }
  const date = dateArray.reverse();
  let closedArray = [];
  for (let j = 0; j <= 90; j++) {
    closedArray[j] = historyData[j].close;
  }
  const chartData = {
    labels: date,
    datasets: [
      {
        label: "Stock Price History",
        backgroundColor: "#a0a0a0",
        borderColor: "#a0a0a0",
        data: closedArray.reverse(),
      },
    ],
  };
  const config = {
    type: "line",
    data: chartData,
    options: {},
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}
