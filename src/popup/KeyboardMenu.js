class KeyboardMenu {
  constructor(config = {}) {
      this.options = []; // set by updater method
      this.up = null;
      this.down = null;
      this.prevFocus = null;
      this.descriptionContainer = config.descriptionContainer;
  }

  setOptions(options) {
      this.options = options;
      this.element.innerHTML = this.options.map((option, index) => {
          const disabledAttr = option.disabled ? "disabled" : "";
          return (`
              <div class="option">
                  <div class="menu-item" ${disabledAttr} data-div="${index}" data-description="${option.description}">
                      ${option.label}
                  </div>
                  <span class="right">${option.right ? option.right() : ""}</span>
              </div>
          `)
      }).join("");

      // Ensure we select all menu items correctly and add listeners
      this.element.querySelectorAll(".menu-item").forEach(div => {
          div.addEventListener("click", () => {
              const index = Number(div.dataset.div);
              const chosenOption = this.options[index];
              if (chosenOption && chosenOption.handler) {
                  chosenOption.handler();
              } else {
                  console.error('No handler found for option at index:', index);
              }
          });

          div.addEventListener("mouseenter", () => {
              div.focus();
          });

          div.addEventListener("focus", () => {
              this.prevFocus = div;
              this.descriptionElementText.innerText = div.dataset.description;
          });
      });

      // Focus the first enabled item on initialization
      setTimeout(() => {
          const firstEnabledItem = this.element.querySelector(".menu-item[data-div]:not([disabled])");
          if (firstEnabledItem) firstEnabledItem.focus();
      }, 10);
  }

  createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("KeyboardMenu");

      // Description box element
      this.descriptionElement = document.createElement("div");
      this.descriptionElement.classList.add("DescriptionBox");
      // this.descriptionElement.innerHTML = `<p>I will provide information!</p>`;
      // this.descriptionElementText = this.descriptionElement.querySelector("p");
  }

  end() {
      this.element.remove();
      this.descriptionElement.remove();
      this.up.unbind();
      this.down.unbind();
  }

  init(container) {
      this.createElement();
      (this.descriptionContainer || container).appendChild(this.descriptionElement);
      container.appendChild(this.element);

      this.up = new KeyPressListener("ArrowUp", () => {
          const current = Number(this.prevFocus.getAttribute("data-div"));
          const prevDiv = Array.from(this.element.querySelectorAll(".menu-item[data-div]")).reverse().find(el => {
              return el.dataset.div < current && !el.disabled;
          });
          prevDiv?.focus();
      });

      this.down = new KeyPressListener("ArrowDown", () => {
          const current = Number(this.prevFocus.getAttribute("data-div"));
          const nextDiv = Array.from(this.element.querySelectorAll(".menu-item[data-div]")).find(el => {
              return el.dataset.div > current && !el.disabled;
          });
          nextDiv?.focus();
      });
  }
}
