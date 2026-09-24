window.onload = function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle.querySelector("span");
  const filterButtons = document.querySelectorAll(".filter-button");
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  const calculator = document.querySelector("#calculator");
  const calculatorResult = document.querySelector("#calculator-result");
  const contactForm = document.querySelector("#contact-form");
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.querySelector(".sr-only").textContent = isOpen
      ? "Zamknij menu"
      : "Otwórz menu";
  });
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector(".sr-only").textContent = "Otwórz menu";
    });
  });
  const savedTheme = localStorage.getItem("pixel-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.textContent = "☀";
  }
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");
    themeIcon.textContent = darkMode ? "☀" : "☾";
    localStorage.setItem("pixel-theme", darkMode ? "dark" : "light");
  });
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });
      button.classList.add("active");
      portfolioCards.forEach(function (card) {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
  function updateCalculator() {
    const selectedServices = calculator.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    let total = 0;
    selectedServices.forEach(function (service) {
      total += Number(service.value);
    });
    calculatorResult.textContent =
      "Szacunkowa cena: " +
      total.toLocaleString("pl-PL") +
      " zł";
  }
  calculator.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener("change", updateCalculator);
  });
  function showError(input, message) {
    const group = input.closest(".form-group");
    if (group) {
      group.classList.add("invalid");
    }
    const error = document.querySelector("#" + input.id + "-error");
    if (error) {
      error.textContent = message;
    }
  }
  function clearError(input) {
    const group = input.closest(".form-group");
    if (group) {
      group.classList.remove("invalid");
    }
    const error = document.querySelector("#" + input.id + "-error");
    if (error) {
      error.textContent = "";
    }
  }
  function validateForm() {
    let valid = true;
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const service = document.querySelector("#service");
    const message = document.querySelector("#message");
    const consent = document.querySelector("#consent");
    clearError(name);
    clearError(email);
    clearError(service);
    clearError(message);
    document.querySelector("#consent-error").textContent = "";
    if (name.value.trim().length < 3) {
      showError(name, "Podaj imię i nazwisko.");
      valid = false;
    }
    if (!email.validity.valid) {
      showError(email, "Podaj prawidłowy adres e-mail.");
      valid = false;
    }
    if (service.value === "") {
      showError(service, "Wybierz usługę.");
      valid = false;
    }
    if (message.value.trim().length < 10) {
      showError(message, "Wiadomość musi mieć minimum 10 znaków.");
      valid = false;
    }
    if (!consent.checked) {
      document.querySelector("#consent-error").textContent =
        "Zaznacz zgodę przed wysłaniem formularza.";
      valid = false;
    }
    return valid;
  }
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const status = document.querySelector("#form-status");
    status.className = "form-status";
    status.textContent = "";
    if (!validateForm()) {
      status.classList.add("error");
      status.textContent = "Popraw zaznaczone pola.";
      return;
    }
    status.classList.add("success");
    status.textContent =
      "Dziękujemy! Twoja wiadomość została przygotowana do wysłania.";

    contactForm.reset();
  });
  document.querySelectorAll("input, select, textarea").forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.id && input.checkValidity()) {
        clearError(input);
      }
    });
  });
};
