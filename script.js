// Fetch product data
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    initializeBot(data); // Pass product data to initialize the bot
  })
  .catch(error => console.error('Error loading products.json:', error));

// Initialize the bot
function initializeBot(products) {
  document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    if (userInput === "") return;

    // Display user message
    displayMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    // Check for product-related queries first
    const productResponse = searchProducts(userInput, products);
    if (productResponse !== 'Product not found') {
      displayMessage(productResponse, 'bot');
    } else {
      // Fallback to knowledgeBase if no product is found
      const botResponse = getBotResponse(userInput);
      displayMessage(botResponse, 'bot');
    }
  });
}

// Search products by name and return the description
function searchProducts(query, products) {
  query = query.toLowerCase(); // Make search case-insensitive
  const foundProduct = products.find(product => 
    product.name.toLowerCase().includes(query)
  );
  
  // Return only the description if the product is found
  return foundProduct ? foundProduct.description : 'Product not found';
}

// Bot's predefined knowledge base
const knowledgeBase = [
    { question: "السلام عليكم", answer: "وعليكم السلام! كيف يمكنني مساعدتك؟" },
    { question: "اسمك ايه", answer: "انا يسيدي اسمي باز بوت." },
    { question: "مواليد كام", answer: "لا انا مش مواليد سنة معينة, علشان المطور بتاعي اشتغل عليا شوية سنة 2021 و اشتغل عليا شوية كمان سنة 2024." },
    { question: "انت منين", answer: "انا!...... تصدق انا معرفش 😅, بس اعتبرني من مواليد الغردقة." },
    { question: "عندك كام سنة", answer: "4 سنين تقريباً... و اهي ماشية و كل من عليها فاااان يا عم 😂." },
    { question: "مين صنعك", answer: "دا واحد ابن حلال كدا اسمه محمد صلاح, تقدر تشوف صفحته علي Facebook اسم الصفحة Muhammad Meluk, و ابقي سلملي عليه بالله عليك." }
];

// Function to get bot response for general questions
function getBotResponse(userInput) {
  userInput = userInput.trim().toLowerCase();
  
  // Search for an exact or close match in the knowledge base
  for (let i = 0; i < knowledgeBase.length; i++) {
    const question = knowledgeBase[i].question.toLowerCase().trim();
    
    // Check for exact match or if the user's input contains the question
    if (userInput === question || userInput.includes(question)) {
      return knowledgeBase[i].answer;
    }
  }
  
  // Default response for unrecognized input
  return "آسف مفهمتش , ممكن تعيد صياغة السؤال؟";
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
