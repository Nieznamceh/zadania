window.onload = function () {
  const headline = document.querySelector("#headline");
  const description = document.querySelector("#description");
  const buttonText = document.querySelector("#buttonText");
  const backgroundColor = document.querySelector("#backgroundColor");
  const textColor = document.querySelector("#textColor");
  const bannerWidth = document.querySelector("#bannerWidth");
  const bannerHeight = document.querySelector("#bannerHeight");
  const previewBanner = document.querySelector("#banner");
  const previewHeadline = document.querySelector("#previewHeadline");
  const previewDescription = document.querySelector("#previewDescription");
  const previewButton = document.querySelector("#previewButton");
  const widthValue = document.querySelector("#widthValue");
  const heightValue = document.querySelector("#heightValue");
  function updateBanner() {
    previewHeadline.textContent = headline.value;
    previewDescription.textContent = description.value;
    previewButton.textContent = buttonText.value;
    previewBanner.style.backgroundColor = backgroundColor.value;
    previewBanner.style.color = textColor.value;
    previewBanner.style.width = bannerWidth.value + "px";
    previewBanner.style.height = bannerHeight.value + "px";
    previewButton.style.color = backgroundColor.value;
    widthValue.value = bannerWidth.value + " px";
    heightValue.value = bannerHeight.value + " px";
    widthValue.textContent = bannerWidth.value + " px";
    heightValue.textContent = bannerHeight.value + " px";
  }
  const inputs = document.querySelectorAll(
    "#bannerForm input, #bannerForm textarea"
  );
  inputs.forEach(function (input) {
    input.addEventListener("input", updateBanner);
  });
  updateBanner();
};
