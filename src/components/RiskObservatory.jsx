import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Search, 
  Sparkles, 
  Download,
  ChevronRight
} from 'lucide-react';
import { TOP_35_MINES } from '../data/coalMinesDataset';
import { calculateMineRisk } from '../utils/riskEngine';

export default function RiskObservatory({ onSelectMine }) {
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCapMine, setSelectedCapMine] = useState(TOP_35_MINES.find(m => m.name.includes('MANIKPUR')) || TOP_35_MINES[0]);
  const [capGenerated, setCapGenerated] = useState(false);

  const rankedMines = useMemo(() => {
    return [...TOP_35_MINES]
      .map(m => ({ ...m, risk: calculateMineRisk(m) }))
      .sort((a, b) => b.risk.score - a.risk.score);
  }, []);

  const filteredMines = useMemo(() => {
    return rankedMines.filter(m => {
      const matchTier = selectedTier === 'ALL' || m.risk.riskTier === selectedTier;
      const matchSub = selectedSubsidiary === 'ALL' || m.subsidiary === selectedSubsidiary;
      const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.state.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTier && matchSub && matchSearch;
    });
  }, [rankedMines, selectedTier, selectedSubsidiary, searchTerm]);

  const criticalCount = rankedMines.filter(m => m.risk.riskTier === 'Critical').length;
  const highCount = rankedMines.filter(m => m.risk.riskTier === 'High').length;
  const moderateCount = rankedMines.filter(m => m.risk.riskTier === 'Moderate').length;
  const lowCount = rankedMines.filter(m => m.risk.riskTier === 'Low').length;

  const handleGenerateCap = () => {
    setCapGenerated(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Risk Overview Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/50 to-slate-900 border border-rose-500/40 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-tech font-bold uppercase text-rose-300">Critical Failure Tier</span>
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
          </div>
          <div className="text-3xl font-tech font-bold text-white mb-1">{criticalCount} Mines</div>
          <p className="text-[11px] text-rose-300/80 font-mono">
            &lt;50% Production or &lt;35% OBR (Block B OC, Jagannath OC, Manikpur OC)
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/50 to-slate-900 border border-amber-500/40 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-tech font-bold uppercase text-amber-300">High Risk Tier</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-3xl font-tech font-bold text-white mb-1">{highCount} Mines</div>
          <p className="text-[11px] text-amber-300/80 font-mono">
            50-80% Target Achmt (Kanhia OC, Bharathpur OC, Gevra OC, Bhubaneswari OBR)
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-950/40 to-slate-900 border border-yellow-500/30 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-tech font-bold uppercase text-yellow-300">Moderate Risk Tier</span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
          </div>
          <div className="text-3xl font-tech font-bold text-white mb-1">{moderateCount} Mines</div>
          <p className="text-[11px] text-yellow-300/80 font-mono">
            80-100% Target Achmt (Rajmahal, Amrapali, Dudhichua, Nigahi)
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-tech font-bold uppercase text-emerald-300">Compliant / Benchmark Tier</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-3xl font-tech font-bold text-white mb-1">{lowCount} Mines</div>
          <p className="text-[11px] text-emerald-300/80 font-mono">
            &gt;100% Target Achieved (Sonepur Bazari, Mungoli, Jayant, Dipka, Baroud)
          </p>
        </div>

      </div>

      {/* Anomaly Spotlight Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/70 border border-rose-500/40 shadow-2xl">
        <div className="flex items-center gap-2.5 text-rose-400 font-tech font-bold text-sm uppercase tracking-wider mb-2">
          <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse" />
          <span>AI Predictive Anomaly Detection & Geotechnical Radar Alerts</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-rose-500/30">
            <span className="text-rose-400 font-bold block mb-1">🚨 MANIKPUR OC (SECL) - Strip Ratio Failure</span>
            <p className="text-slate-300 font-sans text-xs">
              Overburden removal achieved only <strong>0.41%</strong> (0.01 M.Cum vs 2.46 M.Cum). Coal extraction without bench stripping creates severe risk of highwall failure.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-rose-500/30">
            <span className="text-rose-400 font-bold block mb-1">🚨 BLOCK B OC (NCL) - Inundation & Legal Stay</span>
            <p className="text-slate-300 font-sans text-xs">
              Achieved only <strong>30.85%</strong> production (0.87 MT vs 2.82 MT). Pit bottom flooded (82% water sump) and West Face land litigation.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30">
            <span className="text-amber-400 font-bold block mb-1">⚠️ BHUBANESWARI OC (MCL) - Over-Extraction Alert</span>
            <p className="text-slate-300 font-sans text-xs">
              High coal extraction (<strong>128.44%</strong>) with lagging overburden (<strong>69.20%</strong>). Re-allocation of heavy shovels to overburden benches required.
            </p>
          </div>
        </div>
      </div>

      {/* Risk Observatory Table & Filters */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-tech text-lg font-bold tracking-wide text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              National Coal Mines Multi-Factor Risk Index
            </h3>
            <p className="text-xs text-slate-400">
              Ranked by composite score: Production gap (25%) + OBR deficit (30%) + Hazardous gas (18%) + Slope stability (17%) + DGMS rating (10%)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search ranked mines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <select
              value={selectedSubsidiary}
              onChange={(e) => setSelectedSubsidiary(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-amber-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Subsidiaries</option>
              <option value="ECL">ECL</option>
              <option value="BCCL">BCCL</option>
              <option value="CCL">CCL</option>
              <option value="NCL">NCL</option>
              <option value="WCL">WCL</option>
              <option value="SECL">SECL</option>
              <option value="MCL">MCL</option>
            </select>

            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-amber-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="Critical">Critical Risk</option>
              <option value="High">High Risk</option>
              <option value="Moderate">Moderate Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs text-slate-200 font-sans">
            <thead className="bg-slate-950/80 text-slate-400 font-tech uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3"># Risk Rank</th>
                <th className="py-2.5 px-3">Mine Name</th>
                <th className="py-2.5 px-3">Subsidiary</th>
                <th className="py-2.5 px-3">State / Location</th>
                <th className="py-2.5 px-3">July Prod Achmt</th>
                <th className="py-2.5 px-3">July OBR Achmt</th>
                <th className="py-2.5 px-3">IoT Telemetry (CH₄ / Tilt)</th>
                <th className="py-2.5 px-3">Composite Risk</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredMines.map((m, idx) => (
                <tr 
                  key={m.id}
                  className="hover:bg-slate-850/80 transition-colors cursor-pointer group"
                  onClick={() => onSelectMine(m)}
                >
                  <td className="py-3 px-3 font-bold text-slate-400">
                    <span className={`px-2 py-0.5 rounded ${idx < 3 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'text-slate-400'}`}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-tech font-bold text-white group-hover:text-amber-300 transition-colors">
                    {m.name}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/20 text-[10px]">
                      {m.subsidiary}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans text-xs">
                    {m.district}, {m.state}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-bold ${m.achievement >= 100 ? 'text-emerald-400' : (m.achievement >= 80 ? 'text-yellow-400' : 'text-rose-400')}`}>
                      {m.achievement}% <span className="text-[10px] text-slate-400">({m.actualJuly} MT)</span>
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-bold ${m.obrAchievement >= 100 ? 'text-emerald-400' : (m.obrAchievement >= 80 ? 'text-yellow-400' : 'text-rose-400')}`}>
                      {m.obrAchievement}% <span className="text-[10px] text-slate-400">({m.obrActualJuly} M.Cum)</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs">
                    <span className="text-slate-300">{m.telemetry.ch4}% CH₄</span> • <span className="text-purple-300">{m.telemetry.slopeTiltRate} mm/h</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${m.risk.badgeColor}`}>
                      {m.risk.riskTier} ({m.risk.score}/100)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMine(m);
                      }}
                      className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-tech font-bold transition-colors inline-flex items-center gap-1"
                    >
                      Dossier <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Corrective Action Plan (CAP) Generator Section */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-tech text-base font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              AI Automated 30-Day Corrective Action Plan (CAP) Generator
            </h3>
            <p className="text-xs text-slate-400">
              Generate DGMS-compliant statutory turn-around roadmap for high-deficit coal mining projects.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCapMine.id}
              onChange={(e) => {
                const found = TOP_35_MINES.find(m => m.id === parseInt(e.target.value));
                if (found) {
                  setSelectedCapMine(found);
                  setCapGenerated(false);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-amber-300 font-semibold focus:outline-none cursor-pointer"
            >
              {rankedMines.slice(0, 10).map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.subsidiary} - {m.risk.riskTier} Risk)
                </option>
              ))}
            </select>

            <button
              onClick={handleGenerateCap}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-tech font-bold text-xs tracking-wider shadow-lg shadow-amber-500/20 transition-all"
            >
              Generate AI CAP
            </button>
          </div>
        </div>

        {/* CAP Output Box */}
        {capGenerated && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-tech font-bold text-white text-sm">
                Statutory Corrective Action Plan (CAP): {selectedCapMine.name} ({selectedCapMine.subsidiary})
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono text-[10px]">
                Priority: IMMEDIATE DGMS COMPLIANCE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300 font-mono">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Phase 1: Days 1 - 7</span>
                <span>• Deploy 2x high-capacity 1500 GPM dewatering pumps</span><br/>
                <span>• Erect geo-textile slope barrier on East Bench</span><br/>
                <span>• Daily lidar scan with 6-hr drone interval</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Phase 2: Days 8 - 20</span>
                <span>• Re-deploy 4x 10 Cu.M excavators to overburden bench</span><br/>
                <span>• Expedite local administration land compensation escrow</span><br/>
                <span>• Reinforce CHP conveyor feed belt #2</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Phase 3: Days 21 - 30</span>
                <span>• Joint DGMS & CIL Apex safety verification audit</span><br/>
                <span>• Commission rapid rail silo loading siding</span><br/>
                <span>• Restore target strip ratio to 2.4 M.Cum/MT</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => alert(`Exported Official DGMS CAP Dossier for ${selectedCapMine.name}`)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" /> Export Signed DGMS CAP (PDF)
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
