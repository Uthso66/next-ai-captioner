# 🧠 AI Image Captioner — Next.js + FastAPI + BLIP

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge\&logo=pnpm\&logoColor=white)

A full-stack **AI Image Captioning** web application that generates natural-language descriptions for uploaded images using a **locally hosted BLIP model**.
The frontend is built with **Next.js + TypeScript**, while the backend runs a **FastAPI + PyTorch** inference server.

👉 **Live Demo (Frontend):**
[https://next-ai-captioner-wbpp-p8nqpxocr-uthsos-projects.vercel.app/](https://next-ai-captioner-wbpp-p8nqpxocr-uthsos-projects.vercel.app/)

---

## 🚀 Features

* 🧠 AI-powered image caption generation (BLIP)
* 📸 Image upload with real-time preview
* 🧾 Clean, readable natural-language captions
* ⚡ FastAPI backend with model caching
* 🌐 Fully decoupled frontend & backend architecture
* 🎨 Minimal, responsive UI built with Tailwind CSS
* 🧱 Modern Next.js App Router setup

---

## 🧱 Tech Stack

| Layer               | Technology           |
| :------------------ | :------------------- |
| **Frontend**        | Next.js (App Router) |
| **Language**        | TypeScript           |
| **Styling**         | Tailwind CSS         |
| **Backend**         | FastAPI              |
| **ML Model**        | BLIP (Salesforce)    |
| **ML Framework**    | PyTorch              |
| **Package Manager** | PNPM                 |
| **Deployment (FE)** | Vercel               |
| **Deployment (BE)** | Railway              |

---

## 🎥 Demo Video

> 📌 **Video walkthrough & live inference demo**

👉 *(https://youtu.be/uCn8YmCGg0A)*
---

## 🧠 How It Works

1. User uploads an image from the browser
2. Image is sent to the Next.js API route
3. The API forwards the image to the FastAPI backend
4. FastAPI runs the BLIP model locally (CPU)
5. Generated caption is returned and displayed in the UI

This approach avoids third-party inference instability and keeps full control over the ML pipeline.

---

## 💻 Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Uthso66/next-ai-captioner.git
cd next-ai-captioner
```

---

### 2️⃣ Frontend (Next.js)

```bash
pnpm install
pnpm run dev
```

Frontend will be available at:
👉 [http://localhost:3000](http://localhost:3000)

---

### 3️⃣ Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

Backend health check:
👉 [http://localhost:8000/health](http://localhost:8000/health)

---

## 🧪 Notes & Limitations

* BLIP runs on **CPU only** (free deployment)
* First request may be slow due to model warm-up
* Designed for **demo / portfolio / learning purposes**
* Not optimized for high-traffic production workloads

---

## 💡 Motivation

This project was built to:

* Avoid unreliable third-party inference APIs
* Demonstrate **full-stack AI deployment**
* Gain hands-on experience with **model serving**
* Showcase real-world system design beyond frontend-only demos

---

## 🧔 Author

**Uthso**
*Software QA Engineer • Security Enthusiast • AI/ML Hobbyist*

🌐 [Portfolio](https://www.google.com/search?q=%23)
🐙 [GitHub](https://github.com/Uthso66)
🧠 [LinkedIn](https://www.linkedin.com/in/tarikul-islam-uthso/)

---

## 🪄 License

This project is licensed under the **MIT License** © 2025 Uthso

