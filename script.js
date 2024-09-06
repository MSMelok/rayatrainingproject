// Load product data
let products = [];
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
  })
  .catch(error => console.error('Error loading products.json:', error));

// Knowledge base with Arabic and English support
const knowledgeBase = [
    { question: "السلام عليكم", answer: "وعليكم السلام! كيف يمكنني مساعدتك؟" },
    { question: "اسمك ايه؟", answer: "انا يسيدي اسمي باز بوت." },
    { question: "مواليد كام؟", answer: "لا انا مش مواليد سنة معينة, علشان المطور بتاعي اشتغل عليا شوية سنة 2021 و اشتغل عليا شوية كمان سنة 2024." },
    { question: "انت منين؟", answer: "انا!...... تصدق انا معرفش 😅, بس اعتبرني من مواليد الغردقة." },
    { question: "عندك كام سنة؟", answer: "4 سنين تقريباً... و اهي ماشية و كل من عليها فاااان يا عم 😂." },
    { question: "مين صنعك؟", answer: "دا واحد ابن حلال كدا اسمه محمد صلاح, تقدر تشوف صفحته علي Facebook اسم الصفحة Muhammad Meluk, و ابقي سلملي عليه بالله عليك." },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
];

// Function to get bot response
function getBotResponse(userInput) {
    userInput = userInput.trim().toLowerCase();

    // Check if the input matches a product query
    const productResponse = searchProducts(userInput, products);
    if (productResponse) {
        return productResponse;
    }

    // Otherwise, check the knowledge base
    for (let i = 0; i < knowledgeBase.length; i++) {
        if (userInput.includes(knowledgeBase[i].question)) {
            return knowledgeBase[i].answer;
        }
    }
    return "آسف مفهمتش , ممكن تعيد صياغة السؤال؟"; // Default response for Arabic
}

// Search products function
function searchProducts(query, products) {
    const product = products.find(product => product.description.includes(query));
    return product ? formatDescription(product.description) : null;
}

// Function to format description
function formatDescription(description) {
    return description.replace(/\n/g, '<br>');
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
