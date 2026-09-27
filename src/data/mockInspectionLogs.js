export const MOCK_INSPECTION_LOGS = {
  "blockchainAuditTrail": [
    {
      "blockId": 10842,
      "blockHash": "0x8f7a9c2b4d1e8a3f90124c6e7a5b3d2f1c0e9a8b7d6c5e4f3a2b1c0e9f8a7d6",
      "prevHash": "0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6",
      "timestamp": "2026-09-01 19:45:10 IST",
      "mineName": "MANIKPUR OC (SECL)",
      "inspectorId": "DGMS-NZ-8821 (Shri R. K. Sharma)",
      "actionType": "STATUTORY SECTION 22 NOTICE",
      "severity": "CRITICAL",
      "details": "OBR achievement critically low (0.41%). Non-compliance with mandatory bench height-to-width ratio. Notice issued to stop coal gouging on East Bench #4.",
      "verified": true
    },
    {
      "blockId": 10841,
      "blockHash": "0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6",
      "prevHash": "0x6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5",
      "timestamp": "2026-09-01 18:15:33 IST",
      "mineName": "BLOCK B OC (NCL)",
      "inspectorId": "DGMS-CZ-4109 (Dr. A. Sen)",
      "actionType": "MONSOON PIT INUNDATION AUDIT",
      "severity": "HIGH",
      "details": "Pit sump water level measured at 82%. High-capacity dewatering pump #2 out of commission. Mandated deployment of additional 1000 GPM submersible units within 48h.",
      "verified": true
    },
    {
      "blockId": 10840,
      "blockHash": "0x6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5",
      "prevHash": "0x5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4",
      "timestamp": "2026-09-01 16:30:00 IST",
      "mineName": "BHUBANESWARI OC (MCL)",
      "inspectorId": "MCL-ENV-104 (Er. P. Patnaik)",
      "actionType": "STRIP RATIO ANOMALY AUDIT",
      "severity": "MEDIUM",
      "details": "Over-extraction of bottom seam coal (128.44%) while top soil OBR lagging (69.20%). Re-allocated 4 hydraulic shovels to overburden benches.",
      "verified": true
    },
    {
      "blockId": 10839,
      "blockHash": "0x5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4",
      "prevHash": "0x4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3",
      "timestamp": "2026-09-01 14:10:22 IST",
      "mineName": "JAYANT OC (NCL)",
      "inspectorId": "CIL-AUDIT-901 (Mrs. S. Verma)",
      "actionType": "ROUTINE DGMS SAFETY & DUST COMPLIANCE",
      "severity": "COMPLIANT",
      "details": "All air quality telemetry, water sprinkling cannons, and slope tilt radars verified within safe green bounds. A+ rating confirmed.",
      "verified": true
    }
  ],
  "fieldIncidents": [
    {
      "id": "INC-2026-8901",
      "mineId": 23,
      "mineName": "MANIKPUR OC",
      "subsidiary": "SECL",
      "reporter": "Field Geotechnical Officer",
      "category": "Slope Instability",
      "urgency": "Critical",
      "status": "Investigation Active",
      "timestamp": "2026-09-01 17:30",
      "description": "Tension crack of 4cm width observed on Bench #3 North Wall following continuous rainfall.",
      "lat": 22.3415,
      "lng": 82.7218,
      "correctiveAction": "Restricted heavy vehicle access within 50m radius. Extensometer installed with 1-min interval sync."
    },
    {
      "id": "INC-2026-8898",
      "mineId": 13,
      "mineName": "BLOCK B OC",
      "subsidiary": "NCL",
      "reporter": "Shift Incharge B",
      "category": "Dewatering Sump Overfill",
      "urgency": "High",
      "status": "Corrective Action Assigned",
      "timestamp": "2026-09-01 15:10",
      "description": "Sump 4 overflow risk due to diesel generator tripping during peak monsoon rain.",
      "lat": 24.1685,
      "lng": 82.5515,
      "correctiveAction": "Backup diesel genset mobilized and auxiliary dewatering pipe connected."
    },
    {
      "id": "INC-2026-8892",
      "mineId": 3,
      "mineName": "AMALGAMATED NTST KUJAMA OCP",
      "subsidiary": "BCCL",
      "reporter": "Safety Steward",
      "category": "Fire Seam Oxidation / Fume",
      "urgency": "Medium",
      "status": "Mitigated",
      "timestamp": "2026-09-01 11:20",
      "description": "Slight smoke haze observed near old unworked outcrop seam section X.",
      "lat": 23.7845,
      "lng": 86.4178,
      "correctiveAction": "Water blanket infusion applied and clay blanketing completed."
    }
  ]
};
