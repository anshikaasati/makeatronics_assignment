from backend.app.infrastructure.intelligence.rule_engine import RuleBasedEngine
from backend.app.domain.models import Category

def test_rules():
    engine = RuleBasedEngine()
    
    test_cases = [
        # Original 12
        ("Temperature sensor in furnace showing erratic readings", Category.ISSUE),
        ("Weekly maintenance completed on conveyor belt 2", Category.EVENT),
        ("Backup logs for database server retrieved at 2 AM", Category.LOG),
        ("Update software on all workstations by Friday", Category.TASK),
        ("Customer complaint about delayed invoice", Category.INCIDENT),
        ("Notes from design review meeting held on 12/12", Category.NOTE),
        ("Unexpected power outage at site B at 3 PM", Category.INCIDENT),
        ("Firmware version 3.1 deployed to all IoT devices", Category.EVENT),
        ("Replace worn-out bearings on motor X by Monday", Category.TASK),
        ("Humidity readings spiked above threshold for 10 minutes", Category.LOG),
        ("Shipment of component Y delayed due to customs", Category.EVENT),
        ("Software crash reported by QA during testing phase", Category.ISSUE),
        
        # New 25
        ("Error 504 encountered on web server", Category.ISSUE),
        ("Team meeting scheduled for Monday 10 AM", Category.EVENT),
        ("CPU temperature log for last 24 hours uploaded", Category.LOG),
        ("Install antivirus update on all laptops today", Category.TASK),
        ("Client escalated complaint about late delivery", Category.INCIDENT),
        ("Meeting notes: discussed project roadmap and milestones", Category.NOTE),
        ("Leak detected in hydraulic system at pump 3", Category.ISSUE),
        ("System rebooted successfully after maintenance window", Category.EVENT),
        ("Change filters in air handling unit by end of week", Category.TASK),
        ("User login attempts exceeded threshold last night", Category.LOG),
        ("Shipment received at warehouse C delayed due to traffic", Category.EVENT),
        ("Server outage reported in region 2 at 4 PM", Category.INCIDENT),
        ("New version of software patch deployed to production", Category.EVENT),
        ("Replace faulty display unit in assembly line 5", Category.TASK),
        ("Daily temperature readings recorded for HVAC system", Category.LOG),
        ("Feedback from client meeting: improve reporting format", Category.NOTE),
        ("Battery level dropping rapidly on IoT sensor X", Category.ISSUE),
        ("Quarterly safety drill completed at plant A", Category.EVENT),
        ("Update employee training records before year-end", Category.TASK),
        ("Error logs indicate failed API calls between 2–3 AM", Category.LOG),
        ("Unexpected water leakage in storage area", Category.INCIDENT),
        ("Notes from supplier meeting: discuss pricing and lead times", Category.NOTE),
        ("Network latency spike observed in data center 1", Category.LOG),
        ("Replace broken conveyor belt roller on line 2", Category.TASK),
        ("Customer service received 10 complaints about shipping delay", Category.INCIDENT),
    ]

    passed = 0
    failed = 0

    with open("failures.txt", "w") as fail_file: 
        for text, expected in test_cases:
            result = engine._detect_category(text.lower())
            if result == expected:
                passed += 1
            else:
                fail_file.write(f"FAIL: '{text}'\nExpected: {expected}, Got: {result}\n\n")
                failed += 1
                
    print(f"\nResults: {passed} Passed, {failed} Failed")

if __name__ == "__main__":
    test_rules()
