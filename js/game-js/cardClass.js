import Save from "./stoargeClass.js";
class Card{
    constructor(){
        this.cards= [];
        this.actualCardNumber = 1;
        this.totalCardNumber = 1;
        
    }
    //This method deletes the elements--------------------------------
    deleteQuestionAnswer(textAreaQuestion,textAreaAnswer){
        if (textAreaQuestion instanceof HTMLTextAreaElement && textAreaAnswer instanceof HTMLTextAreaElement) {
            textAreaQuestion.value = '';
            textAreaAnswer.value = '';
        } else {
            console.error('Provided elements are not text areas');
        }
    }

    //This method activates the cursor--------------------------------
    toggleCursorState(textAreaQuestion, textAreaAnswer, activate = false) {
        textAreaQuestion.readOnly = !activate;
        textAreaAnswer.readOnly = !activate;
    
        // Choose the appropriate selector based on the activation state
        const questionSelector = activate ? '.text-area-question-link.active' : '.text-area-question-link';
        const answerSelector = activate ? '.text-area-answer-link.active' : '.text-area-answer-link';
    
        const questionLink = document.querySelector(questionSelector);
        const answerLink = document.querySelector(answerSelector);
    
        // Set cursor based on whether activation is true or false
        const cursorStyle = activate ? 'pointer' : 'not-allowed';
    
        if (questionLink) {
            questionLink.style.cursor = cursorStyle;
        }
    
        if (answerLink) {
            answerLink.style.cursor = cursorStyle;
        }
    }
    

    //This method updates the layout adding 3 more buttons and hiding create and upload--------
    updateLayoutButtons(reverse = false) {
        
        
        const container = document.querySelector('.container-button-game');
    
        const firstButton = container.querySelector('button:nth-child(1)');
        const secondButton = container.querySelector('button:nth-child(2)');
        const thirdButton = container.querySelector('button:nth-child(3)');
        const fourthButton = container.querySelector('button:nth-child(4)');
        const fifthButton = container.querySelector('button:nth-child(5)');
    
        if (reverse) {
            // Show the first and second buttons
            firstButton.style.display = "flex";
            secondButton.style.display = "flex";
    
            // Hide the third, fourth, and fifth buttons
            thirdButton.style.display = "none";
            fourthButton.style.display = "none";
            fifthButton.style.display = "none";
        } else {
            // Hide the first and second buttons
            firstButton.style.display = "none";
            secondButton.style.display = "none";
    
            // Show the third, fourth, and fifth buttons
            thirdButton.style.display = "flex";
            fourthButton.style.display = "flex";
            fifthButton.style.display = "flex";


            //Delete the elements from localStoarge if the player added smth 
            const save = new Save();
            save.clearAll();
        }
    }


    saveDetails(textAreaQuestion , textAreaAnswer,cardNumberContainer){
        //Save instace
        const save = new Save();

        //Getting the actual value
        var question = textAreaQuestion.value;
        var answer = textAreaAnswer.value;

        //Calling the method of the class Save
        save.addQuestionAnswer(question,answer);

        var serializedData = save.getQuestionsAndAnswers()

        var formattedContent = '';
        
        //Loop until no data in the stoarge
        serializedData.forEach((item, index) => {
            let question = item.question;
            let answer = item.answer;
            formattedContent += `Question ${index + 1}:\n${question}\n\nAnswer ${index + 1}:\n${answer}\n---\n\n`;
        });
        
        

        let name = 'CardQuest';
        var tempLink = document.createElement("a"); 
        var taBlob = new Blob([ formattedContent], {type: 'text/plain'});
        tempLink.setAttribute('href', URL.createObjectURL(taBlob));
        tempLink.setAttribute('download', `${name.toLowerCase()}.txt`);
        tempLink.click();
        
        URL.revokeObjectURL(tempLink.href);
        
        //Reverses the changes
        this.updateLayoutButtons(true);
        this.toggleCursorState(textAreaQuestion , textAreaAnswer,false);
        
        //Clearing the numbers
        this.toggleCardNumberDisplay(cardNumberContainer,"remove");   
        
        //Clearing the text area 
        this.deleteQuestionAnswer(textAreaQuestion , textAreaAnswer);
        //Clear
        save.clearAll();
    }

