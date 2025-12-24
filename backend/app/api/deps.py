from ..infrastructure.intelligence.rule_engine import RuleBasedEngine
from ..domain.interfaces import IIntelligenceEngine

# In a real DI framework (like taskiq-dependencies or fast-depends), we would bind this.
# For now, we manually instantiate it as a singleton.

def get_intelligence_engine() -> IIntelligenceEngine:
    return RuleBasedEngine()
