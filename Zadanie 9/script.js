window.onload = function() {
    const form = document.querySelector("form");
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const subject = document.querySelector("#subject");
    const message = document.querySelector("#message");
    const agreement = document.querySelector("#agreement");
    const result = document.querySelector("#result");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9]{9}$/;
      const phoneValue = phone.value.replace(/\s/g, "");
      if (name.value.trim() === "") {
        alert("Imię i nazwisko jest wymagane.");
        name.focus();
        return;
      }
      if (email.value.trim() === "") {
        alert("Adres e-mail jest wymagany.");
        email.focus();
        return;
      }
      if (!emailPattern.test(email.value.trim())) {
        alert("Podaj poprawny adres e-mail.");
        email.focus();
        return;
      }
      if (phone.value.trim() === "") {
        alert("Numer telefonu jest wymagany.");
        phone.focus();
        return;
      }
      if (!phonePattern.test(phoneValue)) {
        alert("Numer telefonu musi mieć dokładnie 9 cyfr.");
        phone.focus();
        return;
      }
      if (subject.value.trim() === "") {
        alert("Temat wiadomości jest wymagany.");
        subject.focus();
        return;
      }
      if (message.value.trim() === "") {
        alert("Treść wiadomości jest wymagana.");
        message.focus();
        return;
      }
      if (message.value.trim().length < 10) {
        alert("Wiadomość musi mieć co najmniej 10 znaków.");
        message.focus();
        return;
      }
      if (!agreement.checked) {
        alert("Musisz zaznaczyć zgodę na przetwarzanie danych.");
        agreement.focus();
        return;
      }
      result.textContent = "Formularz został wysłany pomyślnie, " + name.value + "!";
      result.style.color = "green";
      form.reset();
    });
};

