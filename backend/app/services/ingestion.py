from datetime import datetime
from sqlmodel import Session
from ..domain.models import Event
from ..domain.schemas import EventCreate
from ..domain.interfaces import IIntelligenceEngine

class IngestionService:
    def __init__(self, session: Session, engine: IIntelligenceEngine):
        self.session = session
        self.engine = engine

    def ingest(self, event_in: EventCreate) -> Event:
        # 1. Create Event object from DTO
        event = Event.from_orm(event_in)
        
        # 2. Run signals processing via abstraction
        signals = self.engine.process(event.raw_content)
        
        # 3. Apply signals
        if event.severity == "UNKNOWN":
            event.severity = signals["severity"]
            
        if event.domain == "general":
            event.domain = signals["domain"]
            
        existing_tags = set(event.tags) if event.tags else set()
        new_tags = set(signals["tags"])
        event.tags = list(existing_tags.union(new_tags))
        
        event.is_processed = True
        event.processed_at = datetime.utcnow()
        
        # 4. Save
        self.session.add(event)
        self.session.commit()
        self.session.refresh(event)
        return event
