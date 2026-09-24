window.onload = function() {
    const przyciski = document.querySelectorAll("button");

    przyciski.forEach(function(button) {
        button.addEventListener("click", function() {
            alert("Wybrano pakiet: " + this.parentElement.querySelector("h2").textContent);
        });
    });
};
