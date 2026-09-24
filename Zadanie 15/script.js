window.onload = function () {
  const slider = document.querySelector("#reviewsSlider");
  const track = document.querySelector("#reviewsTrack");
  const slides = document.querySelectorAll(".review-card");
  const previousButton = document.querySelector("#previousButton");
  const nextButton = document.querySelector("#nextButton");
  const dotsContainer = document.querySelector("#sliderDots");
  let currentSlide = 0;
  let timer;
  slides.forEach(function (slide, index) {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");
    dot.setAttribute("type", "button");
    dot.setAttribute("aria-label", "Przejdź do opinii " + (index + 1));
    dot.addEventListener("click", function () {
      currentSlide = index;
      updateSlider();
      restartTimer();
    });
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll(".slider-dot");
  function updateSlider() {
    track.style.transform = "translateX(-" + currentSlide * 100 + "%)";
    dots.forEach(function (dot, index) {
      dot.classList.toggle("active", index === currentSlide);
    });
  }
  function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    updateSlider();
  }
  function previousSlide() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    updateSlider();
  }
  function startTimer() {
    timer = setInterval(nextSlide, 4000);
  }
  function stopTimer() {
    clearInterval(timer);
  }
  function restartTimer() {
    stopTimer();
    startTimer();
  }
  nextButton.addEventListener("click", function () {
    nextSlide();
    restartTimer();
  });
  previousButton.addEventListener("click", function () {
    previousSlide();
    restartTimer();
  });
  slider.addEventListener("mouseenter", function () {
    stopTimer();
  });
  slider.addEventListener("mouseleave", function () {
    startTimer();
  });
  updateSlider();
  startTimer();
};
