const API_KEY = 'AIzaSyCO6pp5ssIpESpmlNMyqKCo2swCbNTFOPw'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

document.getElementById('simulateBtn').addEventListener('click', async () => {
    const input = document.getElementById('userDecision').value;
    if (!input) {
        alert("क्वांटम मशीन को कोई इनपुट (फैसला) दें!");
        return;
    }

    document.getElementById('results').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');

    try {
        // AI को सख्त प्रॉम्प्ट
        const promptText = `User input: "${input}". 
        Reply strictly in Hindi. Give 3 short future scenarios (best, worst, wild). 
        Output ONLY valid JSON in this exact format, without any markdown formatting or extra words:
        {"best": "...", "worst": "...", "wild": "..."}`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();
        
        // अगर Google ने कोई एरर भेजा है, तो उसे पकड़ें
        if (data.error) {
            throw new Error("API Error: " + data.error.message);
        }

        let aiText = data.candidates[0].content.parts[0].text;
        
        // एक्स्ट्रा बैकटिक्स की सफाई
        aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
        const futureData = JSON.parse(aiText);

        document.getElementById('loader').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');

        typeWriterEffect('output1', futureData.best);
        setTimeout(() => typeWriterEffect('output2', futureData.worst), 1500);
        setTimeout(() => typeWriterEffect('output3', futureData.wild), 3000);

    } catch (error) {
        // यह लाइन स्क्रीन पर असली एरर दिखाएगी
        alert("सिस्टम एरर (जांच करें): " + error.message);
        document.getElementById('loader').classList.add('hidden');
    }
});

function typeWriterEffect(elementId, text) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    let i = 0;
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 30);
        }
    }
    typing();
}
