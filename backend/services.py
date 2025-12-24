from datetime import datetime
from sqlmodel import Session
from .models import Event, EventCreate, EventRead
from .processor import engine as intelligence_engine

def ingest_event(session: Session, event_in: EventCreate) -> Event:
    """
    Ingests a raw event, runs intelligence processing, and saves it.
    """
    # 1. Create Event object
    event = Event.from_orm(event_in)
    
    # 2. Run signals processing
    signals = intelligence_engine.process(event.raw_content)
    
    # 3. Apply signals
    if event.severity == "UNKNOWN": # Only override if not provided
        event.severity = signals["severity"]
        
    if event.domain == "general": # Only override if default
        event.domain = signals["domain"]
        
    # Merge existing tags with found tags
    existing_tags = set(event.tags) if event.tags else set()
    new_tags = set(signals["tags"])
    event.tags = list(existing_tags.union(new_tags))
    
    event.is_processed = True
    event.processed_at = datetime.utcnow()
    
    # 4. Save
    session.add(event)
    session.commit()
    session.refresh(event)
    return event
