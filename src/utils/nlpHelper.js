import { TOP_35_MINES, SUBSIDIARY_PRODUCTION, EXCHEQUER_PAYMENTS, RAKE_LOADING_DATA } from '../data/coalMinesDataset';
import { calculateMineRisk } from './riskEngine';
import { DGMS_REGULATIONS } from '../data/dgmsRegulations';

export function processUserQuery(query, language = 'en') {
  const q = query.trim().toLowerCase();

  // 1. Specific Mine Inquiries
  for (const mine of TOP_35_MINES) {
    const cleanName = mine.name.toLowerCase().replace(/ (oc|ug)/g, '');
    if (q.includes(cleanName) || q.includes(mine.name.toLowerCase())) {
      const risk = calculateMineRisk(mine);
      return {
        reply: `**${mine.name} (${mine.subsidiary}) Status Summary:**\n\n` +
          `• **Location**: ${mine.district}, ${mine.state}\n` +
          `• **July 2026 Production**: ${mine.actualJuly} MT against target ${mine.targetJuly} MT (${mine.achievement}% achievement)\n` +
          `• **OBR Achievement**: ${mine.obrAchievement}% (${mine.obrActualJuly} M.Cum vs target ${mine.obrTargetUptoJuly} M.Cum)\n` +
          `• **Calculated Risk Level**: ${risk.riskTier} (${risk.score}/100)\n` +
          `• **IoT Telemetry**: CH₄ Methane: ${mine.telemetry.ch4}% | CO: ${mine.telemetry.co} ppm | Highwall Slope Velocity: ${mine.telemetry.slopeTiltRate} mm/h | Sump: ${mine.telemetry.waterSumpLevel}%\n` +
          `• **AI Diagnostic**: ${mine.aiDiagnostic}\n\n` +
          `*Recommended Technical Action*: ${risk.actionPriority}`,
        chips: [
          `Log hazard at ${mine.name}`,
          `Show ${mine.subsidiary} statistics`,
          `How to improve OBR for ${mine.name}`
        ]
      };
    }
  }

  // 2. Critical & Deficit Mines lookup
  if (q.includes('risk') || q.includes('critical') || q.includes('danger') || q.includes('problem') || q.includes('deficit')) {
    const criticals = TOP_35_MINES.filter(m => calculateMineRisk(m).riskTier === 'Critical');
    const highs = TOP_35_MINES.filter(m => calculateMineRisk(m).riskTier === 'High');
    return {
      reply: `**AI Risk Observatory - Flagged Vulnerabilities (July 2026):**\n\n` +
        `🚨 **Critical Failure Mines (${criticals.length})**:\n` +
        criticals.map(m => `• **${m.name}** (${m.subsidiary}): ${m.achievement}% Prod | ${m.obrAchievement}% OBR - *${calculateMineRisk(m).actionPriority}*`).join('\n') +
        `\n\n⚠️ **High Risk Mines (${highs.length})**:\n` +
        highs.slice(0, 4).map(m => `• **${m.name}** (${m.subsidiary}): ${m.achievement}% Prod | ${m.obrAchievement}% OBR`).join('\n') +
        `\n\n*All flagged operations require active DGMS Chapter X geotechnical compliance.*`,
      chips: [
        'Why is Manikpur OBR only 0.41%?',
        'Tell me about Block B OC water inundation',
        'Show DGMS slope stability guidelines'
      ]
    };
  }

  // 3. Safety & DGMS Regulations
  if (q.includes('dgms') || q.includes('rule') || q.includes('gas') || q.includes('methane') || q.includes('carbon monoxide') || q.includes('blasting') || q.includes('slope')) {
    return {
      reply: `**DGMS Coal Mines Regulations (CMR 2017) Safety Standards:**\n\n` +
        `• **Methane (CH₄)**: Maximum permissible limit is **0.5%** in general body of air and **1.25%** for electric equipment shutdown.\n` +
        `• **Carbon Monoxide (CO)**: Threshold limit value (TLV) is **10 ppm** (8-hr TWA) and short-term ceiling is **25 ppm**.\n` +
        `• **Highwall Slope Stability**: Bench slope radar velocity must remain below **1.0 mm/hr**. Daily LiDAR drone audits mandatory.\n` +
        `• **Blasting Safety Zone**: 500-meter danger zone must be evacuated, guarded by sentries with dual siren protocols.\n` +
        `• **Worker Shifts**: Maximum 8 hours per shift; continuous hydration and biometric fatigue monitoring enforced.`,
      chips: [
        'What is Section 22 notice?',
        'How often should LiDAR scan run?',
        'Permissible dust PM10 limit'
      ]
    };
  }

  // 4. Production & Statistics
  if (q.includes('production') || q.includes('total') || q.includes('target') || q.includes('mt') || q.includes('how much coal')) {
    const grandTotal = SUBSIDIARY_PRODUCTION.find(s => s.subs === 'Grand Total India') || { fy27Actual: 69.82, monthlyTarget: 57.40, achmt: 121.63, momGrowth: 7.61 };
    const cilTotal = SUBSIDIARY_PRODUCTION.find(s => s.subs === 'CIL Total') || { fy27Actual: 50.34, monthlyTarget: 53.73, achmt: 93.69 };
    return {
      reply: `**National Coal Production Statistics (July 2026 Provisional):**\n\n` +
        `• **All-India Total Coal Production**: **${grandTotal.fy27Actual} MT** against target ${grandTotal.monthlyTarget} MT (**${grandTotal.achmt}% achievement**, +${grandTotal.momGrowth}% MoM growth)\n` +
        `• **Coal India Limited (CIL)**: **${cilTotal.fy27Actual} MT** against target ${cilTotal.monthlyTarget} MT (${cilTotal.achmt}% achievement)\n` +
        `• **Top Subsidiary Producer**: SECL at 12.06 MT, followed by MCL at 11.23 MT and NCL at 10.02 MT\n` +
        `• **Highest Growth Subsidiary**: WCL (+24.96% YoY growth, 102.73% achievement)`,
      chips: [
        'Show Rake loading statistics',
        'Show State revenue and royalty',
        'Show Coking coal production'
      ]
    };
  }

  // 5. Rakes & Logistics
  if (q.includes('rake') || q.includes('rail') || q.includes('logistics') || q.includes('dispatch') || q.includes('transport')) {
    const totalRakes = RAKE_LOADING_DATA.find(r => r.company.includes('Total')) || { actualAll: 314.3, planAll: 373.0, achmtAll: 84.30, actualPower: 287.4 };
    return {
      reply: `**Coal Offtake & Daily Rake Loading (July 2026):**\n\n` +
        `• **All-India Daily Loading**: **${totalRakes.actualAll} rakes/day** loaded against plan of ${totalRakes.planAll} rakes/day (**${totalRakes.achmtAll}% achievement**)\n` +
        `• **Power Sector Priority Loading**: **${totalRakes.actualPower} rakes/day** dispatched to thermal power stations\n` +
        `• **Modewise Dispatch Share**: Rail: 56.65% (36.21 MT), Road: 30.05% (19.21 MT), MGR Conveyor: 12.45% (7.96 MT)\n` +
        `• **SECL Performance Alert**: Loaded 49 rakes/day vs 65 planned (75.38%) due to SECR railway line track maintenance.`,
      chips: [
        'Which subsidiary has lowest rakes?',
        'Show POSOCO power generation mix',
        'Show Offtake to power sector'
      ]
    };
  }

  // 6. Taxes & Exchequer
  if (q.includes('tax') || q.includes('royalty') || q.includes('exchequer') || q.includes('revenue') || q.includes('dmf') || q.includes('money')) {
    return {
      reply: `**Central & State Exchequer Levies (July 2026):**\n\n` +
        `• **Total Payments Made**: **₹${EXCHEQUER_PAYMENTS.totalPaidJuly26.toLocaleString()} Crore**\n` +
        `• **Royalty on Coal**: ₹1,418.90 Cr (37.04%)\n` +
        `• **GST & Compensation Cess**: ₹1,348.60 Cr (35.21%)\n` +
        `• **District Mineral Foundation (DMF)**: ₹422.15 Cr (11.02%)\n` +
        `• **Top State Beneficiaries**: Jharkhand (₹1,798.39 Cr / 46.95%), Madhya Pradesh (₹491.45 Cr / 12.83%), Chhattisgarh (₹434.00 Cr / 11.33%), Odisha (₹386.88 Cr / 10.10%).`,
      chips: [
        'What is District Mineral Foundation?',
        'Show total production in July',
        'List top 5 risk mines'
      ]
    };
  }

  // Default Greeting / Help
  const greetings = {
    hi: 'नमस्ते! मैं खान-साथी (CoalMitra AI) हूँ। आप मुझसे कोयला खदानों की सुरक्षा, डीजीएमएस नियम (CMR 2017), गैस सीमा, मानिकपुर/ब्लॉक बी खदान की स्थिति या उत्पादन आंकड़ों के बारे में पूछ सकते हैं।',
    en: 'Greetings! I am CoalMitra AI, your Mining Safety, Governance & Compliance Assistant. Ask me about DGMS CMR 2017 rules, gas thresholds, July 2026 coal statistics, or specific mine risk diagnostics (e.g. Manikpur OC, Block B OC).'
  };

  return {
    reply: greetings[language] || greetings.en,
    chips: [
      'Show critical risk coal mines',
      'Explain Manikpur OC 0.41% OBR deficit',
      'What are DGMS methane and CO limits?',
      'Show July 2026 coal production totals'
    ]
  };
}
