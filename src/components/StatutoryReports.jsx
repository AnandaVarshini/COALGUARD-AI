import React, { useState } from 'react';
import { 
  Download, 
  Layers, 
  CheckCircle2, 
  Building2,
  Calendar
} from 'lucide-react';
import { SUBSIDIARY_PRODUCTION } from '../data/coalMinesDataset';

export default function StatutoryReports() {
  const [downloadSuccess, setDownloadSuccess] = useState('');

  const handleDownload = (reportName, format = 'PDF') => {
    setDownloadSuccess(`Downloaded "${reportName}" as .${format.toLowerCase()}`);
    setTimeout(() => setDownloadSuccess(''), 3500);

    const dummyContent = `=======================================================\n` +
      `GOVERNMENT OF INDIA - MINISTRY OF COAL\n` +
      `CENTRALIZED SMART GOVERNANCE & COMPLIANCE PLATFORM\n` +
      `REPORT: ${reportName}\n` +
      `PERIOD: JULY 2026 (PROVISIONAL STATISTICS)\n` +
      `GENERATED ON: ${new Date().toLocaleString()}\n` +
      `=======================================================\n\n` +
      `1. TOTAL NATIONAL COAL PRODUCTION: 69.82 MT (+7.61% MoM)\n` +
      `2. CIL PRODUCTION: 50.34 MT (93.69% Target Achievement)\n` +
      `3. TOTAL EXCHEQUER LEVIES PAID: Rs 3,830.45 Crore\n` +
      `4. TOP 35 PRODUCING MINES MONITORED: 35 Tier-1 Assets\n` +
      `5. CRITICAL RISKS FLAGGED: Manikpur OC (0.41% OBR), Block B OC (30.85% Prod)\n\n` +
      `DIGITALLY VERIFIED BY CIL APEX GOVERNANCE LEDGER.`;

    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.replace(/\s+/g, '_')}_July2026.${format === 'CSV' ? 'csv' : 'txt'}`;
    a.click();
  };

  const reportsList = [
    {
      id: 'prov_stats',
      title: 'Monthly Coal Statistics for July 2026 (Provisional)',
      category: 'Executive Summary',
      description: 'Comprehensive 22-page official dataset including production, coking coal, lignite, rake logistics, and exchequer revenue.',
      badge: 'OFFICIAL MOC DATASET'
    },
    {
      id: 'top35_dossier',
      title: 'Top 35 Flagship Mines Performance & Risk Matrix',
      category: 'Operational Risk',
      description: 'Granular mine-level analysis of target vs actual production, overburden removal (OBR), and strip ratio risk ranking.',
      badge: 'TIER-1 AUDIT'
    },
    {
      id: 'dgms_form4',
      title: 'DGMS Statutory Form IV Safety & Inspection Log',
      category: 'Statutory Safety',
      description: 'Mandatory DGMS regulatory compliance filings, air quality readings, slope radar logs, and emergency evacuation drills.',
      badge: 'CMR 2017 MANDATE'
    },
    {
      id: 'dmf_exchequer',
      title: 'State-Wise DMF & Royalty Disbursement Certificate',
      category: 'Finance & Governance',
      description: 'Verified allocation sheet for ₹3,830.45 Cr exchequer levies including District Mineral Foundation allocations across 8 mining states.',
      badge: 'CAG COMPLIANT'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-blue-950/60 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-tech text-xl font-bold tracking-wide text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-400" />
            Statutory Reports & Ministry of Coal Compliance Dossiers
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Automated PDF & CSV statutory generation for Parliamentary & Regulatory oversight
          </p>
        </div>

        {downloadSuccess && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {downloadSuccess}
          </div>
        )}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportsList.map((rep) => (
          <div
            key={rep.id}
            className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {rep.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">{rep.category}</span>
              </div>

              <h3 className="font-tech text-base font-bold text-white mb-2">
                {rep.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                {rep.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> July 2026 Provisional
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(rep.title, 'CSV')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                >
                  CSV Data
                </button>
                <button
                  onClick={() => handleDownload(rep.title, 'PDF')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs flex items-center gap-1 transition-colors shadow-md shadow-amber-500/20"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Ministry Summary Table */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            Subsidiary-Level Production & Dispatch Reconciliation Summary
          </h3>
          <span className="text-xs font-mono text-amber-400">Fig in Million Tonnes (MT)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200 font-mono">
            <thead className="bg-slate-950/80 text-slate-400 font-tech uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Subsidiary</th>
                <th className="py-2.5 px-3">State / Zone</th>
                <th className="py-2.5 px-3">Monthly Target</th>
                <th className="py-2.5 px-3">Actual (July 26)</th>
                <th className="py-2.5 px-3">Achievement %</th>
                <th className="py-2.5 px-3">FY26 Actual</th>
                <th className="py-2.5 px-3">MoM Growth</th>
                <th className="py-2.5 px-3 text-right">Cumulative YTD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {SUBSIDIARY_PRODUCTION.map((sub) => (
                <tr key={sub.subs} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-2.5 px-3 font-tech font-bold text-white">{sub.subs}</td>
                  <td className="py-2.5 px-3 text-slate-400">{sub.state}</td>
                  <td className="py-2.5 px-3 text-slate-300">{sub.monthlyTarget} MT</td>
                  <td className="py-2.5 px-3 font-bold text-amber-300">{sub.fy27Actual} MT</td>
                  <td className="py-2.5 px-3">
                    <span className={`font-bold ${sub.achmt >= 100 ? 'text-emerald-400' : (sub.achmt >= 80 ? 'text-yellow-400' : 'text-rose-400')}`}>
                      {sub.achmt}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">{sub.fy26Actual} MT</td>
                  <td className="py-2.5 px-3 font-bold">
                    <span className={sub.momGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {sub.momGrowth >= 0 ? `+${sub.momGrowth}%` : `${sub.momGrowth}%`}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-200 font-bold">{sub.ytdFy27} MT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
