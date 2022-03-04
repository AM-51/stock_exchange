class Marquee {
  constructor(marquee) {
    this.marquee = marquee;
    this.marqueeFetch();
  }

  async marqueeFetch() {
    const STOCK_PRICE_API = `/api/v3/stock/list`;
    marqueeLoaderOn();
    try {
      const response = await fetch(STOCK_EXCHANGE_URL + STOCK_PRICE_API);
      const data = await response.json();
      this.marqueeData(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      marqueeLoaderOff();
    }
  }

  marqueeData(data) {
    for (let i = 0; i < 1000; i++) {
      const newMarqueeElement = this.createMarqueeItem(data[i]);
      marquee.appendChild(newMarqueeElement);
    }
  }

  createMarqueeItem(marqueeElement) {
    const marqueeElementContainer = document.createElement("span");
    marqueeElementContainer.innerHTML = `<span><span class="marquee-symbol">${marqueeElement.symbol}</span><span class="marquee-price">$${marqueeElement.price}</span></span>`;
    return marqueeElementContainer;
  }
}
