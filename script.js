// script.js

// Knowledge base with Arabic and English support
const prompts = [
    ["a small", "my box"], //1
    ["b small", "personal feast"], //2
    ["c small", "my box extra"], //3
    ["d small", "summer solo meal"], //4
    ["a med", "couple feast"], //5
    ["b med", "medium feast"], //6
    ["a two med", "triple treat box"], //7
    ["b two med", "friends feast"], //8
    ["c two med", "medium double feast"], //9
    ["d two med", "big box"], //10
    ["e two med", "double summer meal"], //11
    ["a three med", "party box"], //12
    ["b three med", "triple deal"], //13
    ["a six med", "gathering meal"], //14
    ["a large", "varity feast"], //15
    ["a two large", "super triple treat box"], //16
    ["b two large", "large double feast"], //17
    ["lemo", "limo", "super limo", "super lemo"], //18
    ["bogo small", "bogo s"], //19
    ["bogo med", "bogo m"], //20
    ["bogo large", "bogo l"], //21
    ["sup sup", "super supreme"], //22
    ["class pep", "classic pepperoni"], //23
    ["hot s beef", "hot stuff beef"], //24
    ["chk sup", "chicken supreme"], //25
    ["chk chk", "cheeky chicken"], //26
    ["hot s chk", "hot stuff chicken"], //27
    ["sp chk rench", "spicy chicken ranch"], //28
    ["tabasco", "tobasco"], //29
    ["go pep chk", "chicken ghost pepper", "ghost pepper chicken"], //30
    ["v v", "very veggie"], //31
    ["go pep v", "viggie ghost pepper", "ghost pepper viggie"], //32
    ["marg", "margarita"], //33
    ["trop", "tropical hawaiian", "tropical", "hawaiian"], //34
    ["ch pizza", "cheese pizza", "ch p"], //35
    ["pep pizza", "pepperoni pizza", "p p"], //36
    ["chk tenders", "chicken tenderloins", "chk kids"], //37
    ["hut", "reward", "hut reward"], //38
];

