// तुम्हारी असली Google AI Studio API Key
const API_KEY = 'AIzaSyCO6pp5ssIpESpmlNMyqKCo2swCbNTFOPw'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

document.getElementById('simulateBtn').addEventListener('click', async () => {
    const input = document.getElementById('userDecision').value;
    if (!input) {
        alert("क्वांटम मशीन को कोई इनपुट (फैसला) दें!");
        return;
    }

    // लोडिंग स्क्रीन चालू करें
    document.getElementById('results').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');

    try {
        // AI को दिया जाने वाला हमारा सीक्रेट प्रॉम्प्ट (कमांड)
        const promptText = `मैं एक क्वांटम सिम्युलेटर बना रहा हूँ। यूज़र का फैसला है: "${input}"। 
        मुझे हिंदी में 3 अलग-अलग भविष्य की कहानियां (हर एक 2-3 लाइन की) दो। 
        जवाब बिल्कुल इस JSON फॉर्मेट में होना चाहिए और कोई एक्स्ट्रा टेक्स्ट नहीं होना चाहिए: 
        {"best": "सबसे अच्छा भविष्य...", "worst": "सबसे बुरा भविष्य...", "wild": "कुछ बहुत ही अजीब और मजेदार अप्रत्याशित..."}`;

        // AI सर्वर से संपर्क
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();
        
        // AI के जवाब को प्रोसेस करना
        let aiText = data.candidates[0].content.parts[0].text;
        
        // अगर AI ने बैकटिक्स (```json) लगा दिए हों, तो उन्हें हटाना
        aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
        const futureData = JSON.parse(aiText);

        // लोडिंग छिपाएं और रिजल्ट दिखाएं
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');

        // एडवांस टाइपिंग इफ़ेक्ट में AI का जवाब प्रिंट करें
        typeWriterEffect('output1', futureData.best);
        setTimeout(() => typeWriterEffect('output2', futureData.worst), 1500);
        setTimeout(() => typeWriterEffect('output3', futureData.wild), 3000);

    } catch (error) {
        console.error("Error:", error);
        alert("क्वांटम सर्वर में गड़बड़ी! कृपया इंटरनेट कनेक्शन जांचें या थोड़ी देर बाद प्रयास करें।");
        document.getElementById('loader').classList.add('hidden');
    }
});

// टाइपिंग एनिमेशन फंक्शन
function typeWriterEffect(elementId, text) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    let i = 0;
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 30); // टाइपिंग की स्पीड
        }
    }
    typing();
}
