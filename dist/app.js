(() => {
  let english = false;
  let animal = 'cattle';
  const phone = '919546439494';
  const data = {
    cattle: {hi:['गाय और भैंस की सेहत का साथ','दूध देने वाले पशुओं से लेकर बछड़ों तक—दवा, सप्लीमेंट और देखभाल की जानकारी के लिए संपर्क करें।',['पशु चिकित्सा की दवाइयाँ','मिनरल एवं कैल्शियम','विटामिन सप्लीमेंट','खुराक का मार्गदर्शन']],en:['Care for cows and buffaloes','From calves to dairy animals, contact us for medicines, supplements and care guidance.',['Veterinary medicines','Minerals & calcium','Vitamin supplements','Dosage guidance']]},
    goat: {hi:['बकरी और भेड़ की देखभाल','अपने छोटे पशुओं के लिए दवा और पोषण संबंधी जानकारी पाएँ। उपलब्धता के लिए पहले संपर्क करें।',['दवा की उपलब्धता','पोषण सप्लीमेंट','पर्ची की जाँच','उपयोग का मार्गदर्शन']],en:['Care for goats and sheep','Ask about medicine and nutrition for your small livestock. Contact us to confirm stock before visiting.',['Medicine availability','Nutrition supplements','Prescription enquiries','Usage guidance']]},
    poultry: {hi:['मुर्गी पालन में सही मार्गदर्शन','पोल्ट्री की दवा, विटामिन और सप्लीमेंट की उपलब्धता जानने के लिए हमसे बात करें।',['पोल्ट्री दवाइयाँ','विटामिन सप्लीमेंट','पोषण की जानकारी','विशेषज्ञ से मार्गदर्शन']],en:['Guidance for poultry owners','Talk to us about the availability of poultry medicines, vitamins and supplements.',['Poultry medicines','Vitamin supplements','Nutrition enquiries','Expert guidance']]},
    pets: {hi:['आपके पालतू पशु की देखभाल','कुत्ते, बिल्ली व अन्य पालतू पशुओं के लिए डॉक्टर की पर्ची भेजकर दवा की उपलब्धता पूछें।',['पर्ची के अनुसार पूछताछ','दवा की उपलब्धता','सप्लीमेंट की जानकारी','देखभाल का मार्गदर्शन']],en:['Care for your pets','Send your vet’s prescription to check medicine availability for dogs, cats and other pets.',['Prescription enquiries','Medicine availability','Supplement enquiries','Care guidance']]}
  };
  function wa(message) { return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message); }
  function updateAnimal(){
    const d=data[animal][english?'en':'hi'];
    document.getElementById('animal-title').textContent=d[0];
    document.getElementById('animal-desc').textContent=d[1];
    document.getElementById('animal-list').replaceChildren(...d[2].map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
    document.getElementById('animal-enquiry').href=wa((english?'Hello, I would like to check medicine availability for ':'नमस्ते, मुझे दवा की उपलब्धता पूछनी है: ')+d[0]);
    document.querySelectorAll('[data-animal]').forEach(b=>{const active=b.dataset.animal===animal;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
  }
  function links(){
    const messages=english?{prescription:'Hello, I would like to send my vet’s prescription and check medicine availability before visiting. I will attach the photo here.',rate:'Hello, please share today’s cattle feed rates and available pack sizes.',directions:'Hello, please share the shop’s Google Maps location, address and opening hours.'}:{prescription:'नमस्ते, मैं डॉक्टर की पर्ची भेजकर दवा की उपलब्धता जानना चाहता/चाहती हूँ। मैं यहाँ पर्ची की फोटो जोड़ूँगा/जोड़ूँगी।',rate:'नमस्ते, कृपया पशु आहार का आज का भाव और उपलब्ध पैक साइज़ बताएँ।',directions:'नमस्ते, कृपया दुकान का Google Maps लोकेशन, पूरा पता और खुलने का समय भेजें।'};
    document.querySelectorAll('[data-wa]').forEach(a=>a.href=wa(messages[a.dataset.wa]));
    document.querySelectorAll('[data-product]').forEach(a=>a.href=wa(a.dataset.waMessage || ((english?'Hello, please share the rate and availability for: ':'नमस्ते, कृपया भाव और उपलब्धता बताएँ: ')+a.dataset.product)));
  }
  document.getElementById('language').addEventListener('click',()=>{
    english=!english;document.documentElement.lang=english?'en':'hi';
    document.querySelectorAll('[data-hi][data-en]').forEach(el=>{el.innerHTML=english?el.dataset.en:el.dataset.hi;});
    const b=document.getElementById('language');b.innerHTML=english?'हिंदी <span>⇄</span>':'English <span>⇄</span>';b.setAttribute('aria-label',english?'हिंदी में पढ़ें':'Switch to English');
    document.title=english?'Bhagwati Ayurved Bhawan | Veterinary Medicines & Cattle Feed':'भगवती आयुर्वेद भवन | मवेशी दवा खाना एवं परामर्श केन्द्र, रहिका मधुबनी';
    links();updateAnimal();
  });
  const tabs=[...document.querySelectorAll('[data-animal]')];
  tabs.forEach((b,i)=>{b.id='tab-'+b.dataset.animal;b.setAttribute('aria-controls','animal-panel');b.addEventListener('click',()=>{animal=b.dataset.animal;updateAnimal();document.getElementById('animal-panel').setAttribute('aria-labelledby',b.id);});b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();tabs[n].click();tabs[n].focus();}});});
  document.getElementById('animal-panel').setAttribute('aria-labelledby','tab-cattle');links();updateAnimal();
})();

(() => {
  const video=document.getElementById('main-shop-video');
  if(!video)return;
  video.muted=true;
  function tryPlay(){const result=video.play();if(result)result.catch(()=>{});}
  new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)tryPlay();else video.pause();}),{threshold:.15}).observe(video);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(video.getBoundingClientRect().bottom>0&&video.getBoundingClientRect().top<window.innerHeight)tryPlay();});
  tryPlay();
})();
