class PauseMenu {
    constructor({onComplete}) {
        this.onComplete = onComplete;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("PauseMenu");
        this.element.innerHTML = (`
            <h2>Pause Menu</h2>
        `)
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `../../styles/pause.css`;
        document.head.appendChild(link);
    }

    getOptions(pageKey) {
        if (pageKey === "root") {
            return [
                {
                    label: "Save",
                    description: "Save your progress",
                    handler: () => {
                        //...
                    }
                },
                {
                    label: "Main Menu",
                    description: "Go to the main menu",
                    handler: () => {
                        this.close();
                        window.location.href = "../main.html"; // nav to main
                    }
                }
            ];
        }
        return [];
    }

    close() {
        this.esc?.unbind();
        this.keyboardMenu.end();
        this.element.remove();
        this.onComplete();
    }

    async init(container) {
        this.createElement();
        this.keyboardMenu = new KeyboardMenu({
            descriptionContainer: container
        })

        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setOptions(this.getOptions("root"));

        container.appendChild(this.element);

        utils.wait(200);
        this.esc = new KeyPressListener("Escape", () => {
            this.close();
        })
    }
}