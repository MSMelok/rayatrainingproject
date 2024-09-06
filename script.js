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

// Search products
function searchProducts(query, products) {
  query = query.toLowerCase(); // Make search case-insensitive
  const foundProduct = products.find(product => 
    product.name.toLowerCase().includes(query) || 
    product.description.toLowerCase().includes(query)
  );
  
  return foundProduct ? formatProductResponse(foundProduct) : 'Product not found';
}

// Format the product information to display it nicely
function formatProductResponse(product) {
  return `
    <strong>_Product_<br></strong> ${product.name}<br>
    <strong>_Description_<br></strong> ${product.description}
  `;
}

// Bot's predefined knowledge base
const knowledgeBase = [
    { question: "السلام عليكم", answer: "وعليكم السلام! كيف يمكنني مساعدتك؟" },
    { question: "اسمك ايه؟", answer: "انا يسيدي اسمي باز بوت." },
    { question: "مواليد كام؟", answer: "لا انا مش مواليد سنة معينة, علشان المطور بتاعي اشتغل عليا شوية سنة 2021 و اشتغل عليا شوية كمان سنة 2024." },
    { question: "انت منين؟", answer: "انا!...... تصدق انا معرفش 😅, بس اعتبرني من مواليد الغردقة." },
    { question: "عندك كام سنة؟", answer: "4 سنين تقريباً... و اهي ماشية و كل من عليها فاااان يا عم 😂." },
    { question: "مين صنعك؟", answer: "دا واحد ابن حلال كدا اسمه محمد صلاح, تقدر تشوف صفحته علي Facebook اسم الصفحة Muhammad Meluk, و ابقي سلملي عليه بالله عليك." }
];

// Function to get bot response for general questions
function getBotResponse(userInput) {
  userInput = userInput.trim().toLowerCase();
  for (let i = 0; i < knowledgeBase.length; i++) {
    if (userInput.includes(knowledgeBase[i].question)) {
      return knowledgeBase[i].answer;
    }
  }
  return "آسف مفهمتش , ممكن تعيد صياغة السؤال؟"; // Default response for Arabic
}

// Ensure the chat sticks to the last message and sets LTR for bot messages
function displayMessage(message, sender) {
  const chatOutput = document.getElementById('chat-output');
  const messageElement = document.createElement('div');
  
  // Assign classes based on the sender
  messageElement.classList.add('message', `${sender}-message`);
  
  // Check if the message is from the bot to apply LTR
  if (sender === 'bot') {
    messageElement.style.direction = 'ltr'; // Apply LTR direction to bot messages
  }
  
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
