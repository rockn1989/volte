const tabs = document.querySelectorAll(".tabs");

[...tabs].map((tab) => {
  const tabs = [...tab.querySelectorAll("li")];
  const tabsContent = tab.nextElementSibling;
  const tabsContentLi = [...tabsContent.querySelectorAll("li")];

  tab.addEventListener("click", (evt) => {
    if (evt.target.tagName === "A") {
      evt.preventDefault();
      let parentLi = evt.target.closest("li");
      let tabIdx = tabs.indexOf(parentLi);

      tabs.forEach((li) => li.classList.remove("active-tab"));
      parentLi.classList.add("active-tab");

      tabsContentLi.forEach((li) => li.classList.remove("active-tab"));
      tabsContentLi[tabIdx].classList.add("active-tab");
    }
  });
});
