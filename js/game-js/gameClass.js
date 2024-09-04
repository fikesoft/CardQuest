import Card from "./cardClass.js";
class Game {
    constructor() {
        this.selectors = {
            h1ClassTitle: "h1.container-title",
            buttonStart: "button.button-start",
            buttonsGame: "div.container-button-game",
            textAreaQuestion: "textarea.text-area-question-link",
            textAreaAnswer: "textarea.text-area-answer-link",
            textQuestion: "p.text-question-link",
            textAnswer: "p.text-answer-link"
        };
    }

    // Getters
    getElement(selector) {
        return document.querySelector(this.selectors[selector]);
    }

    get h1() {
        return this.getElement('h1ClassTitle');
    }

    get buttonStart() {
        return this.getElement('buttonStart');
    }

    get buttonsGame() {
        return this.getElement('buttonsGame');
    }

    get textAreaQuestion() {
        return this.getElement('textAreaQuestion');
    }

    get textAreaAnswer() {
        return this.getElement('textAreaAnswer');
    }

    get textQuestion() {
        return this.getElement('textQuestion');
    }

    get textAnswer() {
        return this.getElement('textAnswer');
    }

    // Methods
    updateTextArea() {
        const textAreaQuestion = this.textAreaQuestion;
        const textAreaAnswer = this.textAreaAnswer;
        const textQuestion = this.textQuestion;
        const textAnswer = this.textAnswer;

        textQuestion.classList.add("inactive");
        textAnswer.classList.add("inactive");

        textAreaQuestion.classList.add("active");
        textAreaAnswer.classList.add("active");
        textAreaQuestion.readOnly = true;
        textAreaAnswer.readOnly = true;
    }

    updateButtonLayout() {
        const buttonStart = this.buttonStart;
        const buttonsGame = this.buttonsGame;

        if (buttonStart.classList.contains("active")) {
            buttonStart.classList.remove("active");
            buttonStart.classList.add("inactive");

            if (buttonsGame.classList.contains("inactive")) {
                buttonsGame.classList.remove("inactive");
            }
        }
    }

    // Start the game
    startGame() {
        const card = new Card();
        const h1ClassTitle = this.h1;
        this.updateTextArea();
        this.updateButtonLayout();
        card.addInput(true);

        h1ClassTitle.innerHTML = 'Create your mind';
    }
}

export default Game;
