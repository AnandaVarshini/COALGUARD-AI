import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Pickaxe, 
  Wind, 
  Droplets, 
  Activity, 
  Users, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';
import { calculateMineRisk } from '../utils/riskEngine';

export default function MineDetailModal({ mine, onClose, onOpenIncident }) {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [scanSimulating, setScanSimulating] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  if (!mine) return null;

  const risk = calculateMineRisk(mine);

  const handleRunLidarScan = () => {
    setScanSimulating(true);
    setTimeout(() => {
      setScanSimulating(false);
      setScanResult({
        timestamp: new Date().toLocaleTimeString(),
        benchStability: mine.obrAchievement < 50 ? 'UNSTABLE - HIGHWALL CRACK DETECTED' : 'STABLE BENCH PROFILE',
        voidRatio: (mine.obrAchievement / 100 * 2.8).toFixed(2),
        estimatedReserve: `${(mine.annualTarget * 3.4).toFixed(1)} MT Exposed`
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Pickaxe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-2xl font-tech font-bold tracking-wide text-white">{mine.name}</h2>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-amber-400 border border-amber-500/30">
                  {mine.subsidiary}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${risk.badgeColor}`}>
                  {risk.riskTier} Risk ({risk.score}/100)
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{mine.district}, {mine.state} • GPS: {mine.lat.toFixed(4)}°N, {mine.lng.toFixed(4)}°E • Type: {mine.type} ({mine.mineral})</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 my-4 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'telemetry'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-tech'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live IoT Telemetry & Sensors
          </button>
          <button
            onClick={() => setActiveTab('production')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'production'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-tech'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Production & OBR Balance
          </button>
          <button
            onClick={() => setActiveTab('aiDiagnostic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'aiDiagnostic'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-tech'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Geotechnical Diagnostics
          </button>
        </div>

        {/* Tab 1: Live IoT Telemetry Grid */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              {/* Methane CH4 */}
              <div className={`p-3.5 rounded-xl border ${
                mine.telemetry.ch4 > 0.2 ? 'bg-rose-950/30 border-rose-500/40' : 'bg-slate-800/60 border-slate-700'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Wind className="w-3.5 h-3.5 text-sky-400" /> Methane (CH₄)
                  </span>
                  <span className="text-[10px] font-mono">Limit: &lt;0.5%</span>
                </div>
                <div className="text-xl font-tech font-bold text-white flex items-baseline gap-1">
                  {mine.telemetry.ch4}%
                  <span className={`text-[10px] font-mono ${mine.telemetry.ch4 > 0.2 ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                    {mine.telemetry.ch4 > 0.2 ? '⚠️ ELEVATED' : '✓ NORMAL'}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className={`h-full ${mine.telemetry.ch4 > 0.2 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${Math.min(100, (mine.telemetry.ch4 / 0.5) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Carbon Monoxide CO */}
              <div className={`p-3.5 rounded-xl border ${
                mine.telemetry.co > 5 ? 'bg-amber-950/30 border-amber-500/40' : 'bg-slate-800/60 border-slate-700'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Flame className="w-3.5 h-3.5 text-amber-400" /> Carbon Monoxide (CO)
                  </span>
                  <span className="text-[10px] font-mono">Limit: &lt;10 ppm</span>
                </div>
                <div className="text-xl font-tech font-bold text-white flex items-baseline gap-1">
                  {mine.telemetry.co} <span className="text-xs font-normal text-slate-400">ppm</span>
                  <span className={`text-[10px] font-mono ${mine.telemetry.co > 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {mine.telemetry.co > 5 ? 'MODERATE' : '✓ SAFE'}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className={`h-full ${mine.telemetry.co > 5 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${Math.min(100, (mine.telemetry.co / 10) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Slope Tilt Rate */}
              <div className={`p-3.5 rounded-xl border ${
                mine.telemetry.slopeTiltRate > 1.0 ? 'bg-rose-950/30 border-rose-500/40' : 'bg-slate-800/60 border-slate-700'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Activity className="w-3.5 h-3.5 text-purple-400" /> Highwall Tilt Velocity
                  </span>
                  <span className="text-[10px] font-mono">Limit: &lt;1.0 mm/h</span>
                </div>
                <div className="text-xl font-tech font-bold text-white flex items-baseline gap-1">
                  {mine.telemetry.slopeTiltRate} <span className="text-xs font-normal text-slate-400">mm/hr</span>
                  <span className={`text-[10px] font-mono ${mine.telemetry.slopeTiltRate > 1.0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                    {mine.telemetry.slopeTiltRate > 1.0 ? '🚨 SLIP RISK' : 'STABLE'}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className={`h-full ${mine.telemetry.slopeTiltRate > 1.0 ? 'bg-rose-500' : 'bg-purple-500'}`} 
                    style={{ width: `${Math.min(100, (mine.telemetry.slopeTiltRate / 2.0) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Water Sump Level */}
              <div className={`p-3.5 rounded-xl border ${
                mine.telemetry.waterSumpLevel > 65 ? 'bg-blue-950/40 border-blue-500/50' : 'bg-slate-800/60 border-slate-700'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" /> Pit Sump Inundation
                  </span>
                  <span className="text-[10px] font-mono">Monsoon Cap</span>
                </div>
                <div className="text-xl font-tech font-bold text-white flex items-baseline gap-1">
                  {mine.telemetry.waterSumpLevel}%
                  <span className={`text-[10px] font-mono ${mine.telemetry.waterSumpLevel > 65 ? 'text-blue-400 font-bold' : 'text-emerald-400'}`}>
                    {mine.telemetry.waterSumpLevel > 65 ? '⚠️ HIGH SUMP' : 'NORMAL'}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className={`h-full ${mine.telemetry.waterSumpLevel > 65 ? 'bg-blue-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${mine.telemetry.waterSumpLevel}%` }}
                  ></div>
                </div>
              </div>

              {/* Ambient Dust PM10 */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono">Airborne Dust PM10</span>
                  <span className="text-[10px] font-mono">CPCB: &lt;100</span>
                </div>
                <div className="text-xl font-tech font-bold text-white flex items-baseline gap-1">
                  {mine.telemetry.pm10} <span className="text-xs font-normal text-slate-400">µg/m³</span>
                  <span className={`text-[10px] font-mono ${mine.telemetry.pm10 > 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {mine.telemetry.pm10 > 100 ? 'MISTING ON' : 'OPTIMAL'}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500" 
                    style={{ width: `${Math.min(100, (mine.telemetry.pm10 / 150) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Workers On Site */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Active Shift Crew
                  </span>
                  <span className="text-[10px] font-mono">DGMS Grade</span>
                </div>
                <div className="text-xl font-tech font-bold text-white flex items-baseline gap-1">
                  {mine.workersOnSite.toLocaleString()}
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    Grade {mine.telemetry.dgmsRating}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">
                  100% PME & Safety Tagged
                </div>
              </div>

            </div>

            {/* Drone LiDAR Simulation Tool */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-tech font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> AI Highwall LiDAR Slope Scanner
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Execute live 3D photogrammetry and point-cloud void analysis for bench slope failure risks.
                </p>
                {scanResult && (
                  <div className="mt-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded border border-slate-700 text-emerald-300">
                    Scan @ {scanResult.timestamp}: {scanResult.benchStability} • Void Ratio: {scanResult.voidRatio} • {scanResult.estimatedReserve}
                  </div>
                )}
              </div>
              <button
                onClick={handleRunLidarScan}
                disabled={scanSimulating}
                className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold font-tech tracking-wider flex items-center gap-2 shrink-0 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${scanSimulating ? 'animate-spin' : ''}`} />
                {scanSimulating ? 'Processing LiDAR Point Cloud...' : 'Run LiDAR Slope Scan'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Production & OBR Performance */}
        {activeTab === 'production' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Coal Production Card */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-tech font-bold uppercase text-slate-400">July Coal Production</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    mine.achievement >= 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {mine.achievement}% Achievement
                  </span>
                </div>
                <div className="text-2xl font-tech font-bold text-white mb-2">
                  {mine.actualJuly} MT <span className="text-xs font-normal text-slate-400">/ Target {mine.targetJuly} MT</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-3 overflow-hidden">
                  <div 
                    className={`h-full ${mine.achievement >= 100 ? 'bg-emerald-500' : (mine.achievement >= 80 ? 'bg-yellow-500' : 'bg-rose-500')}`}
                    style={{ width: `${Math.min(100, mine.achievement)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-300 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>YTD Actual (Upto July):</span>
                    <span className="text-white font-bold">{mine.actualUptoJuly} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Target (FY27):</span>
                    <span className="text-amber-400">{mine.annualTarget} MT</span>
                  </div>
                </div>
              </div>

              {/* Overburden Removal (OBR) Card */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-tech font-bold uppercase text-slate-400">Overburden Removal (OBR)</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    mine.obrAchievement >= 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {mine.obrAchievement}% Achievement
                  </span>
                </div>
                <div className="text-2xl font-tech font-bold text-white mb-2">
                  {mine.obrActualJuly} M.Cum <span className="text-xs font-normal text-slate-400">/ Target {mine.obrTargetUptoJuly} M.Cum</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-3 overflow-hidden">
                  <div 
                    className={`h-full ${mine.obrAchievement >= 100 ? 'bg-emerald-500' : (mine.obrAchievement >= 80 ? 'bg-yellow-500' : 'bg-rose-500')}`}
                    style={{ width: `${Math.min(100, mine.obrAchievement)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-300 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>YTD OBR (Upto July):</span>
                    <span className="text-white font-bold">{mine.obrActualUptoJuly} M.Cum</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual OBR Target:</span>
                    <span className="text-amber-400">{mine.obrAnnualTarget} M.Cum</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Strip Ratio Analysis */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Calculated Advanced Stripping Ratio: </span>
              <span className="text-amber-300 font-bold">
                {(mine.obrActualJuly / (mine.actualJuly || 1)).toFixed(2)} M.Cum/MT
              </span>
              <span className="text-slate-400 ml-2">
                {mine.obrAchievement < 60 ? '⚠️ DEFICIENT STRIPPING: High future bench starvation risk.' : '✓ Balanced advance ratio.'}
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: AI Geotechnical & Compliance Diagnostic */}
        {activeTab === 'aiDiagnostic' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <h4 className="text-xs font-tech font-bold uppercase text-amber-400 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> AI Root-Cause Diagnostic & Operational Dossier
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {mine.aiDiagnostic}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2 text-xs font-mono">
              <h5 className="font-tech font-bold uppercase text-slate-300 text-sm">Actionable Mitigation Roadmap</h5>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Immediate technical directive: {risk.actionPriority}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>DGMS CMR 2017 Chapter X Section 22 geotechnical compliance review scheduled.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Live telemetry linked with CIL Executive Command Dashboard (Kolkata Apex).</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-6 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenIncident && onOpenIncident(mine)}
              className="px-3 py-2 rounded-lg bg-rose-950/70 text-rose-300 border border-rose-600/50 hover:bg-rose-900 text-xs font-bold font-tech flex items-center gap-1.5 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Log Hazard / Field Incident
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
