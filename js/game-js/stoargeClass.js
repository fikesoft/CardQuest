class Save{
    constructor(){
        
    }
    //Saves the list that contains the data------------
    localStoreCardDetails(list){
        const serializedList = JSON.stringify(list);
        localStorage.setItem('qaList', serializedList);
    }

    //Getting the elements 
    getQuestionsAndAnswers() {
        const serializedList = localStorage.getItem('qaList');
        return serializedList ? JSON.parse(serializedList) : [];
    }

    //Adds the elements to the list with push
    addQuestionAnswer(question, answer) {
        
        // Retrieve the current list
        let qaList = this.getQuestionsAndAnswers();

        // Add the new question-answer pair directly as strings
        qaList.push({ question: question, answer: answer });

        // Save the updated list
        this.localStoreCardDetails(qaList);

        console.log("addQuestionAnswerMETHOD",qaList);
    }

    //Clears the stoarge-------------------------
    clearAll() {
        if(localStorage.length === 0){
            console.log("Your local stoarge is emty")
        }else{
            localStorage.removeItem('qaList');
        }    
    }
}

export default Save ;