from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel, Field, JSON
from enum import Enum
import uuid

class Severity(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    CRITICAL = "CRITICAL"
    UNKNOWN = "UNKNOWN"

class Category(str, Enum):
    ISSUE = "ISSUE"
    INCIDENT = "INCIDENT"
    EVENT = "EVENT"
    LOG = "LOG"
    TASK = "TASK"
    NOTE = "NOTE"
    UNKNOWN = "UNKNOWN"

class EventBase(SQLModel):
    raw_content: str
    source: Optional[str] = "manual"
    domain: Optional[str] = "general"
    severity: Severity = Severity.UNKNOWN
    category: Category = Category.UNKNOWN
    tags: List[str] = Field(default=[], sa_type=JSON)
    metadata_fields: dict = Field(default={}, sa_type=JSON)
    is_processed: bool = False

class Event(EventBase, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    processed_at: Optional[datetime] = None
