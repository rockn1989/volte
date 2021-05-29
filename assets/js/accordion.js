(() => {
  const accordion = document.querySelector(".accordion");

  accordion.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (
      evt.target.tagName === "A" &&
      evt.target.classList.contains("accordion__title")
    ) {
      let contentBlock = evt.target.nextElementSibling;

      evt.target.classList.toggle("active");
      contentBlock.classList.toggle("active");
    }
  });
})();
