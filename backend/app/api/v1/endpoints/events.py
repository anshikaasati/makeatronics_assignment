from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List, Optional
from app.infrastructure.database import get_session
from app.domain.models import Event, Severity
from app.domain.schemas import EventCreate, EventRead
from app.domain.interfaces import IIntelligenceEngine
from app.services.ingestion import IngestionService
from app.api.deps import get_intelligence_engine

router = APIRouter()

@router.post("/ingest", response_model=EventRead)
def ingest_data(
    event_in: EventCreate,
    session: Session = Depends(get_session),
    engine: IIntelligenceEngine = Depends(get_intelligence_engine)
):
    service = IngestionService(session, engine)
    return service.ingest(event_in)

@router.get("/events", response_model=List[EventRead])
def list_events(
    session: Session = Depends(get_session),
    limit: int = 100,
    offset: int = 0,
    domain: Optional[str] = None,
    severity: Optional[Severity] = None
):
    query = select(Event)
    if domain:
        query = query.where(Event.domain == domain)
    if severity:
        query = query.where(Event.severity == severity)
    
    query = query.offset(offset).limit(limit).order_by(Event.created_at.desc())
    return session.exec(query).all()

@router.get("/analytics/summary")
def get_analytics(session: Session = Depends(get_session)):
    events = session.exec(select(Event)).all()
    
    total = len(events)
    severity_counts = {
        "CRITICAL": len([e for e in events if e.severity == Severity.CRITICAL]),
        "WARNING": len([e for e in events if e.severity == Severity.WARNING]),
        "INFO": len([e for e in events if e.severity == Severity.INFO]),
    }
    
    return {
        "total_events": total,
        "severity_distribution": severity_counts
    }
