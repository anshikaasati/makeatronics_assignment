from typing import List, Dict, Any
from ...domain.interfaces import IIntelligenceEngine
from ...domain.models import Severity, Category

class RuleBasedEngine(IIntelligenceEngine):
    """
    Concrete implementation of IIntelligenceEngine using deterministic rules.
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

        # Category Mapping
        self.category_rules = {
            Category.ISSUE: ["issue", "problem", "broken", "bug", "crash", "error", "fail", "glitch"],
            Category.INCIDENT: ["incident", "accident", "breach", "fire", "explosion", "collision"],
            Category.TASK: ["task", "todo", "action", "prepare", "submit", "review", "replace", "check"],
            Category.LOG: ["log", "metric", "usage", "cpu", "memory", "voltage", "temp", "observed"],
            Category.EVENT: ["event", "shipment", "delivery", "arrival", "meeting", "kickoff", "deployment"],
            Category.NOTE: ["note", "memo", "reminder", "update", "comment"]
        }

    def process(self, text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        
        severity = self._detect_severity(text_lower)
        domain = self._detect_domain(text_lower)
        category = self._detect_category(text_lower)
        tags = self._extract_tags(text_lower)
        
        return {
            "severity": severity,
            "domain": domain,
            "category": category,
            "tags": tags
        }

    def _detect_severity(self, text: str) -> Severity:
        for sev, keywords in self.severity_rules.items():
            if any(k in text for k in keywords):
                return sev
        return Severity.INFO

    def _detect_domain(self, text: str) -> str:
        for domain, keywords in self.domain_rules.items():
            if any(k in text for k in keywords):
                return domain
        return "General"

    def _detect_category(self, text: str) -> Category:
        """
        Detects category based on hierarchical priority:
        1. INCIDENT (Critical/Security)
        2. TASK (Strong Verbs - Replace, Install, Change) - Overrides Issue (e.g. "Replace faulty")
        3. LOG_STRONG ("Error logs") - Overrides Issue
        4. ISSUE (Functional Failure)
        5. EVENT (Completed Actions/Logistics) - check 'completed' before 'task'
        6. LOG (Data/Metrics)
        7. NOTE (Specific informational types)
        8. TASK (General/Ambiguous - Update, Prepare)
        9. EVENT (General)
        """
        
        # 1. INCIDENT
        if any(k in text for k in ["incident", "accident", "breach", "fire", "explosion", "collision", "outage", "complaint", "emergency", "leakage", "smoke"]):
            return Category.INCIDENT
            
        # 1.1 INCIDENT (Contextual)
        if "unexpected leak" in text or "failed qa" in text:
            return Category.INCIDENT

        # 2. TASK (High Priority - Overrides Issue)
        if any(k in text for k in ["replace", "install", "change", "archive"]):
            return Category.TASK

        # 3. LOG (Strong overrides for specific phrases)
        if any(k in text for k in ["error log", "system log", "access log", "audit log", "error codes", "drop observed"]):
            return Category.LOG

        # 4. ISSUE
        if any(k in text for k in ["issue", "problem", "broken", "bug", "crash", "error", "fail", "glitch", "erratic", "overheat", "unstable", "down", "critical", "leak", "dropping", "504", "faulty", "vibration", "calibration", "drop"]):
            return Category.ISSUE

        # 5. EVENT (Specific status overrides that imply completion/scheduling)
        if any(k in text for k in ["completed", "deployed", "shipped", "arrived", "finished", "rebooted", "received", "scheduled"]):
             return Category.EVENT

        # 6. LOG
        if any(k in text for k in ["log", "metric", "usage", "cpu", "memory", "voltage", "temp", "readings", "observed", "retrieved", "spiked", "threshold", "data", "attempts", "latency", "uptime", "codes", "levels"]):
            return Category.LOG

        # 7. NOTE (Removed 'minutes' and 'update' to avoid ambiguity)
        if any(k in text for k in ["note", "memo", "reminder", "comment", "agenda", "feedback"]):
            return Category.NOTE

        # 8. TASK (Low Priority)
        if any(k in text for k in ["task", "todo", "action", "prepare", "submit", "review", "check", "update", "verify", "deadline", "training"]):
            return Category.TASK

        # 9. EVENT (General fallbacks)
        if any(k in text for k in ["event", "shipment", "delivery", "arrival", "meeting", "kickoff", "deployment", "maintenance", "vendor", "drill", "version", "patch"]):
            return Category.EVENT

        return Category.NOTE # Default

    def _extract_tags(self, text: str) -> List[str]:
        found_tags = []
        all_keywords = [k for rules in self.domain_rules.values() for k in rules]
        for k in all_keywords:
            if k in text:
                found_tags.append(k)
        return list(set(found_tags))
