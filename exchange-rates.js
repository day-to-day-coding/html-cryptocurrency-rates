function getExchangeRates(event, baseCurrency = "BTC", page = 1, rows = 10) {
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
      // renderPagination
      renderPagination(page);
      // render currency table
      renderCurrencyTable(result.data.rates, baseCurrency, page, rows);
    })
    .catch((error) => console.log("error", error));
}

function renderCurrencyTable(rates, baseCurrency, page, rows) {
  // get the tbody element
  const tbodyElement = document.getElementById("ratetable");
  tbodyElement.textContent = "";

  for (let i = (page - 1) * rows; i < page * rows; i++) {
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

function renderPagination(currentPage = 1, nextPage = 1) {
  const uiElement = document.getElementById("rate-pagination");
  uiElement.textContent = "";
  const leftLiElement = document.createElement("li");
  leftLiElement.id = "left-page";
  leftLiElement.className = "disabled";
  const leftLiAnchorElement = document.createElement("a");
  leftLiAnchorElement.onclick = `getExchangeRates("BTC", 1,5)`;
  const leftLiIconElement = document.createElement("i");
  leftLiIconElement.className = "material-icons";
  leftLiIconElement.textContent = "chevron_left";

  leftLiAnchorElement.appendChild(leftLiIconElement);
  leftLiElement.appendChild(leftLiAnchorElement);
  uiElement.appendChild(leftLiElement);
}
