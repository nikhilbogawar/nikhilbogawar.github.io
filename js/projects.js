/* ===================================================================
   INTERACTIVE PROJECT SIMULATORS
   Farmer's Connect (Random Forest + CNN) & Dynamic QR Ticket Engine
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Modal Open / Close Handler
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeButtons = document.querySelectorAll('.modal-close-btn');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if (window.soundFX) window.soundFX.playClick();
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // Esc key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlays.forEach(modal => modal.classList.add('hidden'));
      document.body.style.overflow = '';
    }
  });

  // Modal Tab Switching
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  modalTabBtns.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const parent = tabBtn.closest('.modal-card');
      const targetTabId = tabBtn.getAttribute('data-tab');

      parent.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));

      tabBtn.classList.add('active');
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) targetContent.classList.add('active');

      if (window.soundFX) window.soundFX.playClick();
    });
  });

  // ================================================================
  // 1. FARMER'S CONNECT SIMULATOR LOGIC
  // ================================================================
  const sliders = [
    { input: 'input-n', badge: 'val-n' },
    { input: 'input-p', badge: 'val-p' },
    { input: 'input-k', badge: 'val-k' },
    { input: 'input-temp', badge: 'val-temp' },
    { input: 'input-hum', badge: 'val-hum' },
    { input: 'input-ph', badge: 'val-ph' },
    { input: 'input-rain', badge: 'val-rain' }
  ];

  sliders.forEach(s => {
    const el = document.getElementById(s.input);
    const badge = document.getElementById(s.badge);
    if (el && badge) {
      el.addEventListener('input', () => {
        badge.textContent = el.value;
      });
    }
  });

  // Presets
  const presets = {
    rice: { n: 90, p: 42, k: 43, temp: 24.5, hum: 82, ph: 6.5, rain: 220 },
    cotton: { n: 118, p: 46, k: 20, temp: 28.0, hum: 60, ph: 7.2, rain: 80 },
    maize: { n: 80, p: 48, k: 20, temp: 22.0, hum: 65, ph: 6.8, rain: 110 }
  };

  document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-preset');
      const data = presets[key];
      if (!data) return;

      document.getElementById('input-n').value = data.n;
      document.getElementById('val-n').textContent = data.n;

      document.getElementById('input-p').value = data.p;
      document.getElementById('val-p').textContent = data.p;

      document.getElementById('input-k').value = data.k;
      document.getElementById('val-k').textContent = data.k;

      document.getElementById('input-temp').value = data.temp;
      document.getElementById('val-temp').textContent = data.temp;

      document.getElementById('input-hum').value = data.hum;
      document.getElementById('val-hum').textContent = data.hum;

      document.getElementById('input-ph').value = data.ph;
      document.getElementById('val-ph').textContent = data.ph;

      document.getElementById('input-rain').value = data.rain;
      document.getElementById('val-rain').textContent = data.rain;

      if (window.soundFX) window.soundFX.playClick();
    });
  });

  // Random Forest Inference Calculation
  const runCropBtn = document.getElementById('run-crop-predict-btn');
  const cropResultBox = document.getElementById('crop-result-box');

  if (runCropBtn && cropResultBox) {
    runCropBtn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();

      const n = parseFloat(document.getElementById('input-n').value);
      const p = parseFloat(document.getElementById('input-p').value);
      const k = parseFloat(document.getElementById('input-k').value);
      const rain = parseFloat(document.getElementById('input-rain').value);
      const temp = parseFloat(document.getElementById('input-temp').value);

      cropResultBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; color: #38bdf8;">
          <div class="btn-spinner" style="border-top-color: #00f2fe;"></div>
          <span>Evaluating decision trees across 100 Random Forest estimators...</span>
        </div>
      `;

      setTimeout(() => {
        let crop = "Wheat (Triticum aestivum)";
        let icon = "🌾";
        let confidence = (94.2 + Math.random() * 4.5).toFixed(1);
        let fertilizer = "Balanced Urea + DAP (120:60:40 kg/ha)";

        if (rain > 180 && n > 70) {
          crop = "Rice (Oryza sativa)";
          icon = "🌾";
          fertilizer = "Nitrogen-rich top dressing (Urea) with submerged standing water";
        } else if (temp > 26 && rain < 100) {
          crop = "Cotton (Gossypium)";
          icon = "🌱";
          fertilizer = "Phosphorus enriched starter mix (NPK 10:26:26)";
        } else if (n > 100) {
          crop = "Maize / Corn (Zea mays)";
          icon = "🌽";
          fertilizer = "High Nitrogen Split Application with Micronutrient Zinc";
        } else if (p > 60) {
          crop = "Chickpea / Pulses (Cicer arietinum)";
          icon = "🫘";
          fertilizer = "Rhizobium Bio-fertilizer + Single Super Phosphate";
        }

        cropResultBox.innerHTML = `
          <div class="prediction-card">
            <div class="crop-icon-large">${icon}</div>
            <div class="prediction-info">
              <h4>${crop}</h4>
              <div class="confidence-bar-wrap">
                <div class="confidence-bar" style="width: ${confidence}%;"></div>
              </div>
              <div class="prediction-metrics">
                <strong>Model Confidence:</strong> ${confidence}% • <strong>Algorithm:</strong> Random Forest Classifier (Scikit-Learn)
              </div>
              <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 6px;">
                💡 <strong>Recommended Fertilizer:</strong> ${fertilizer}
              </div>
            </div>
          </div>
        `;

        if (window.soundFX) window.soundFX.playSuccess();
      }, 600);
    });
  }

  // Plant Disease Scanner Logic
  const leafCards = document.querySelectorAll('.leaf-card');
  let selectedDisease = 'healthy-apple';

  leafCards.forEach(card => {
    card.addEventListener('click', () => {
      leafCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedDisease = card.getAttribute('data-disease');
      if (window.soundFX) window.soundFX.playClick();
    });
  });

  const runDiseaseBtn = document.getElementById('run-disease-predict-btn');
  const diseaseResultBox = document.getElementById('disease-result-box');

  const diseaseData = {
    'healthy-apple': {
      title: "Apple Leaf: Healthy Condition",
      status: "No Pathogen Detected",
      color: "#10b981",
      confidence: "99.2%",
      remedy: "Optimal chlorophyll index detected. Maintain standard preventative irrigation and biological compost."
    },
    'potato-blight': {
      title: "Potato Leaf: Early Blight (Alternaria solani)",
      status: "Fungal Infection Detected",
      color: "#f87171",
      confidence: "97.8%",
      remedy: "Apply copper-based fungicide or Chlorothalonil spray. Remove lower infected foliage to halt spore transmission."
    },
    'tomato-curl': {
      title: "Tomato Leaf: Yellow Leaf Curl Virus (TYLCV)",
      status: "Viral Pathogen Detected",
      color: "#fbbf24",
      confidence: "98.4%",
      remedy: "Vector control required: eliminate whitefly populations using neem oil or imidacloprid and isolate infected specimens."
    }
  };

  if (runDiseaseBtn && diseaseResultBox) {
    runDiseaseBtn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();

      diseaseResultBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; color: #38bdf8;">
          <div class="btn-spinner" style="border-top-color: #00f2fe;"></div>
          <span>Passing tensor through Convolutional Neural Network feature maps...</span>
        </div>
      `;

      setTimeout(() => {
        const d = diseaseData[selectedDisease];
        diseaseResultBox.innerHTML = `
          <div style="width: 100%; text-align: left; animation: fade-in 0.3s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h4 style="color: ${d.color}; font-size: 1.15rem; font-weight: 700;">${d.title}</h4>
              <span style="font-family: var(--font-code); font-size: 0.8rem; background: rgba(255,255,255,0.06); padding: 3px 8px; border-radius: 4px;">CNN Match: ${d.confidence}</span>
            </div>
            <div style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 8px;">
              <strong>Diagnostic Status:</strong> ${d.status}
            </div>
            <div style="font-size: 0.82rem; color: #94a3b8; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; border-left: 3px solid ${d.color};">
              🛡️ <strong>Prescribed Treatment:</strong> ${d.remedy}
            </div>
          </div>
        `;
        if (window.soundFX) window.soundFX.playSuccess();
      }, 700);
    });
  }

  // ================================================================
  // 2. DYNAMIC QR TICKET SIMULATOR LOGIC
  // ================================================================
  const qrSvg = document.getElementById('dynamic-qr-svg');
  const timerBar = document.getElementById('qr-timer-bar');
  const timerCountdown = document.getElementById('timer-countdown');
  const currentTokenHash = document.getElementById('current-token-hash');
  const forceRefreshBtn = document.getElementById('refresh-qr-btn');

  const DURATION = 15; // 15 seconds refresh cycle
  let timeLeft = DURATION;
  let timerInterval = null;

  function generateHash() {
    const chars = '0123456789abcdef';
    let str = 'sha256-';
    for (let i = 0; i < 32; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  // Render randomized dynamic QR matrix pattern with authentic corner finders
  function renderDynamicQR() {
    if (!qrSvg) return;

    let svgContent = '';
    const size = 160;
    const modules = 21; // 21x21 QR Grid
    const step = size / modules;

    // Background
    svgContent += `<rect width="${size}" height="${size}" fill="#ffffff"/>`;

    // Function to render standard QR Position Detection Patterns (Corners)
    function drawCorner(x, y) {
      svgContent += `
        <rect x="${x * step}" y="${y * step}" width="${7 * step}" height="${7 * step}" fill="#0a0f1d"/>
        <rect x="${(x + 1) * step}" y="${(y + 1) * step}" width="${5 * step}" height="${5 * step}" fill="#ffffff"/>
        <rect x="${(x + 2) * step}" y="${(y + 2) * step}" width="${3 * step}" height="${3 * step}" fill="#00f2fe"/>
      `;
    }

    drawCorner(0, 0); // Top Left
    drawCorner(14, 0); // Top Right
    drawCorner(0, 14); // Bottom Left

    // Render pseudorandom data cells (skipping corner squares)
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        // Skip corner finder locations
        const inTopLeft = r < 7 && c < 7;
        const inTopRight = r < 7 && c >= 14;
        const inBottomLeft = r >= 14 && c < 7;

        if (inTopLeft || inTopRight || inBottomLeft) continue;

        if (Math.random() > 0.45) {
          const color = Math.random() > 0.85 ? '#00f2fe' : '#0a0f1d';
          svgContent += `<rect x="${c * step}" y="${r * step}" width="${step - 0.5}" height="${step - 0.5}" fill="${color}" rx="1"/>`;
        }
      }
    }

    qrSvg.innerHTML = svgContent;

    // Update Token String
    if (currentTokenHash) {
      currentTokenHash.textContent = generateHash();
    }
  }

  function startQRClock() {
    timeLeft = DURATION;
    renderDynamicQR();

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        timeLeft = DURATION;
        renderDynamicQR();
        if (window.soundFX) window.soundFX.playClick();
      }

      if (timerCountdown) {
        timerCountdown.textContent = `${timeLeft}s`;
      }
      if (timerBar) {
        const percent = (timeLeft / DURATION) * 100;
        timerBar.style.width = `${percent}%`;
      }
    }, 1000);
  }

  if (forceRefreshBtn) {
    forceRefreshBtn.addEventListener('click', () => {
      startQRClock();
      if (window.soundFX) window.soundFX.playClick();
    });
  }

  // Initialize QR clock on startup
  startQRClock();
});
