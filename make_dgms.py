import json

dgms_data = {
    gasThresholds: [
        {
            gas: Methane (CH4),
            formula: CH4,
            safeRange: < 0.5%,
            warningLimit: 0.75%,
            dangerLimit: 1.25%,
            actionAtDanger: Immediately cut electrical power (CMR Reg 169), withdraw all persons from return airway and notify Mine Manager & Safety Officer.
        },
        {
            gas: Carbon Monoxide (CO),
            formula: CO,
            safeRange: < 10 ppm,
            warningLimit: 25 ppm,
            dangerLimit: 50 ppm,
            actionAtDanger: Indicates spontaneous combustion or fire seam oxidation. Evacuate section, seal air stoppings, activate N2 injection.
        },
        {
            gas: Oxygen (O2),
            formula: O2,
            safeRange: > 19.5%,
            warningLimit: < 19.0%,
            dangerLimit: < 16.0%,
            actionAtDanger: Asphyxiation danger. Wear self-contained self-rescuer (SCSR) immediately and retreat to fresh air intake.
        },
        {
            gas: Airborne Respirable Dust (PM10),
            formula: PM10,
            safeRange: < 3 mg/m3 (8-hr TWA),
            warningLimit: 2.0 mg/m3,
            dangerLimit: > 3.0 mg/m3,
            actionAtDanger: Activate high-pressure water mist cannons and wet drilling nozzles; mandatory N95 / FFP3 dust respirators.
        }
    ],
    slopeSafety: {
        maxBenchHeight: 10 to 12 meters in soil/alluvium; up to 15 meters in consolidated sandstone,
        benchWidthRule: Width must never be less than bench height plus shovel tail swing clearance (Minimum 12m),
        overallPitSlope: Maximum 38 deg to 42 deg depending on geotechnical pore water pressure index,
        criticalTiltWarning: > 1.5 mm/hr continuous movement on radar/extensometer demands immediate evacuation of pit floor.
    },
    blastingProtocols: {
        dangerZoneRadius: 500 meters all around blast hole perimeter,
        warningSirenSequence: 1st Siren (10 mins before blast): 3 long blasts. 2nd Siren (2 mins before): 2 intermittent blasts. All-Clear Siren: 1 continuous long blast.,
        flyRockControl: Use of heavy conveyor-belt blast mats, controlled electronic nonel detonators, and strict face profiling.
    },
    welfareAndHours: {
        maxWeeklyHours: 48 hours per week (Section 28, Mines Act 1952),
        dailyShiftLimit: Max 8 hours per shift; underground max 8 hours,
        heatStressRule: Wet Bulb Globe Temperature (WBGT) > 30.5 deg C requires mandatory 15-min rest in cooled refuge shelter per hour with electrolyte hydration.
    },
    faqKnowledgeBase: [
        {
            keywords: [methane, gas, ch4, gas leak, gases],
            category: Gas Safety,
            q: What is the statutory threshold for Methane (CH4) in coal mines?,
            answer: Under Coal Mines Regulations (CMR) 2017 Reg 169, general air should contain NOT more than 0.5% Methane. If Methane exceeds 0.75% in the return airway or 1.25% anywhere in the workings, electrical power MUST be cut immediately and all workers evacuated to fresh air intake.
        },
        {
            keywords: [ppe, helmet, boots, jacket, protective gear],
            category: Personal Protection,
            q: What mandatory PPE is required before entering the coal mine pit or face?,
            answer: Under DGMS Safety Directive: (1) DGMS-certified safety helmet with chin strap, (2) Steel-toed safety boots with anti-slip soles, (3) High-visibility fluorescent reflective jacket (Class 3), (4) Ear muffs/plugs for noise > 85 dB, (5) Dust respirator (PM10 filter), (6) Auto-locking cap lamp and SCSR for underground seams.
        },
        {
            keywords: [blasting, danger zone, explosive, siren, detonator],
            category: Blasting SOP,
            q: What is the safety clearance radius during opencast blasting?,
            answer: Under CMR Reg 170, a minimum 500-meter danger zone must be evacuated in all directions. All machinery must be moved beyond 300m, red danger flags placed at all access roads with sentries posted, and the 3-stage warning siren followed.
        },
        {
            keywords: [slope, landslide, highwall, crack, collapse, tilt],
            category: Geotechnical Safety,
            q: What indicates highwall slope instability in opencast mines?,
            answer: Tension cracks on top bench surface, rock dislodgement, water seepage along shear planes, or slope tilt rate exceeding 1.0 mm/hr on Real-Time Radar monitoring. If detected, sound the alarm and withdraw excavators/dumpers immediately.
        },
        {
            keywords: [grievance, complaint, reporting, hazard, unsafe],
            category: Worker Rights,
            q: How can a worker file an anonymous safety grievance or hazardous observation?,
            answer: Workers can submit immediate geo-tagged hazard alerts via this Coal-Vault AI Portal under Field Incident / Grievance Reporter, or directly contact the Pit Safety Committee under Section 22 of Mines Act 1952.
        },
        {
            keywords: [manikpur, manikpur risk, manikpur ubr, manikpur problem],
            category: Operational Alert,
            q: What is the critical risk factor at Manikpur OC mine?,
            answer: Manikpur OC has an alarming Overburden Removal (OBR) achievement of only 0.41% (0.01 M.Cum vs 2.46 M.Cum target). While current production is 104.24%, mining without stripping overburden creates severe highwall slope failure and landslide hazard.
        },
        {
            keywords: [block b, block b oc, block b deficit],
            category: Operational Alert,
            q: What is causing the production crisis at Block B OC mine?,
            answer: Block B OC achieved only 30.85% of its July target (0.87 MT vs 2.82 MT). AI root-cause diagnostic identifies legal stay on West Face land acquisition combined with 82% pit sump inundation.
        },
        {
            keywords: [exchequer, tax, royalty, dmf, revenue],
            category: Governance & Finance,
            q: What were the total statutory payments made to the Government in July 2026?,
            answer: In July 2026, Coal India paid a total of Rs 3,830.45 Crore to Central and State exchequers, including Rs 1,418.38 Cr in Royalty, Rs 422.15 Cr in District Mineral Foundation (DMF), and Rs 314.16 Cr in CGST. Jharkhand received the largest state share at 46.95% (Rs 1,798.34 Cr).
        }
    ]
}

with open(src/data/dgmsRegulations.js, w, encoding=utf-8) as f:
    f.write(export const DGMS_SAFETY_GUIDELINES =  + json.dumps(dgms_data, indent=2) + ;\n)

print(Created src/data/dgmsRegulations.js successfully!)
