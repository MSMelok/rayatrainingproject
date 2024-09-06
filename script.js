// script.js

// Knowledge base with Arabic and English support
const knowledgeBase = [
    { question: "ما اسمك", answer: "اسمي باز بوت، مساعدك الافتراضي." },
    { question: "من هو محمد الباز", answer: "محمد الباز هو مدربك في موقع راية CX | الغردقة." },
    { question: "السلام عليكم", answer: "وعليكم السلام! كيف يمكنني مساعدتك؟" },
    { question: "hello", answer: "Hello! How can I assist you today?" },
    { question: "what is your name", answer: "My name is BazBot, your virtual assistant." }
];

// Function to get bot response
function getBotResponse(userInput) {
    userInput = userInput.trim().toLowerCase();
    for (let i = 0; i < knowledgeBase.length; i++) {
        if (userInput.includes(knowledgeBase[i].question)) {
            return knowledgeBase[i].answer;
        }
    }
    return "آسف، لم أفهم ذلك. هل يمكنك إعادة صياغة سؤالك؟"; // Default response for Arabic
}

// Ensure the chat sticks to the last message
function displayMessage(message, sender) {
    const chatOutput = document.getElementById('chat-output');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageElement.innerHTML = `<p>${message}</p><span class="timestamp">${time}</span>`;
    chatOutput.appendChild(messageElement);

    // Ensure the latest message is scrolled into view
    messageElement.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Event listener for sending message
document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === "") return;

    displayMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        displayMessage(botResponse, 'bot');
    }, 500);
});

// Send message on Enter key press
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('send-btn').click();
    }
});

// Toggle chatbot visibility
const chatbotToggleBtn = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot');

chatbotToggleBtn.addEventListener('click', () => {
    const isVisible = chatbotContainer.style.display === 'block';
    chatbotContainer.style.display = isVisible ? 'none' : 'block';
});
