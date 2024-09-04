import Card from "./cardClass.js";
class ParseFile {
    constructor() {
        this.fileContent = '';
        this.card = new Card();  
    }

    getFile(callback) {
        const input = document.getElementById('file-content');
        const file = input.files[0];
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = function(e) {
                const fileContent = e.target.result;
                callback(fileContent); // Pass the content to the callback
            };
    
            reader.readAsText(file);
        } else {
            console.log('No file selected');
        }
    }
    
    renderInfo(textAreaQuestion, textAreaAnswer) {
        this.getFile((fileContent) => {
            console.log(fileContent); // Use the fileContent here
            
            // Split the file content by '---' to separate each question-answer block
            const blocks = fileContent.split('---');
            
            blocks.forEach(block => {
                // Trim the block to remove extra spaces or newlines
                const trimmedBlock = block.trim();
                
                if (trimmedBlock) {
                    // Extract the question and answer from the block
                    const questionMatch = trimmedBlock.match(/Question \d+:\s*(.*)/);
                    const answerMatch = trimmedBlock.match(/Answer \d+:\s*(.*)/);
                    
                    if (questionMatch && answerMatch) {
                        const question = questionMatch[1];
                        const answer = answerMatch[1];

                        this.card.createNewCard(question, answer);
                    }
                }
            });

            // After all cards are created,display the first card 
            this.card.displayCard(1, textAreaQuestion, textAreaAnswer);
        });
    }
}

export default ParseFile;