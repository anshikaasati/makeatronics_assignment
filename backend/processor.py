import re
from typing import Tuple, List, Dict
from .models import Severity

class IntelligenceEngine:
    """
    Deterministic rule-based engine to classify operational data.
    """

    def __init__(self):
        # Keyword-based Severity Mapping
        self.severity_rules = {
            Severity.CRITICAL: ["failed", "failure", "crash", "overheat", "explosion", "emergency", "fatal", "down"],
            Severity.WARNING: ["delay", "slow", "retry", "warn", "high", "drop", "unstable"],
            Severity.INFO: ["note", "update", "meeting", "check", "log", "start", "end"]
        }

        # Domain Keyword Mapping
        self.domain_rules = {
            "Hardware": ["motor", "pcb", "board", "voltage", "current", "sensor", "battery", "disk"],
            "Network": ["connection", "latency", "wifi", "ethernet", "api", "timeout", "500", "404"],
            "Logistics": ["shipment", "vendor", "delivery", "stock", "warehouse", "order"],
            "Human": ["meeting", "qa", "review", "email", "ticket"]
        }

    def process(self, text: str) -> Dict:
        """
        Analyzes text and returns structured signals.
        """
        text_lower = text.lower()
        
        severity = self._detect_severity(text_lower)
        domain = self._detect_domain(text_lower)
        tags = self._extract_tags(text_lower)
        
        return {
            "severity": severity,
            "domain": domain,
            "tags": tags,
            "processed_at": None # To be filled by caller
        }

    def _detect_severity(self, text: str) -> Severity:
        for sev, keywords in self.severity_rules.items():
            if any(k in text for k in keywords):
                return sev
        return Severity.INFO # Default to INFO

    def _detect_domain(self, text: str) -> str:
        for domain, keywords in self.domain_rules.items():
            if any(k in text for k in keywords):
                return domain
        return "General"

    def _extract_tags(self, text: str) -> List[str]:
        # Simple extraction of capitalized words or hashtag-like tokens in future
        # For now, just extracting known keywords as tags
        found_tags = []
        all_keywords = [k for rules in self.domain_rules.values() for k in rules]
        for k in all_keywords:
            if k in text:
                found_tags.append(k)
        return list(set(found_tags))

engine = IntelligenceEngine()
