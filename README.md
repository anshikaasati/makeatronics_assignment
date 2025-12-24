# Maketronics Intelligence Dashboard

A real-time intelligence dashboard for monitoring industrial events, incidents, and tasks. Features an AI-powered categorization engine that automatically tags incoming messages based on context and priority.

## 🚀 Features

- **Real-time Ingestion**: Stream discrete messages into the system via API.
- **Intelligent Categorization**: Automatically detects `INCIDENT`, `ISSUE`, `LOG`, `TASK`, `NOTE`, or `EVENT` using a hierarchical rule engine.
- **Live Feed**: WebSockets/Polling-based feed of processed events.
- **Dashboard Analytics**: aggregated stats on severity, domain, and category.
- **Clean Architecture**: Backend organized into Domain, Infrastructure, Service, and API layers (SOLID principles).
- **Feature-Sliced Frontend**: React architecture for scalable UI development.

## 🛠️ Tech Stack

- **Backend**: Python 3.12+, FastAPI, SQLModel (SQLite), Pydantic.
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS usage (Vanilla CSS implementation).
- **Architecture**: SOLID Principles, Clean Architecture, Feature-Sliced Design.

## 📂 Project Structure

```
├── backend/
│   ├── app/
│   │   ├── api/            # Routes & Controllers
│   │   ├── core/           # Config & Security
│   │   ├── domain/         # Models, Schemas, Interfaces (Pure Logic)
│   │   ├── infrastructure/ # DB, Rule Engine Impl
│   │   └── services/       # Business Logic Coordination
│   ├── tests/              # Test Suite
│   └── main.py             # Entry Point
├── frontend/
│   ├── src/
│   │   ├── features/       # Feature-based modules (Dashboard, Ingest)
│   │   └── services/       # API Clients
└── ...
```

## ⚡ Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend Setup

1. Navigate to backend:
   ```bash
   cd backend
   ```
2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run server:
   ```bash
   uvicorn main:app --reload
   ```
   Server running at: `http://localhost:8000`
   Docs: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
   App running at: `http://localhost:5173`

## 🧠 Categories

The system uses a priority-based engine to classify events:
1. **INCIDENT**: Critical failures, safety issues (Smoke, Fire).
2. **TASK (High)**: Immediate actions (Replace, Install).
3. **LOG (Strong)**: Explicit system logs.
4. **ISSUE**: Functional defects, bugs.
5. **EVENT**: Completed actions or logistics.
6. **LOG**: General metrics.
7. **NOTE**: Memos and observations.
8. **TASK (General)**: To-do items.

## 🧪 Testing

Run the categorization test suite:
```bash
python -m backend.tests.test_categorization
```
