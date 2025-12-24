from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List, Optional
from ..database import get_session
from ..models import Event, EventCreate, EventRead, Severity
from ..services import ingest_event

router = APIRouter()

@router.post("/ingest", response_model=EventRead)
def ingest_data(event: EventCreate, session: Session = Depends(get_session)):
    """
    Ingest raw operational text. The system will automatically classify complexity,
    domain, and tags.
    """
    return ingest_event(session, event)

@router.get("/events", response_model=List[EventRead])
def list_events(
    session: Session = Depends(get_session),
    limit: int = 100,
    offset: int = 0,
    domain: Optional[str] = None,
    severity: Optional[Severity] = None
):
    """
    List events with filtering.
    """
    query = select(Event)
    if domain:
        query = query.where(Event.domain == domain)
    if severity:
        query = query.where(Event.severity == severity)
    
    query = query.offset(offset).limit(limit).order_by(Event.created_at.desc())
    return session.exec(query).all()

@router.get("/analytics/summary")
def get_analytics(session: Session = Depends(get_session)):
    """
    Get basic stats for the dashboard.
    """
    # This is a basic implementation. For production, use cleaner aggregation queries.
    events = session.exec(select(Event)).all()
    
    total = len(events)
    severity_counts = {
        "CRITICAL": len([e for e in events if e.severity == Severity.CRITICAL]),
        "WARNING": len([e for e in events if e.severity == Severity.WARNING]),
        "INFO": len([e for e in events if e.severity == Severity.INFO]),
    }
    
    # Recent activity
    # domain_counts ...
    
    return {
        "total_events": total,
        "severity_distribution": severity_counts
    }
