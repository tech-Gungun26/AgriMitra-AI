function diagnoseCrop() {
  const result = document.getElementById("diagnosisResult");
  result.innerText = "Diagnosis: Early Blight (Fungal Infection).\nSolution: Use Mancozeb 75% WP spray.";
}

function getPrice() {
  const crop = document.getElementById("cropName").value.toLowerCase();
  const result = document.getElementById("priceResult");
  if (crop === "tomato") {
    result.innerText = "Tomato price today in Chikkaballapur: ₹8.5/kg";
  } else {
    result.innerText = "Price data not available for this crop.";
  }
}

function getScheme() {
  const query = document.getElementById("schemeQuery").value.toLowerCase();
  const result = document.getElementById("schemeResult");
  if (query.includes("drip")) {
    result.innerText = "PMKSY Subsidy: 55% for small farmers on drip irrigation. Apply via agriservices portal.";
  } else {
    result.innerText = "No matching scheme found. Try keywords like 'subsidy', 'loan', etc.";
  }
}

// Voice Search functionality for Home page with animated waveform
const voiceBtn = document.getElementById('voiceSearchBtn');
const voiceResult = document.getElementById('voiceResult');
const canvas = document.getElementById('voiceWaveform');
const ctx = canvas ? canvas.getContext('2d') : null;
let animationId;
let audioContext, analyser, dataArray, source;

function drawWaveform() {
  if (!ctx || !analyser) return;
  analyser.getByteTimeDomainData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = ctx.createLinearGradient(0, 0, canvas.width, 0);
  ctx.strokeStyle.addColorStop(0, '#198754');
  ctx.strokeStyle.addColorStop(0.5, '#b6e2c2');
  ctx.strokeStyle.addColorStop(1, '#fff');
  let sliceWidth = canvas.width / dataArray.length;
  let x = 0;
  for (let i = 0; i < dataArray.length; i++) {
    let v = dataArray[i] / 128.0;
    let y = (v * canvas.height) / 2;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  }
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
  animationId = requestAnimationFrame(drawWaveform);
}

function stopWaveform() {
  if (animationId) cancelAnimationFrame(animationId);
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

if (voiceBtn) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.onclick = async () => {
      voiceResult.textContent = 'Listening...';
      // Start waveform animation
      if (navigator.mediaDevices && window.AudioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        dataArray = new Uint8Array(analyser.fftSize);
        source.connect(analyser);
        drawWaveform();
      }
      recognition.start();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      voiceResult.textContent = `You said: ${transcript}`;
      stopWaveform();
      if (audioContext) audioContext.close();
    };

    recognition.onerror = (event) => {
      voiceResult.textContent = `Error: ${event.error}`;
      stopWaveform();
      if (audioContext) audioContext.close();
    };

    recognition.onend = () => {
      stopWaveform();
      if (audioContext) audioContext.close();
    };
  } else {
    voiceBtn.onclick = () => {
      voiceResult.textContent = 'Voice recognition not supported in this browser.';
    };
  }
}

// Sidebar floating/collapse logic
const sidebar = document.getElementById('sidebar');
const navLinks = sidebar ? sidebar.querySelectorAll('.nav-link') : [];
let sidebarTimeout;

function expandSidebar() {
  sidebar.classList.remove('collapsed');
  document.body.classList.remove('sidebar-collapsed');
}

function collapseSidebar() {
  sidebar.classList.add('collapsed');
  document.body.classList.add('sidebar-collapsed');
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    expandSidebar();
    // Collapse after 2 seconds of inactivity
    clearTimeout(sidebarTimeout);
    sidebarTimeout = setTimeout(() => {
      collapseSidebar();
    }, 2000);
  });
});

// Collapse sidebar when user interacts with main content
const main = document.querySelector('main');
if (main) {
  main.addEventListener('mousedown', () => {
    collapseSidebar();
  });
  main.addEventListener('touchstart', () => {
    collapseSidebar();
  });
}
// Start with expanded sidebar
expandSidebar();
