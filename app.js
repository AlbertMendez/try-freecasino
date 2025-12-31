const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll("[data-panel]");
const enterButtons = document.querySelectorAll("[data-enter-casino]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });

    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});

panels.forEach((panel) => {
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

const enterCasino = () => {
  document.body.classList.add("authenticated");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

enterButtons.forEach((button) => {
  button.addEventListener("click", enterCasino);
});
