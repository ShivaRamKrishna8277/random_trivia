document.addEventListener("DOMContentLoaded", async function () {
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');

    try {
        // Fetch a random quiz question from the provided Open Trivia DB API URL
        const response = await fetch('https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple');
        const data = await response.json();

        // Ensure that the API returned a valid question
        if (!data.results || data.results.length === 0) {
            questionElement.innerHTML = "No question found. Please try again.";
            return;
        }

        const question = data.results[0];
        questionElement.innerHTML = question.question;

        // Create buttons for each option
        const answers = [...question.incorrect_answers, question.correct_answer];
        answers.sort(() => Math.random() - 0.5); // Shuffle answers

        answers.forEach(answer => {
            const optionButton = document.createElement('div');
            optionButton.classList.add('option');
            optionButton.innerText = answer;
            optionsElement.appendChild(optionButton);

            // Check if the answer is correct
            optionButton.addEventListener('click', () => {
                if (answer === question.correct_answer) {
                    alert("Correct!");
                } else {
                    alert("Wrong! The correct answer was: " + question.correct_answer);
                }
            });
        });
    } catch (error) {
        console.error("Error fetching the quiz data:", error);
        questionElement.innerHTML = "An error occurred. Please try again.";
    } finally {
        document.getElementById('questionLoader').style.display = "none";
    }
});
