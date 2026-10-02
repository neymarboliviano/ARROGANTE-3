const BASE_URL = "https://open.er-api.com/v6/latest";

export async function exchangeRateApi(fromCurrency) {
  const response = await fetch(`${BASE_URL}/${fromCurrency}`);

  if (!response.ok) {
    throw new Error("Erro ao consultar a API de câmbio.");
  }

  const data = await response.json();

  if (data.result !== "success" || !data.rates) {
    throw new Error("A API não retornou as cotações.");
  }

  return data;
}

export async function fetchExchangeRate(fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return 1;
  }

  const data = await exchangeRateApi(fromCurrency);
  const rate = data.rates[toCurrency];

  if (typeof rate !== "number") {
    throw new Error("Moeda não encontrada.");
  }

  return rate;
}
