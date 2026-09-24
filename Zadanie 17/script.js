window.onload = function () {
  const searchForm = document.querySelector("#searchForm");
  const countryInput = document.querySelector("#countryInput");
  const results = document.querySelector("#results");
  const loading = document.querySelector("#loading");
  const errorMessage = document.querySelector("#errorMessage");
  const noResults = document.querySelector("#noResults");
  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const countryName = countryInput.value.trim().toLowerCase();
    results.innerHTML = "";
    errorMessage.hidden = true;
    noResults.hidden = true;
    if (countryName === "") {
      errorMessage.textContent = "Wpisz nazwę państwa.";
      errorMessage.hidden = false;
      return;
    }
    loading.hidden = false;
    try {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/capital'
      );
      if (!response.ok) {
        if (response.status === 404) {
          noResults.hidden = false;
          return;
        }
        throw new Error("Wystąpił problem z pobieraniem danych.");
      }
      const resultJson = await response.json();
      const countries = resultJson.data;
      const filteredCountries = countries.filter(function (item) {
        const countryField = (item.country || item.name || "").toLowerCase();
        return countryField.includes(countryName);
      });
      if (!filteredCountries.length) {
        noResults.hidden = false;
        return;
      }
      filteredCountries.forEach(function (item) {
        const card = document.createElement("article");
        card.classList.add("country-card");
        const title = document.createElement("h2");
        title.textContent = item.country || item.name;
        const capital = document.createElement("p");
        capital.textContent = `Stolica: ${item.capital || "Brak danych"}`;
        const currency = document.createElement("p");
        currency.textContent = `Waluta: ${item.currency || "Brak danych"}`;
        const population = document.createElement("p");
        population.textContent = `Liczba ludności: ${item.population || "Brak danych"}`;
        card.appendChild(title);
        card.appendChild(capital);
        card.appendChild(currency);
        card.appendChild(population);
        results.appendChild(card);
      });
    } catch (error) {
      errorMessage.textContent = "Nie udało się pobrać danych. Spróbuj ponownie.";
      errorMessage.hidden = false;
    } finally {
      loading.hidden = true;
    }
  });
};
