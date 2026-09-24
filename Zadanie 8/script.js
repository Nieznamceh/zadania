window.onload = function() {
  const modal = document.querySelector("#modal");
  const closeButton = document.querySelector("#closeButton");
  const modalTitle = document.querySelector("#modalTitle");
  const modalDescription = document.querySelector("#modalDescription");
  const modalPrice = document.querySelector("#modalPrice");
  const infoButtons = document.querySelectorAll(".info-button");
  const services = {
    strony: {
      title: "Projektowanie stron",
      description: "Tworzymy responsywne strony internetowe dopasowane do potrzeb klienta.",
      price: "Cena od 1500 zł"
    },
    sklepy: {
      title: "Sklepy internetowe",
      description: "Projektujemy sklepy internetowe z intuicyjnym panelem zarządzania i systemem płatności.",
      price: "Cena od 3000 zł"
    },
    seo: {
      title: "Pozycjonowanie",
      description: "Optymalizujemy strony internetowe i pomagamy zwiększyć ich widoczność w wyszukiwarkach.",
      price: "Cena od 800 zł miesięcznie"
    }
  };
  function openModal(service) {
    modalTitle.textContent = services[service].title;
    modalDescription.textContent = services[service].description;
    modalPrice.textContent = services[service].price;
    modal.showModal();
  }
  function closeModal() {
    modal.close();
  }
  infoButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const service = button.dataset.service;
      openModal(service);
    });
  });
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal.open) {
      closeModal();
    }
  });
};
