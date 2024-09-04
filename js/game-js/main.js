// Import classes
import Game from './gameClass.js';
import Card from './cardClass.js';
import ParseFile from './parseFileClass.js'

// Cache DOM elements
const elements = {
    pageTitle: document.querySelector(".container-title"),
    containerTextQuestion: document.querySelector(".text-question-link"),
    containerTextAnswer: document.querySelector(".text-answer-link"),
    containerCardCounter: document.querySelector(".game-card-counter"),
    textAreaQuestion: document.querySelector(".text-area-question-link"),
    textAreaAnswer: document.querySelector(".text-area-answer-link"),
    inputFileContent : document.querySelector("#file-content"),
    buttonStart: document.querySelector("#button-start"),
    buttonCreate: document.querySelector("#button-create"),
    buttonUpload: document.querySelector("#button-upload"),
    buttonSave: document.querySelector("#button-save"),
    buttonCancel: document.querySelector("#button-cancel"),
    buttonAdd: document.querySelector("#button-add"),
    buttonNextCard : document.querySelector(".arrow-left"),
    buttonPrevCard : document.querySelector(".arrow-right"),
};

// Initialize classes
const game = new Game();
const card = new Card();
const parser = new ParseFile();

// Event listeners
elements.buttonStart.addEventListener("click", () => game.startGame());

elements.buttonCreate.addEventListener("click", () => {
    card.toggleCursorState(elements.textAreaQuestion, elements.textAreaAnswer, true);
    card.deleteQuestionAnswer(elements.textAreaQuestion, elements.textAreaAnswer);
    card.updateLayoutButtons();
    card.addInput(false);
});

elements.buttonAdd.addEventListener("click", () => {
    card.addNewEmptyCard(elements.textAreaQuestion, elements.textAreaAnswer, elements.containerCardCounter);
});

elements.buttonSave.addEventListener("click", () => {
    card.saveDetails(elements.textAreaQuestion, elements.textAreaAnswer, elements.containerCardCounter);
    card.addInput(true);
});

elements.buttonCancel.addEventListener("click", () => {
    card.deleteQuestionAnswer(elements.textAreaQuestion, elements.textAreaAnswer);
    card.toggleCursorState(elements.textAreaQuestion, elements.textAreaAnswer, false);
    card.updateLayoutButtons(true);
    card.toggleCardNumberDisplay(elements.containerCardCounter, "remove");
    card.addInput(true);
});

elements.buttonUpload.addEventListener("click", () => {
    parser.renderInfo(elements.textAreaQuestion, elements.textAreaAnswer);  // Now this sets up cards and displays the first one
    parser.card.updateLayoutButtonsUpload();  // Ensure this method exists in Card class
    parser.card.addInput(false);  // Ensure this method exists in Card class
    elements.pageTitle.innerHTML = "You can learn everything";
});

elements.buttonPrevCard.addEventListener("click", () => {
    parser.card.nextCard(elements.textAreaQuestion, elements.textAreaAnswer);
});

elements.buttonNextCard.addEventListener("click", () => {
    parser.card.prevCard(elements.textAreaQuestion, elements.textAreaAnswer);
});