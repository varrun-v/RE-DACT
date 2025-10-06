#  RE-DACT  
A lightweight and extensible PII redaction tool built with **spaCy**, **Regex**, and **FastAPI**, featuring a modern **Next.js + Tailwind** frontend.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Status](https://img.shields.io/badge/status-active-success)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![Next.js](https://img.shields.io/badge/frontend-Next.js-black)

---

## 📖 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Demo / Screenshots](#demo--screenshots)
- [Contributing](#contributing)
- [Roadmap / TODO](#roadmap--todo)
- [License](#license)
- [Author](#author)

---

## 🧩 Overview
**RE-DACT** is a privacy-focused redaction system designed to automatically identify and mask **Personally Identifiable Information (PII)** such as names, emails, phone numbers, and addresses from text documents.

The goal is to make document sanitization **accurate, fast, and developer-friendly** — whether you’re handling logs, reports, or sensitive files.

---

## 🚀 Features
- 🧠 **Entity Detection** — Uses **spaCy NER** and **Regex** for detecting sensitive data.  
- 🔍 **Custom Rules** — Easily extend with new entity patterns.  
- ⚡ **FastAPI Backend** — For real-time redaction APIs.  
- 🖥 **Next.js Frontend** — Responsive UI for uploading and viewing redacted results.  
- 🧰 **Modular Design** — Separate backend, frontend, and model layers.  
- 🧪 **Test Suite** — Includes test cases for all major modules.

---

## 🛠 Tech Stack
**Frontend:** Next.js, Tailwind CSS, Shadcn/UI  
**Backend:** FastAPI (Python 3.10+)  
**ML/NLP:** spaCy, Regex  
**Database (optional):** PostgreSQL  
**Deployment:** Docker, Render / Vercel  

---

## 🏗 Architecture
```bash
            ┌──────────────────────────────┐
            │          Frontend            │
            │   (Next.js + Tailwind CSS)   │
            └──────────────┬───────────────┘
                           │ API Calls (JSON)
            ┌──────────────┴───────────────┐
            │          Backend             │
            │      (FastAPI + spaCy)       │
            └──────────────┬───────────────┘
                           │
                    [Optional Database]

```
---

## ⚙️ Installation

### Prerequisites

- Node.js >= 18
    
- Python >= 3.10
    
- pip, npm, and Git installed
    

### Setup

```bash
# Clone the repository
git clone https://github.com/varrun-v/RE-DACT.git
cd RE-DACT

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
npm run dev
```

---

## 🧠 Usage

### Run the backend

```bash
cd backend
uvicorn main:app --reload
```

### Run the frontend

```bash
cd frontend
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** to use RE-DACT locally.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
    
2. Create a new branch (`git checkout -b feature-name`)
    
3. Commit changes (`git commit -m 'Add feature'`)
    
4. Push to your fork (`git push origin feature-name`)
    
5. Open a Pull Request
    

---

## 🧭 Roadmap / TODO

-  Integrate BERT-based NER model using Hugging Face
    
-  Add authentication system
    
-  Dockerize backend and frontend
    
-  Build browser extension for redaction
    
-  Improve regex coverage for custom entities
    
-  Add admin panel for managing models
    

---

## 📜 License

This project is licensed under the **Apache License 2.0**.  
You are free to use, modify, and distribute this software for personal or commercial purposes,  
provided you comply with the terms of the license.

- You **must include** a copy of the license in any distribution.
    
- You **must preserve** any copyright, patent, or attribution notices.
    
- There is **no warranty** for this software.
    

See the LICENSE file for the full text of the Apache License, Version 2.0.

---

## ⚙️ Third-Party Licenses

This project uses third-party open-source tools and libraries.  
Their respective licenses apply:

- [spaCy](https://spacy.io) — Licensed under the [MIT License](https://github.com/explosion/spaCy/blob/master/LICENSE)
    

---

## 🧑‍💻 Author

**Varrun V**  
[GitHub](https://github.com/varrun-v) | [LinkedIn](https://linkedin.com/in/varrun-v)

_Last updated: October 2025_
