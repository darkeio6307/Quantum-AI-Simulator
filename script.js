document.getElementById('simulateBtn').addEventListener('click', async () => {
    const input = document.getElementById('userDecision').value;
    if (!input) {
        alert("पहले क्वांटम मशीन को कोई इनपुट (फैसला) दें!");
        return;
    }

    // UI को अपडेट करना (लोडिंग दिखाना)
    document.getElementById('results').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');

    // क्वांटम एआई का प्रोसेसिंग टाइम (Simulation Delay)
    await new Promise(resolve => setTimeout(resolve, 2500));

    document.getElementById('loader').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');

    // अभी के लिए डमी भविष्य डेटा (बाद में इसे असली AI API से जोड़ेंगे)
    const futureData = {
        best: `इस यूनिवर्स में आपका फैसला एकदम सही साबित हुआ। आप इस क्षेत्र के टॉप एक्सपर्ट बन गए हैं और दुनिया भर से लोग आपसे सलाह लेने आते हैं। सफलता आपके कदम चूम रही है।`,
        worst: `इस टाइमलाइन में आपने शुरुआत तो की, लेकिन आलस के कारण बीच में छोड़ दिया। अब आप सोच रहे हैं कि काश उस दिन डार्क_ईयो ने सही मेहनत की होती।`,
        wild: `कुछ बहुत ही अजीब हुआ! आपके इस फैसले ने अनजाने में एक नई तकनीक को जन्म दे दिया जिसे एलियंस ने पकड़ लिया। अब आप पृथ्वी के पहले इंटरगैलेक्टिक एंबेसडर हैं!`
    };

    // एडवांस टाइपिंग इफ़ेक्ट
    typeWriterEffect('output1', futureData.best);
    setTimeout(() => typeWriterEffect('output2', futureData.worst), 1000);
    setTimeout(() => typeWriterEffect('output3', futureData.wild), 2000);
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
