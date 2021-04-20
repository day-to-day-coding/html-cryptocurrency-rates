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
      // render cards
      renderCards(result.data.rates, baseCurrency);
      // render currency table
      renderCurrencyTable(result.data.rates, baseCurrency);
    })
    .catch((error) => console.log("error", error));
}

function renderCards(rates, baseCurrency) {
  document.getElementById(
    "usd"
  ).innerHTML = `1 ${baseCurrency} \t=\t &#36 ${rates["USD"]}`;

  document.getElementById(
    "inr"
  ).innerHTML = `1 ${baseCurrency} \t=\t &#x20B9 ${rates["INR"]}`;

  document.getElementById(
    "eur"
  ).innerHTML = `1 ${baseCurrency} \t=\t &#8364 ${rates["EUR"]}`;
}

function renderCurrencyTable(rates, baseCurrency) {
  // get the tbody element
  const tbodyElement = document.getElementById("ratetable");
  tbodyElement.textContent = "";

  for (let i = 0; i < Object.keys(rates).length; i++) {
    const currency = Object.keys(rates)[i];
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