    addNewEmptyCard(question, answer,cardNumberContainer){
        //Instace saveClass
        const save = new Save();
        
        //Adding to the stoarge the values
        save.addQuestionAnswer(question.value, answer.value);
        
        //Clearing the textAreas
        this.deleteQuestionAnswer(question, answer);
        
        //Adding the cardNumberDispay
        this.toggleCardNumberDisplay(cardNumberContainer,"add");

        this.applyCardNumber(this.controlCardNumber());
    }


    //Activates and disactivates the display
    toggleCardNumberDisplay(cardNumberContainer, action) {
        if (action === 'add') {
            if (cardNumberContainer.classList.contains("inactive")) {
                cardNumberContainer.classList.remove("inactive");
                cardNumberContainer.classList.add("active");
            }
        } else if (action === 'remove') {
            if (cardNumberContainer.classList.contains("active")) {
                cardNumberContainer.classList.remove("active");
                cardNumberContainer.classList.add("inactive");
                this.actualCardNumber = 1;
                this.totalCardNumber = 1;   
            }
        }
    }
    
    //Controls the numeration
    controlCardNumber() {
        this.actualCardNumber++;
        this.totalCardNumber++;
        return {
            actualCardNumber: this.actualCardNumber,
            totalCardNumber: this.totalCardNumber
        };
    }

    //Displaying the card number-------------------------------------------------
    applyCardNumber(controlCardNumberSelection){
        const actualNumber= document.querySelector(".actual-number");
        const totalNumber = document.querySelector(".total-number");

        actualNumber.innerHTML = controlCardNumberSelection.actualCardNumber;
        totalNumber.innerHTML = controlCardNumberSelection.totalCardNumber;
    }
//------------------------------------------------------------------------------

//This method displays the arrows and hide it based on the display status -------------
    displayArrow( display = false ){
        const containerArrows = document.querySelector(".container-arrows")
        if(display){
            containerArrows.classList.remove("inactive")
            containerArrows.classList.add("active")
        }else{
                containerArrows.classList.remove("active")
                containerArrows.classList.add("inactive")
            
        }
    }
//------------------------------------------------------------------------------------------


    //Add input----------------------------------
    addInput(display = false){
        const input = document.getElementById('file-content');

        if(display){
            input.classList.remove("inactive")
            input.classList.add("active")
        }else{
         input.classList.remove("active")
         input.classList.add("inactive")   
        }

    }
    //--------------------------------------------------


    updateLayoutButtonsUpload(display=false){
        const container = document.querySelector('.container-button-game');
    
        const firstButton = container.querySelector('button:nth-child(1)');
        const secondButton = container.querySelector('button:nth-child(2)');

        if(display){
            firstButton.style.display = "flex";
            secondButton.style.display = "flex";
        }else{
            firstButton.style.display = "none";
            secondButton.style.display = "none";
        }
        this.displayArrow(true);
    }

    //Create new card while uploading
    createNewCard(question, answer){
        this.cards.push({question,answer})
    }

    displayCard(actualCardNumber, questionElementParam, answerElementParam) {
        if (actualCardNumber >= 1 && actualCardNumber <= this.cards.length) {
            const question = this.cards[actualCardNumber - 1].question;
            const answer = this.cards[actualCardNumber - 1].answer;
            console.log(question)
            console.log(answer + '  display card')
            questionElementParam.innerHTML = question;
            answerElementParam.innerHTML = answer;

            this.actualCardNumber = actualCardNumber;  // Update the actual card number
        }
    }

    // Method to go to the next card
    nextCard(questionElementParam, answerElementParam) {
        if (this.actualCardNumber < this.cards.length) {
            this.displayCard(this.actualCardNumber + 1, questionElementParam, answerElementParam);
        }
    }

    // Method to go to the previous card
    prevCard(questionElementParam, answerElementParam) {
        if (this.actualCardNumber > 1) {
            this.displayCard(this.actualCardNumber - 1, questionElementParam, answerElementParam);
        }
    }
    

}


export default Card;