const replies = [
    // Personal meals and small pizza offers
    [
        "ماي بوكس \n\
        ***************************************\n\
        بيتزا مستطيلة مقسمة الي 6 قطع (سميكة او سان فرانسيسكو) 🍕 \n\
        مع امكانية اختيار مقبلين من اصل 6 مقبلات 🍟🧀🍪🍗 \n\
        "
    ], //1

    [
        "الوجبة الشخصية 👨‍🍳 \n\
        ***************************************\n\
        بيتزا حجم صغير 🍕 \n\
        بطاط ويدجيز صغير 🍟 \n\
        مشروب 🍺 \n\
        "
    ], //2

    [
        "ماي بوكس اكسترا \n\
        ***************************************\n\
        نفس عرض ماي بوكس مكرر 4 مرات بسعر اقل (توفير 800 فلس)"
    ], //3

    [
        "سولو سمر مييل \n\
        🚨🚨🚨 في حالة سؤال العميل فقط 🚨🚨🚨 \n\
        ***************************************\n\
        بيتزا حجم صغير 🍕 \n\
        بطاط ويدجيز صغير 🍟 \n\
        ايس كريم ماجنم ميني كب 🧁 "
    ], //4

    // Medium pizza offers
    [
        "الكابل فيست 💑 \n\
        ***************************************\n\
        بيتزا وسط 🍕 \n\
        سلطة حجم صغير 🥗 \n\
        اربع قطع خبز بالثوم 🍞🍞🍞🍞 \n\
        اتنين مشروب 🍺🍺 "
    ], //5

    [
        "الميديم فيست 🍽 \n\
        ***************************************\n\
        بيتزا وسط 🍕 \n\
        بطاط حجم صغير 🍟 \n\
        عدد 4 قطع جوانح وينج ستريت بدون عضم 🍗 "
    ], //6

    // 2 Medium pizzas offers
    [
        "التريبل تريت بوكس \n\
        ***************************************\n\
        عدد 2 بيتزا وسط 🍕 \n\
        عدد 2 صوص جانبي 🍛 \n\
        بطاط ويدجيز حجم صغير 🍟\n\
        حلوي الدبل هيرشيز كوكيز 🍪 \n\
        عدد 8 قطع جوانح وينج ستريت بدون عظم 🍗 \n\
        عدد 5 مشروب 🍺🍺 "
    ], //7

    [
        "وجبة الاصدقاء \n\
        ***************************************\n\
        عدد 2 بيتزا وسط 🍕 \n\
        بطاط ويدجيز حجم صغير 🍟\n\
        عدد 4 قطع جوانح وينج ستريت بدون عظم 🍗"
    ], //8

    [
        "الميديم دبل فيست \n\
        ***************************************\n\
        عدد 2 بيتزا وسط بدون مقبلات 🍕 "
    ], //9

    [
        "البيج بوكس \n\
        🚨🚨🚨 في حالة سؤال العميل فقط 🚨🚨🚨 \n\
        ***************************************\n\
        عدد 2 بيتزا وسط واحدة منهم بتكون العجينة الجديدة اطراف الكباب او اطراف الجبنة بزبدة بالثوم 🍕\n\
        بطاط ويدجيز حجم صغير 🍟 \n\
        عدد 3 قطع خبز بالثوم مع جبنة 🍞 \n\
        عدد 6 قطع دجاج وينج ستريت بدون عظم 🍗 \n\
        صوص جانبي 🍛 \n\
        و ممكن ال2 بيتزا يكونوا العجينة الجديدة بزيادة 600 فلس بس"
    ], //10

    [
        "الدبل سمر مييل\n\
        🚨🚨🚨 في حالة سؤال العميل فقط 🚨🚨🚨 \n\
        ***************************************\n\
        عدد 2 بيتزا وسط 🍕 \n\
        ايس كريم ماجنم ميني ستيكس 🧁"
    ], //11

    // 3 Medium pizzas offers
    [
        "البارتي بوكس \n\
        ***************************************\n\
        عدد 3 بيتزا وسط 🍕 \n\
        بطاط ويدجيز حجم كبير 🍟\n\
        عدد 6 قطع خبز بالثوم 🍗\n\
        مشروب بيبسي عائلي 🍺"
    ], //12

    [
        "التريبل دييل \n\
        🚨🚨🚨 في حالة سؤال العميل عن 3 بيتزا وسط بدون مقبلات 🚨🚨🚨 \n\
        ***************************************\n\
        عدد 3 بيتزا وسط بدون مقبلات 🍕"
    ], //13

    // 6 Pizzas offers
    [
        "وجبة اللمة\n\
        🚨🚨🚨 في حالة سؤال العميل و متاح فقط توصيل 🚨🚨🚨 \n\
        🚨🚨🚨 غير متاح التعديل علي حجم البيتزا او نوعها او نوع العجينة 🚨🚨🚨 \n\
        ***************************************\n\
        عدد 6 بيتزا وسط كلهم لحم او 2 لحم و 2 دجاج و 2 جبنة و خضار 🍕\n\
        اللحم كالاتي:\n\
        عدد 2 بيتزا سان فرانسيسكو واحدة كلاسيك بيبروني و التانية سبايسي تشيكن رانش \n\
        عدد 2 بان واحدة سوبر سوبريم و التانية كلاسيك بيبروني \n\
        عدد 2 اطراف جبن واحدة سوبر سوبريم و التانية جريلد تشيكي تشيكن \n\
        و الدجاج كالاتي: \n\
        عدد 2 سان فرانسيسكو واحدة مارجريتا و التانية سبايسي تشيكن رانش \n\
        عدد 2 بان واحدة الخضار فقط (Very Veggie) و التانية كلاسيك بيبروني \n\
        عدد 2 اطراف جبن واحدة سوبر سوبريم و التانية جريلد تشيكي تشيكن "
    ], //14

    [
        "الفارايتي فيست \n\
        ***************************************\n\
        بيتزا حجم كبير 🍕\n\
        تريو بلاتر بداخله :\n\
        عدد 6 قطع دجاج وينج ستريت بدون عضم 🍗\n\
        عدد 4 قطع خبز بالثوم 🍞\n\
        بطاط ويدجيز حجم صغير 🍟\n\
        و 4 مشروبات 🍺🍺🍺🍺 "
    ], //15

    [
        "سوبر تريبل تريت بوكس \n\
        ***************************************\n\
        عدد 2 بيتزا حجم كبير 🍕 \n\
        عدد 2 صوص جانبي 🍛 \n\
        بطاط ويدجيز حجم كبير 🍟\n\
        عدد 6 قطع جوانح وينج ستريت بدون عظم 🍗 \n\
        حلوي الدبل هيرشيز كوكيز 🍪 \n\
        عدد 8 مشروب 🍺🍺🍺🍺🍺🍺🍺🍺 "
    ], //16

    [
        "اللاجيه دبل فيست \n\
        ***************************************\n\
        عدد 2 بيتزا حجم كبير 🍕 \n\
        عدد 2 صوص جانبي 🍛 \n\
        بطاط ويدجيز حجم كبير 🍟\n\
        عدد 4 قطع خبز بالثوم 🍞 \n\
        عدد 8 قطع جوانح وينج ستريت بدون عظم 🍗"
    ], //17

    // Special pizzas
    [
        "سوبر ليمو 🍕\n\
        ***************************************\n\
        بيتزا بالحجم الكبير بجناب محشوة بالحشوة الخاصة بها 👑"
    ], //18

    [
        "بوغو سمال \n\
        ***************************************\n\
        بيتزا حجم صغير 🍕"
    ], //19

    [
        "بوغو ميد \n\
        ***************************************\n\
        بيتزا حجم متوسط 🍕"
    ], //20

    [
        "بوغو لارج \n\
        ***************************************\n\
        بيتزا حجم كبير 🍕"
    ], //21

    [
        "سوبر سوبريم \n\
        ***************************************\n\
        بيتزا سوبريم بالكبير 🍕"
    ], //22

    [
        "كلاسيك بيبروني 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير بحشوة بيبروني الخاصة 🍕"
    ], //23

    [
        "هوت ستاف بيف 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير بحشوة حارة تحتوي علي اللحم البقري 🍕"
    ], //24

    [
        "تشيكن سوبريم 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير بحشوة دجاج معجب 🍕"
    ], //25

    [
        "شيكي تشيكن 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي الدجاج 🍕"
    ], //26

    [
        "هوت ستاف تشيكن 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير بحشوة دجاج حارة 🍕"
    ], //27

    [
        "سبايسي تشيكن رانش 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي دجاج حار 🍕"
    ], //28

    [
        "تاباسكو 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي توابل تاباسكو 🍕"
    ], //29

    [
        "جوست بيبر تشيكن 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي دجاج حار مع توابل شبح الفلفل 🍕"
    ], //30

    [
        "فيري فيجي 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي الخضروات فقط 🍕"
    ], //31

    [
        "جوست بيبر فيجي 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي الخضروات فقط مع توابل شبح الفلفل 🍕"
    ], //32

    [
        "مارغريتا 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي الجبنة فقط 🍕"
    ], //33

    [
        "تروبيكال هاوايان 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي الأنناس 🍕"
    ], //34

    [
        "تشيز بيتزا 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي الجبنة فقط 🍕"
    ], //35

    [
        "بيبروني بيتزا 🍕\n\
        ***************************************\n\
        بيتزا بحجم صغير تحتوي علي بيبروني 🍕"
    ], //36

    [
        "تشيكن تيندرز 🍗\n\
        ***************************************\n\
        أجنحة دجاج تندر 🍗"
    ], //37

    [
        "هوت ريورد 🏅\n\
        ***************************************\n\
        مكافأت زبائن"
    ] //38
];

function getReply(prompt) {
    for (let i = 0; i < prompts.length; i++) {
        if (prompts[i].includes(prompt.toLowerCase())) {
            return replies[i];
        }
    }
    return "I'm sorry, I don't have a response for that.";
}

// Function to get bot response
function getBotResponse(userInput) {
    userInput = userInput.trim().toLowerCase();
    return getReply(userInput);
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