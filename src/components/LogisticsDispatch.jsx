import React from 'react';
import { 
  Truck, 
  Train, 
  Zap 
} from 'lucide-react';
import { 
  SECTORAL_DISPATCH, 
  MODEWISE_OFFTAKE, 
  RAKE_LOADING_DATA, 
  POWER_GENERATION 
} from '../data/coalMinesDataset';

export default function LogisticsDispatch() {
  const totalRakes = RAKE_LOADING_DATA.find(r => r.company.includes('Total')) || { planAll: 373, actualAll: 314.3, achmtAll: 84.3, planPower: 331, actualPower: 287.4, achmtPower: 86.8 };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-amber-950/60 border border-purple-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-tech text-xl font-bold tracking-wide text-white flex items-center gap-2">
              <Truck className="w-6 h-6 text-purple-400" />
              Coal Offtake, Logistics & Sectoral Dispatch Command
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Indian Railways Rake Movements • Sector Allocations • POSOCO National Grid Mix
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
              July 2026 Offtake: 63.92 MT (CIL) / 86.91 MT (All-India)
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Sectoral Dispatch & Modewise Offtake */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sectoral Dispatch Breakdown */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Coal Despatch to Different Sectors (July 2026)
              </h3>
              <p className="text-xs text-slate-400">Total Despatch: 86.91 MT (+18.11% Growth YoY)</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">Power 79.11%</span>
          </div>

          <div className="space-y-3">
            {SECTORAL_DISPATCH.map((sec) => (
              <div key={sec.sector} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-200 font-bold">{sec.sector}</span>
                  <span className="text-amber-300">
                    {sec.dispatchJuly26} MT ({sec.percentage}%) • Growth: {sec.growth >= 0 ? `+${sec.growth}%` : `${sec.growth}%`}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${sec.percentage}%`,
                      backgroundColor: sec.color || '#f59e0b'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300">
            <strong>Power Sector Dispatch:</strong> 68.76 MT dispatched to thermal power utilities, securing national base-load power grid reserves.
          </div>
        </div>

        {/* Modewise Offtake */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
                <Train className="w-5 h-5 text-blue-400" />
                Modewise Offtake Status (July 2026)
              </h3>
              <p className="text-xs text-slate-400">Rail, Road & Merry-Go-Round (MGR) Conveyors</p>
            </div>
            <span className="text-xs font-mono text-blue-400 font-bold">Total: 63.92 MT</span>
          </div>

          <div className="space-y-3">
            {MODEWISE_OFFTAKE.map((mode) => (
              <div key={mode.mode} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-200 font-bold">{mode.mode}</span>
                  <span className="text-blue-300">
                    {mode.qtyJul26} MT ({mode.share}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${mode.share}%`,
                      backgroundColor: mode.color || '#3b82f6'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block">Rail Offtake (CIL):</span>
              <span className="text-base font-tech font-bold text-white">36.21 MT (56.65%)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block">Road Offtake:</span>
              <span className="text-base font-tech font-bold text-amber-400">19.21 MT (30.05%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Rake Loading Performance by Subsidiary */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-4">
          <div>
            <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
              <Train className="w-5 h-5 text-amber-400" />
              Company-Wise Daily Rake Loading Plan vs Actual (FY 2026-27 Prov.)
            </h3>
            <p className="text-xs text-slate-400">
              National Average: {totalRakes.actualAll} rakes/day loaded vs {totalRakes.planAll} planned ({totalRakes.achmtAll}% achievement)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Power Priority: {totalRakes.actualPower} / {totalRakes.planPower} ({totalRakes.achmtPower}%)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200 font-mono">
            <thead className="bg-slate-950/80 text-slate-400 font-tech uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Subsidiary</th>
                <th className="py-2.5 px-3">Daily Plan (All Sectors)</th>
                <th className="py-2.5 px-3">Daily Actual</th>
                <th className="py-2.5 px-3">Achievement %</th>
                <th className="py-2.5 px-3">Power Sector Plan</th>
                <th className="py-2.5 px-3">Power Actual</th>
                <th className="py-2.5 px-3">Power Achmt %</th>
                <th className="py-2.5 px-3 text-right">Logistics Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {RAKE_LOADING_DATA.map((r) => (
                <tr key={r.company} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3 px-3 font-tech font-bold text-white">
                    {r.company}
                  </td>
                  <td className="py-3 px-3 text-slate-300">{r.planAll} rakes</td>
                  <td className="py-3 px-3 font-bold text-amber-300">{r.actualAll} rakes</td>
                  <td className="py-3 px-3">
                    <span className={`font-bold ${r.achmtAll >= 90 ? 'text-emerald-400' : (r.achmtAll >= 80 ? 'text-yellow-400' : 'text-rose-400')}`}>
                      {r.achmtAll}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{r.planPower} rakes</td>
                  <td className="py-3 px-3 font-bold text-emerald-300">{r.actualPower} rakes</td>
                  <td className="py-3 px-3">
                    <span className={`font-bold ${r.achmtPower >= 90 ? 'text-emerald-400' : (r.achmtPower >= 80 ? 'text-yellow-400' : 'text-rose-400')}`}>
                      {r.achmtPower}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {r.achmtAll < 80 ? (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px]">
                        Corridor Congestion
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                        Optimal Movement
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* POSOCO All-India Power Generation Grid Mix */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div>
            <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              All-India Electricity Generation Source-Wise (POSOCO - July 2026)
            </h3>
            <p className="text-xs text-slate-400">Total Generation: 181,790 MW (+10.58% YoY Growth)</p>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold">Coal Share: 64.31%</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {POWER_GENERATION.map((p) => (
            <div key={p.source} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block text-[11px] truncate mb-1">{p.source}</span>
              <span className="text-lg font-tech font-bold text-white block">
                {p.mwJul26.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">MW</span>
              </span>
              <div className="flex items-center justify-between text-[10px] text-amber-400 mt-1">
                <span>{p.share}% Share</span>
                <span className={p.growthYoy >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {p.growthYoy >= 0 ? `+${p.growthYoy}%` : `${p.growthYoy}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
