window.onload = function () {
  const searchInput = document.querySelector("#search");
  const categorySelect = document.querySelector("#category");
  const portfolio = document.querySelector("#portfolio");
  const items = portfolio.querySelectorAll(".portfolio-item");
  const resultCount = document.querySelector("#result-count");
  const noResults = document.querySelector("#no-results");
  function filterPortfolio() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    let count = 0;
    items.forEach(function (item) {
      const name = item.dataset.name.toLowerCase();
      const category = item.dataset.category;
      const nameMatch = name.includes(searchText);
      const categoryMatch =
        selectedCategory === "all" ||
        category === selectedCategory;
      if (nameMatch && categoryMatch) {
        item.style.display = "";
        count++;
      } else {
        item.style.display = "none";
      }
    });
    resultCount.textContent = count;
    if (count === 0) {
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
  }
  searchInput.addEventListener("input", filterPortfolio);
  categorySelect.addEventListener("change", filterPortfolio);
  filterPortfolio();
};

