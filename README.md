# Smart Resume Analyzer AI 🚀

An advanced AI-powered Resume Analysis and Career Intelligence Platform built with **FastAPI**, **React**, **PostgreSQL**, **LLMs**, **Vector Search**, and **Multi-Agent AI Architecture**.

This platform helps users:

* Upload and analyze resumes
* Calculate ATS compatibility scores
* Match resumes with job descriptions
* Receive AI-powered resume improvements
* Chat with an AI resume coach
* Get semantic job recommendations
* Use multi-agent AI career workflows

---

# ✨ Features

## 🔐 Authentication System

* JWT Authentication
* Secure Login & Registration
* Password Hashing with bcrypt
* Protected API Routes
* User-based Resume Management

---

## 📄 Resume Management

* Upload PDF & DOCX resumes
* Resume parsing and text extraction
* Local file storage system
* Resume metadata management
* Multi-resume support foundation

---

## 🤖 AI Resume Analysis

* ATS Score Calculation
* Missing Skills Detection
* Missing Section Detection
* Keyword Density Analysis
* Resume Completeness Evaluation

---

## 🧠 AI Features

### AI Resume Assistant

* Resume improvement suggestions
* ATS optimization tips
* Professional wording enhancement
* Achievement-focused rewriting

### AI Resume Chatbot

* Context-aware conversations
* Resume-based career advice
* ATS-aware recommendations
* Conversation memory support

### Job Description Matching

* Semantic similarity matching
* Missing skill detection
* Match percentage calculation
* Embeddings-based comparison

### AI Career Agent System

* ATS Agent
* Resume Writer Agent
* Job Matching Agent
* Interview Preparation Agent
* Supervisor Agent Orchestration

---

## 🔎 RAG & Semantic Search

* Vector embeddings
* ChromaDB vector database
* Semantic job recommendations
* Retrieval-Augmented AI workflows

---

# 🏗️ System Architecture

```text
React Frontend
      ↓
FastAPI Backend
      ↓
Authentication Layer
      ↓
AI Services Layer
 ├── ATS Engine
 ├── Resume Parser
 ├── JD Matcher
 ├── AI Chatbot
 ├── Multi-Agent System
 └── Vector Search Engine
      ↓
PostgreSQL + ChromaDB
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* TailwindCSS
* Axios
* React Router

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic
* JWT Authentication

## AI / NLP

* OpenAI API
* Sentence Transformers
* spaCy
* PyMuPDF
* python-docx
* ChromaDB

---

# 📂 Project Structure

```text
smart-resume-analyzer/
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── agents/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/smart-resume-analyzer.git
cd smart-resume-analyzer
```

---

# Backend Setup

## 2. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### Activate Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create:

```text
backend/.env
```

Add:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/smart_resume_analyzer
SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

---

## 5. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

## 6. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 7. Run Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔐 Authentication Flow

```text
User Login
     ↓
JWT Token Generated
     ↓
Protected API Access
     ↓
AI Features Enabled
```

---

# 🧠 AI Workflow Pipeline

```text
Resume Upload
      ↓
Text Extraction
      ↓
Resume Analysis
      ↓
ATS Scoring
      ↓
Embeddings Generation
      ↓
Vector Search
      ↓
AI Recommendations
      ↓
Multi-Agent Processing
```

---

# 📡 Main API Endpoints

## Authentication

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| POST   | /auth/register | Register user    |
| POST   | /auth/login    | Login user       |
| GET    | /users/me      | Get current user |

---

## Resume APIs

| Method | Endpoint                     | Description                       |
| ------ | ---------------------------- | --------------------------------- |
| POST   | /resumes/upload              | Upload resume                     |
| POST   | /resumes/match               | Match resume with job description |
| GET    | /resumes/improve             | AI resume improvement             |
| POST   | /resumes/chat                | AI resume chatbot                 |
| GET    | /resumes/job-recommendations | Semantic job recommendations      |
| POST   | /resumes/career-agent        | AI career workflow                |
| POST   | /resumes/supervisor-agent    | Multi-agent AI system             |

---

# 🔥 AI Concepts Implemented

* Retrieval-Augmented Generation (RAG)
* Semantic Similarity Search
* Vector Databases
* Embeddings
* Prompt Engineering
* Multi-Agent AI Systems
* Conversational Memory
* ATS Optimization
* NLP Resume Parsing

---

# 🚀 Future Improvements

* Docker Deployment
* Redis + Celery
* Cloud Storage (AWS S3)
* Real-Time AI Streaming
* Multi-Resume Dashboard
* Resume Versioning
* Interview Simulation
* AI Career Roadmaps
* LinkedIn Integration
* Real Job APIs
* Fine-Tuned Resume Models

---

# 📸 Screenshots

*Add frontend screenshots here later.*

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Open pull request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built with ❤️ using FastAPI, React, and AI technologies.
