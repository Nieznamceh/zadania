window.onload = function() {
    const result = document.getElementById("result");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const agreement = document.getElementById("agreement").checked;

        if (!agreement) {
            result.textContent = "Musisz wyrazić zgodę na przetwarzanie danych.";
            result.style.color = "red";
            return;
        }

        result.textContent = "Formularz został wysłany pomyślnie, " + name + "!";
        result.style.color = "green";

        form.reset();
    });
}
