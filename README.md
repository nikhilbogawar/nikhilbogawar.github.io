# 🚀 Bogawar Nikhil – Software Developer Portfolio

An ultra-modern, high-performance, fully responsive, and animated personal developer portfolio built for **Bogawar Nikhil**. Featuring deep cosmic slate glassmorphism, interactive particle physics, 3D card perspective tilt, live project simulators, academic milestones, and verified credentials.

---

## 🌟 Highlights & Features

- **Cyber-Glass Design System**: Deep slate background (`#070a13`), frosted glassmorphic panels, gradient neon cyan & violet accents.
- **Interactive Constellation Canvas**: Background particle network dynamically connecting and reacting to cursor movements and proximity.
- **Custom Cursor & Smooth Follower**: Neon glowing trailing aura that expands over interactive controls.
- **Hero Code Terminal**: Interactive terminal featuring animated syntax-highlighted Python code representation of Nikhil's profile.
- **Dynamic Typewriter**: Continuously cycling headline highlighting core domains.
- **Interactive Project Simulators**:
  - **Farmer's Connect Simulator**: Test the Random Forest crop recommendation system with live N-P-K sliders, quick presets (Monsoon Rice, Cotton, Maize), and simulated CNN deep learning plant disease diagnostics.
  - **Dynamic QR Anti-Fraud Simulator**: Live 15-second countdown timer that generates rotating cryptographic SHA-256 tokens and renders dynamic SVG QR codes to prevent screenshot ticket fraud.
- **Interactive Skills Matrix**: Filter by *Backend & Frameworks*, *Web & Frontend*, *AI/ML & Data*, or *Tools & Concepts* with 3D tilt interaction.
- **Academic Journey Timeline**: Visual progression spanning B.Tech CSE (8.09 CGPA), Mechanical Engineering Diploma with distinction (8.8 CGPA), and SSC (9.3 GPA).
- **Verified Credentials**: Smart India Hackathon 2024 & 2025 honors, Microsoft AI Azure Virtual Internship, and Infosys / Edunet programs.
- **Interactive Contact Hub**: One-click email copy with clipboard feedback, direct phone calling, and interactive message form.
- **Procedural Audio FX**: Lightweight Web Audio API synthesizer for tactile UI clicks and success feedback (with on/off toggle).
- **Embedded Resume Asset**: Instant download button pointing directly to Nikhil's resume.

---

## 📁 Project Structure

```
nikhil-portfolio/
├── index.html                  # Core single-page portfolio application
├── css/
│   ├── style.css               # Design system, glassmorphism, typography, layout
│   ├── animations.css          # Ambient glow drift, pulsing dots, keyframes
│   └── responsive.css          # Mobile, tablet, desktop breakpoints
├── js/
│   ├── sound.js                # Web Audio API sound feedback
│   ├── particles.js            # Interactive HTML5 Canvas constellation
│   ├── typing.js               # Hero headline typewriter loop
│   ├── projects.js             # Farmer's Connect & Dynamic QR simulators
│   └── main.js                 # App init, cursor, scrollspy, filter tabs, form
├── assets/
│   ├── resume.pdf              # Bogawar Nikhil's official resume
│   └── Bogawar_Nikhil_Resume.pdf
├── package.json
└── README.md
```

---

## ⚡ How to Run Locally

### Option 1: Direct Browser Launch (Zero Install)
Simply double click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Live Local Server
If you have Node.js installed:
```bash
npx serve .
```
Or using Python:
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

---

## 🚀 How to Deploy to GitHub Pages

1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Bogawar Nikhil Portfolio"
   ```
2. Create a repository on GitHub (e.g. `nikhilbogawar.github.io`).
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/nikhilbogawar/nikhilbogawar.github.io.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub repository settings, enable **Pages** from the `main` branch. Your portfolio will be live at `https://nikhilbogawar.github.io`!
