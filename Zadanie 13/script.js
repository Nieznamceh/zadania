window.onload = function() {
    const button = document.querySelector("#themeButton");
    const body = document.querySelector("body");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark");
    }
    button.addEventListener("click", function() {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
};

