window.onload = function () {
  const form = document.querySelector("#priceForm");
  const quantityInput = document.querySelector("#quantity");
  const totalPrice = document.querySelector("#totalPrice");
  const serviceInputs = document.querySelectorAll('input[name="service"]');
  const deadlineInputs = document.querySelectorAll('input[name="deadline"]');
  const extraInputs = document.querySelectorAll('input[name="extra"]');
  function calculatePrice() {
    const selectedService = document.querySelector('input[name="service"]:checked');
    const selectedDeadline = document.querySelector('input[name="deadline"]:checked');
    const servicePrice = Number(selectedService.value);
    const quantity = Math.max(1, Number(quantityInput.value));
    const deadlineMultiplier = Number(selectedDeadline.value);
    let extraPrice = 0;
    extraInputs.forEach(function (extra) {
      if (extra.checked) {
        extraPrice += Number(extra.value);
      }
    });
    const quantityPrice = servicePrice + (quantity - 1) * (servicePrice * 0.2);
    const priceBeforeDeadline = quantityPrice + extraPrice;
    const finalPrice = priceBeforeDeadline * deadlineMultiplier;
    totalPrice.textContent = `${finalPrice.toFixed(2)} zł`;
  }
  serviceInputs.forEach(function (input) {
    input.addEventListener("change", calculatePrice);
  });
  deadlineInputs.forEach(function (input) {
    input.addEventListener("change", calculatePrice);
  });
  extraInputs.forEach(function (input) {
    input.addEventListener("change", calculatePrice);
  });
  quantityInput.addEventListener("input", calculatePrice);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
  calculatePrice();
};
