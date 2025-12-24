from .models import EventBase
from sqlmodel import SQLModel
from datetime import datetime
import uuid
from typing import Optional

class EventCreate(EventBase):
    pass

class EventRead(EventBase):
    id: uuid.UUID
    created_at: datetime
    processed_at: Optional[datetime]
