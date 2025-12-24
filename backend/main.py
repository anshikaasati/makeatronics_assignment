from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.infrastructure.database import create_db_and_tables
from app.api.v1.api import api_router

app = FastAPI(
    title="Maketronics Operational Intelligence",
    description="API for ingesting and processing unstructured operational data.",
    version="2.0.0"
)

# CORS: Allow all for development. In prod, lock this down.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"status": "online", "system": "Maketronics Intelligence Engine (SOLID)"}
