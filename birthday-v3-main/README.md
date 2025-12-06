# birthday-v3

This is the Birthday v3 Next.js demo app. Use the instructions below to run locally and deploy to Vercel (to reproduce a hosted demo similar to `birthday-v3-demo`).

Requirements
- Node.js (LTS) and `npm` installed and available on PATH
- Git (for pushing to GitHub)

Run locally (PowerShell)
```powershell
cd "C:\Users\Abhilash Abhi\Downloads\birthday-v3-main\birthday-v3-main"
npm install
npm run dev

# Open http://localhost:3000
```

If `npm` is not found, install Node.js from https://nodejs.org (LTS recommended).

Deploy to Vercel
1. Create a GitHub repository and push this project (see commands below).
2. Sign in to https://vercel.com and import the repository as a new project.
3. Vercel auto-detects Next.js. Use the default build settings (`npm run build`).
4. Give the project a name; if you want the same URL `birthday-v3-demo`, set the project name to `birthday-v3-demo` (note: name availability is not guaranteed).

Push to GitHub (PowerShell)
```powershell
cd "C:\Users\Abhilash Abhi\Downloads\birthday-v3-main\birthday-v3-main"
git init
git add .
git commit -m "Initial commit — birthday-v3"
git branch -M main
# create a GitHub repo and replace <your-repo-url> below
git remote add origin <your-repo-url>
git push -u origin main
```

Notes
- This repo uses Next 15 + React 19 — use a recent Node LTS (18 or 20+) for best compatibility.
- The demo expects `public/audio/bg.mp3` for background audio; add this file if you want sound.
- We also added a static `public/index.html` so you can preview the UI without running Next.

If you'd like, I can add `vercel.json` with custom settings, create a GitHub Actions workflow, or prepare a small `public/audio/bg.mp3` placeholder (you'll need to replace it with your audio file).
# 🎂 Birthday 3.0

A sweet, heartfelt birthday website built using **Next.js + Framer Motion** — perfect for surprising someone special on their birthday 🎂💖

---

> ⚠️ This is a **free version**, so some features like background music, animations and balloon screen, final surprise screen are not included. Premium version includes full features, music, animations & everything with guide & support.
> You can **buy the premium code** from my store [here](https://www.anujbuilds.in/products/birthday-v3).
---

## 🛠 Tech Stack

- ⚛️ **Next.js** – React Framework for building fast UI
- 🎨 **Tailwind CSS** – For modern and responsive styling
- 🎞️ **Framer Motion** – Smooth entrance and fade animations
- 🎊 **Canvas Confetti** – Birthday celebration confetti effect
- 🖼️ **Swiper.js** – For smooth image slideshow

---

## 🖥 Local Setup

To run this project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/Anuj579/birthday-v3.git

# Navigate into the folder
cd birthday-v3

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to explore the site.

---

## 🔗 Social Media

Follow me for more emotional surprise websites and creative dev content:


 📷 Instagram: [@abhi](https://instagram.com/abhi)
 🎬 YouTube: [@abhi](https://youtube.com/@abhi)
 🐦 Twitter: [@abhi](https://twitter.com/abhi)
If you found this project lovely, please consider giving it a ⭐ on [GitHub](https://github.com/Anuj579)  
Made with emotions by **Anuj** – _@anujbuilds_
Made with emotions by **Anuj** – _@abhi_
---
  `Website idea & code by @abhi`  

### Free Code
- This free version is strictly for **personal use only**.  
- You **cannot** post, upload, or share this project online in any form (e.g., Instagram reels, YouTube videos, websites, or any public platform).  
- Using this free code publicly is **prohibited**.
- Any violation will be considered **copyright infringement**, and I reserve the right to report it.

### Premium Code
- The premium code can be used publicly **only if proper credit is given**:  
  `Website idea & code by @anujbuilds`  
- Without credit or without explicit permission, public use is **not allowed**.