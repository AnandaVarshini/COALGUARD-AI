// AI Multi-Factor Risk Scoring and Anomaly Detection Engine
export function calculateMineRisk(mine) {
  const prodGap = Math.max(0, 100 - mine.achievement);
  const obrGap = Math.max(0, 100 - mine.obrAchievement);
  
  let gasFactor = 0;
  if (mine.telemetry.ch4 > 0.2) gasFactor += (mine.telemetry.ch4 - 0.2) * 200;
  if (mine.telemetry.co > 5.0) gasFactor += (mine.telemetry.co - 5.0) * 8;
  gasFactor = Math.min(100, gasFactor);

  let geoFactor = 0;
  if (mine.telemetry.slopeTiltRate > 0.5) geoFactor += (mine.telemetry.slopeTiltRate - 0.5) * 45;
  if (mine.telemetry.waterSumpLevel > 60) geoFactor += (mine.telemetry.waterSumpLevel - 60) * 1.5;
  geoFactor = Math.min(100, geoFactor);

  const dgmsPenalties = { 'A+': 5, 'A': 15, 'B': 40, 'C': 75, 'C-': 95 };
  const dgmsFactor = dgmsPenalties[mine.telemetry.dgmsRating] || 30;

  const compositeScore = Math.round(
    (prodGap * 0.25) +
    (obrGap * 0.30) +
    (gasFactor * 0.18) +
    (geoFactor * 0.17) +
    (dgmsFactor * 0.10)
  );

  const clampedScore = Math.min(99, Math.max(5, compositeScore));

  let riskTier = 'Low';
  let badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  let pinColor = '#22c55e';
  let actionPriority = 'Routine Safety Monitoring';

  if (clampedScore >= 75 || mine.achievement < 50 || mine.obrAchievement < 35) {
    riskTier = 'Critical';
    badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse';
    pinColor = '#ef4444';
    actionPriority = 'Immediate DGMS Section 22 Intervention and Pit Floor Halt';
  } else if (clampedScore >= 45 || mine.achievement < 80 || mine.obrAchievement < 70) {
    riskTier = 'High';
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    pinColor = '#f97316';
    actionPriority = 'High-Priority Technical Audit and Fleet Rebalancing';
  } else if (clampedScore >= 25 || mine.achievement < 100 || mine.obrAchievement < 90) {
    riskTier = 'Moderate';
    badgeColor = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    pinColor = '#eab308';
    actionPriority = 'Standard Compliance Audit and Rake Logistics Optimization';
  }

  return {
    score: clampedScore,
    riskTier,
    badgeColor,
    pinColor,
    actionPriority,
    factors: {
      prodGap: Math.round(prodGap),
      obrGap: Math.round(obrGap),
      gasFactor: Math.round(gasFactor),
      geoFactor: Math.round(geoFactor),
      dgmsFactor
    }
  };
}

export function getRiskSummary(mines) {
  let critical = 0;
  let high = 0;
  let moderate = 0;
  let low = 0;

  mines.forEach(m => {
    const r = calculateMineRisk(m);
    if (r.riskTier === 'Critical') critical++;
    else if (r.riskTier === 'High') high++;
    else if (r.riskTier === 'Moderate') moderate++;
    else low++;
  });

  return { critical, high, moderate, low, total: mines.length };
}
