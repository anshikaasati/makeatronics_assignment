from backend.app.infrastructure.intelligence.rule_engine import RuleBasedEngine
from backend.app.domain.models import Category

def test_rules():
    engine = RuleBasedEngine()
    
    test_cases = [
        # User Provided 50 Examples
        ("Motor overheating after 3 hours", Category.ISSUE),
        ("PCB board version 2 failed QA", Category.INCIDENT),
        ("Delay in shipment from vendor X", Category.EVENT),
        ("Voltage drop observed at node A", Category.LOG),
        ("Prepare report for last quarter sales", Category.TASK),
        ("Meeting notes from project kickoff", Category.NOTE),
        ("Server CPU usage spiked to 95% yesterday", Category.LOG),
        ("Customer reported software crash when saving file", Category.ISSUE),
        ("Order 4521 shipped to warehouse B", Category.EVENT),
        ("Replace faulty sensor on assembly line 3", Category.TASK),
        ("Backup logs for database server retrieved at 2 AM", Category.LOG),
        ("Weekly maintenance completed on conveyor belt 2", Category.EVENT),
        ("Client escalated complaint about late delivery", Category.INCIDENT),
        ("Install antivirus update on all laptops today", Category.TASK),
        ("Notes from design review meeting held on 12/12", Category.NOTE),
        ("Leak detected in hydraulic system at pump 3", Category.ISSUE),
        ("System rebooted successfully after maintenance window", Category.EVENT),
        ("Change filters in air handling unit by end of week", Category.TASK),
        ("User login attempts exceeded threshold last night", Category.LOG),
        ("Server outage reported in region 2 at 4 PM", Category.INCIDENT),
        ("New version of software patch deployed to production", Category.EVENT),
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
        ("Smoke detected in sector 4 of the factory", Category.INCIDENT),
        ("Replace worn-out gasket on compressor by Tuesday", Category.TASK),
        ("Unexpected drop in network bandwidth this morning", Category.ISSUE),
        ("Daily server uptime recorded at 99.9%", Category.LOG),
        ("Team completed monthly safety audit", Category.EVENT),
        ("Meeting notes: discussed client feedback and next steps", Category.NOTE),
        ("Temperature sensor at node B failed calibration test", Category.ISSUE),
        ("Firmware update scheduled for all IoT devices next week", Category.EVENT),
        ("Archive old logs before end of month", Category.TASK),
        ("Network error codes recorded in last 24 hours", Category.LOG),
        ("Client reported broken screen on new tablet", Category.ISSUE),
        ("Power outage at site C lasted 3 hours", Category.INCIDENT),
        ("Quarterly financial review meeting completed", Category.EVENT),
        ("Replace expired chemicals in lab storage", Category.TASK),
        ("Temperature logs indicate spike during afternoon shift", Category.LOG),
        ("Notes from internal audit: suggest improvements to workflow", Category.NOTE),
        ("Unexpected vibration detected in motor X", Category.ISSUE),
        ("New shipment of raw materials received at warehouse B", Category.EVENT),
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
