window.onload = function() {
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach(function(question) {
    question.addEventListener("click", function() {
      const faqItem = question.parentElement;
      faqItem.classList.toggle("active");
    });
  });
}
