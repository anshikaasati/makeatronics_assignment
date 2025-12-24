from abc import ABC, abstractmethod
from typing import Dict, List, Any
from .models import Severity

class IIntelligenceEngine(ABC):
    """
    Abstract Interface for the Intelligence Engine.
    This allows us to swap the RuleBased engine for an LLM engine later
    without changing the Service layer.
    """
    
    @abstractmethod
    def process(self, text: str) -> Dict[str, Any]:
        """
        Analyzes text and returns structured signals:
        {
            "severity": Severity,
            "domain": str,
            "tags": List[str]
        }
        """
        pass
