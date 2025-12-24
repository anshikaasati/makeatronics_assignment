# Maketronics Operational Intelligence System

> From Chaos to Clarity — A Self-Organizing Operational Intelligence System

Maketronics is a production-ready system designed to ingest unstructured operational inputs (logs, human notes, sensor readings) and transform them into structured, actionable intelligence.

## 🏗 System Architecture

The system is composed of two main artifacts:

### 1. Backend (`/backend`)
*   **Framework**: FastAPI (Python)
*   **Database**: SQLite (Dev) / Postgres (Prod) compatible via SQLModel
*   **Intelligence**: Heuristic & rule-based processing engine (Deterministic, fast, zero-dependency)
*   **Role**: Ingests raw text, inferencing structure (Severity, Domain, Tags), and serving analytics.

### 2. Frontend (`/frontend`)
*   **Framework**: React + TypeScript (Vite)
*   **Styling**: TailwindCSS
*   **Role**: Provides a seamless "Input Console" for operators and a "Live Dashboard" for insights.

## 🚀 Getting Started

### Prerequisites
*   Python 3.10+
*   Node.js 18+

### Setup Instructions

#### Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🧠 Design Philosophy
*   **Clarity over Cleverness**: The code is explicit. Logic is separated into Services.
*   **Robustness**: The system handles "junk" input without crashing.
*   **Interpretation-Heavy UX**: The UI explains *what* the system found, rather than just showing raw tables.
