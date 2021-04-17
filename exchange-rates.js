function getExchangeRates(event, baseCurrency = "BTC") {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  // console.log(event, currency);
  fetch(
    `http://api.coinbase.com/v2/exchange-rates?currency=${baseCurrency}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // render currency table
      renderCurrencyTable(result.data.rates, baseCurrency);
    })
    .catch((error) => console.log("error", error));
}

function renderCurrencyTable(rates, baseCurrency) {
  // get the tbody element
  const tbodyElement = document.getElementById("ratetable");
  tbodyElement.textContent = "";
  // list of currency
  const currencyList = ["BTC", "ETH", "LTC", "INR", "USD", "XLM", "BSV", "EUR"];

  for (let i = 0; i < currencyList.length; i++) {
    const currency = currencyList[i];
    // create a new table row element
    const tr = document.createElement("tr");
    tr.id = currency;
    // create currency column
    const currencyTd = document.createElement("td");
    currencyTd.textContent = `1 ${baseCurrency}`;
    // create rate column
    const rateTd = document.createElement("td");
    rateTd.textContent = `${rates[currency]} ${currency}`;
    tr.appendChild(currencyTd);
    tr.appendChild(rateTd);
    tbodyElement.appendChild(tr);
  }
}
