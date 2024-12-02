let username = '';
const questions = [
    {
        question: "Hey {name}, imagine you're scrolling through your feed and you see a link promising free pizza for a year! 🍕 What should you do?",
        choices: ["Click it immediately!", "Ignore it, sounds sus", "Share it with friends", "Report it"],
        answer: 1,
        source: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
    },
    {
        question: "{name}, you get an email from a 'Nigerian Prince' offering you a fortune. 💰 What's your move?",
        choices: ["Reply with your bank details", "Delete it", "Forward it to your friends", "Report it as spam"],
        answer: 3,
        source: "https://www.fbi.gov/scams-and-safety/common-scams-and-crimes/nigerian-letter-or-419-fraud"
    },
    {
        question: "Your friend {name} just posted a pic of their new credit card on Instagram. 😱 What advice do you give them?",
        choices: ["Looks cool!", "Delete it ASAP!", "Share it", "Like it"],
        answer: 1,
        source: "https://www.consumer.ftc.gov/articles/what-do-if-youre-billed-things-you-never-got-or-you-get-unordered-products"
    },
    {
        question: "You receive a DM from a stranger asking for your password to 'verify' your account. 🔐 What do you do?",
        choices: ["Give it to them", "Ignore it", "Block and report", "Ask why"],
        answer: 2,
        source: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
    },
    {
        question: "{name}, you find a USB stick in the parking lot. What do you do? 💾",
        choices: ["Plug it into your computer", "Throw it away", "Hand it to security", "Keep it for later"],
        answer: 2,
        source: "https://www.us-cert.gov/ncas/tips/ST18-003"
    },
    {
        question: "You notice a weird charge on your bank statement. What should {name} do? 💳",
        choices: ["Ignore it", "Call the bank", "Post about it on social media", "Ask friends for advice"],
        answer: 1,
        source: "https://www.consumer.ftc.gov/articles/what-do-if-youre-billed-things-you-never-got-or-you-get-unordered-products"
    },
    {
        question: "Your friend sends you a link to a 'free movie download' site. 🎬 What do you do?",
        choices: ["Download immediately", "Check for reviews", "Ignore it", "Report it"],
        answer: 2,
        source: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
    },
    {
        question: "{name}, you get a friend request from someone you don't know. What do you do? 🤔",
        choices: ["Accept it", "Ignore it", "Check mutual friends", "Block them"],
        answer: 2,
        source: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
    },
    {
        question: "You see a post claiming you can 'hack' your grades. What should {name} do? 📚",
        choices: ["Try it", "Report it", "Share it", "Ignore it"],
        answer: 1,
        source: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
    },
    {
        question: "Your phone asks for a software update. What should {name} do? 📱",
        choices: ["Ignore it", "Update it", "Ask friends", "Search online"],
        answer: 1,
        source: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    username = document.getElementById('username').value.trim();
    if (username) {
        document.getElementById('start-container').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        shuffle(questions);
        showQuestion();
    } else {
        alert("Please enter your name to start the quiz!");
    }
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML = `${currentQuestion.question.replace("{name}", username)} <br><small><a href="${currentQuestion.source}" target="_blank">Learn more</a></small>`;
    choicesElement.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => selectAnswer(index);
        choicesElement.appendChild(button);
    });

    updateProgressBar();
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function updateProgressBar() {
    const progressElement = document.getElementById('progress');
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = `${progressPercentage}%`;
}

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('score').textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('start-container').classList.remove('hidden');
}

function shareResult() {
    const shareText = `I scored ${score} out of ${questions.length} on the Cyber Laws Quiz! Can you beat my score? 🤓 #CyberLawsQuiz`;
    if (navigator.share) {
        navigator.share({
            title: 'Cyber Laws Quiz',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        alert("Sharing is not supported on this browser. Please copy and share manually.");
    }
}

function downloadResult() {
    const resultText = `Cyber Laws Quiz Result\n\nName: ${username}\nScore: ${score} / ${questions.length}`;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'CyberLawsQuizResult.txt';
    link.click();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-btn').classList.add('hidden');
});