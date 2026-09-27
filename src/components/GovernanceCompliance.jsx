import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  Coins, 
  Upload, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Download
} from 'lucide-react';
import { EXCHEQUER_PAYMENTS } from '../data/coalMinesDataset';
import { MOCK_INSPECTION_LOGS } from '../data/mockInspectionLogs';

export default function GovernanceCompliance() {
  const [auditTrail, setAuditTrail] = useState(MOCK_INSPECTION_LOGS.blockchainAuditTrail);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleSimulateOcr = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setOcrProcessing(true);
    setOcrResult(null);

    setTimeout(() => {
      setOcrProcessing(false);
      setOcrResult({
        docType: 'DGMS Statutory Safety Audit & Form IV Inspection Slip',
        mineIdentified: 'MANIKPUR OC (SECL) - Sector 4',
        extractedInspector: 'Shri S. K. Mukherjee (DGMS Deputy Director)',
        dateExtracted: '2026-09-01',
        violationsFound: [
          'Overburden removal stripped below safety bench factor of 1:1.5',
          'Haul road dust suppression sprinkler pressure deficit on North Ramp',
          'Highwall slope extensometer battery replacement pending'
        ],
        complianceScore: '68% (Notice Recommended)',
        blockchainHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
      });
    }, 2000);
  };

  const handleAppendToBlockchain = () => {
    if (!ocrResult) return;
    const newBlock = {
      blockId: auditTrail[0].blockId + 1,
      blockHash: ocrResult.blockchainHash,
      prevHash: auditTrail[0].blockHash,
      timestamp: new Date().toLocaleString() + ' IST',
      mineName: ocrResult.mineIdentified,
      inspectorId: ocrResult.extractedInspector,
      actionType: 'OCR DIGITIZED DGMS AUDIT RECORD',
      severity: 'HIGH',
      details: ocrResult.violationsFound.join('; '),
      verified: true
    };
    setAuditTrail([newBlock, ...auditTrail]);
    setOcrResult(null);
    setFileName('');
    alert('Inspection record cryptographically appended to the National Mine Governance Blockchain Ledger!');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-amber-950/60 border border-blue-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-tech text-xl font-bold tracking-wide text-white flex items-center gap-2">
              <FileCheck2 className="w-6 h-6 text-amber-400" />
              Smart Governance, Statutory Compliance & Audit Suite
            </h2>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
              IMMUTABLE AUDIT TRAIL
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Mines Act 1952 • DGMS CMR 2017 • District Mineral Foundation (DMF) • CPCB Air/Water Clearances
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Downloaded All India Compliance Summary PDF')}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-tech font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" /> Download National Audit Summary
          </button>
        </div>
      </div>

      {/* Grid: Exchequer Levies & State Shares */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* State-Wise Revenue Share */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                State-Wise Exchequer Revenue Share (July 2026)
              </h3>
              <p className="text-xs text-slate-400">Total Levies: ₹3,830.45 Crore</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">100% Reconciled</span>
          </div>

          <div className="mt-4 space-y-3">
            {EXCHEQUER_PAYMENTS.stateWiseShare.map((st) => (
              <div key={st.state} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-200 font-bold">{st.state}</span>
                  <span className="text-amber-300">
                    ₹{st.amountCr.toLocaleString()} Cr ({st.sharePct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                    style={{ width: `${st.sharePct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Levy Breakdown */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Statutory Levies & Welfare Funds Breakdown
              </h3>
              <p className="text-xs text-slate-400">Royalty, DMF, NMET & Clean Energy Cess</p>
            </div>
            <span className="text-xs font-mono text-amber-400">July 2026</span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-4">
            {EXCHEQUER_PAYMENTS.breakdown.slice(0, 6).map((levy) => (
              <div key={levy.levy} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block truncate">{levy.levy}</span>
                <span className="text-base font-tech font-bold text-white block mt-0.5">
                  ₹{levy.july26.toLocaleString()} Cr
                </span>
                <span className="text-[10px] font-mono text-amber-400">
                  {levy.sharePct}% Share
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300">
            <strong>District Mineral Foundation (DMF):</strong> ₹422.15 Cr directly allocated to tribal and local infrastructure development in mining districts.
          </div>
        </div>

      </div>

      {/* AI OCR Document Scanner Simulator */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-tech text-base font-bold text-white">
              AI OCR Statutory Field Audit Digitizer
            </h3>
            <p className="text-xs text-slate-400">
              Upload handwritten or printed DGMS safety audit reports / inspection notes to automatically extract non-compliances and hash onto the blockchain.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Upload Box */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border-2 border-dashed border-slate-700 hover:border-amber-500/50 flex flex-col items-center justify-center text-center transition-colors">
            <Upload className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
            <span className="font-tech font-bold text-slate-200 text-sm mb-1">
              Select Field Inspection Form / Safety Notice
            </span>
            <span className="text-xs text-slate-400 mb-4 font-mono">
              Supports PDF, PNG, JPG (e.g. DGMS Form IV, Slope Log, Safety Memo)
            </span>
            
            <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono font-bold cursor-pointer border border-slate-600 transition-colors">
              Browse Document File
              <input type="file" className="hidden" onChange={handleSimulateOcr} accept=".pdf,.png,.jpg,.jpeg" />
            </label>

            {fileName && (
              <span className="mt-2 text-xs font-mono text-emerald-400">
                Selected: {fileName}
              </span>
            )}
            {ocrProcessing && (
              <span className="mt-2 text-xs font-mono text-amber-400 animate-pulse">
                ⚙️ Neural OCR running multi-lingual character recognition...
              </span>
            )}
          </div>

          {/* OCR Result Preview */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-tech font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Extracted Intelligence & Entity Mapping:
              </span>
              {ocrResult ? (
                <div className="space-y-2 text-xs font-mono text-slate-200">
                  <div><strong>Document:</strong> {ocrResult.docType}</div>
                  <div><strong>Target Mine:</strong> <span className="text-amber-400 font-bold">{ocrResult.mineIdentified}</span></div>
                  <div><strong>Inspector:</strong> {ocrResult.extractedInspector}</div>
                  <div><strong>Date:</strong> {ocrResult.dateExtracted}</div>
                  <div><strong>Status:</strong> <span className="text-rose-400 font-bold">{ocrResult.complianceScore}</span></div>
                  <div className="pt-2">
                    <strong className="block text-slate-300 mb-1">Violations Identified:</strong>
                    <ul className="list-disc list-inside text-rose-300 space-y-0.5">
                      {ocrResult.violationsFound.map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 text-[10px] text-slate-500 truncate">
                    <strong>Generated Hash:</strong> {ocrResult.blockchainHash}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-mono italic py-8 text-center">
                  Upload an inspection report to see real-time AI entity extraction, violation tagging, and automated blockchain audit stamping.
                </p>
              )}
            </div>

            {ocrResult && (
              <button
                onClick={handleAppendToBlockchain}
                className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-tech font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg"
              >
                <Lock className="w-4 h-4" /> Cryptographically Append to Ledger
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Tamper-Proof Blockchain Audit Trail */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-tech text-base font-bold text-white">
                Tamper-Proof Digital Governance Blockchain Ledger
              </h3>
              <p className="text-xs text-slate-400">
                Immutable, cryptographic record of all safety observations, DGMS statutory notices, and compliance inspections.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-mono border border-slate-700">
            Network Status: 100% SYNCHRONIZED
          </span>
        </div>

        <div className="space-y-3">
          {auditTrail.map((block) => (
            <div
              key={block.blockId}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors text-xs font-mono space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                    Block #{block.blockId}
                  </span>
                  <span className="text-white font-bold font-tech text-sm">{block.mineName}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>{block.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    block.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    (block.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30')
                  }`}>
                    {block.actionType}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 font-sans text-xs">
                <strong>Findings:</strong> {block.details}
              </p>

              <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>Inspector: <strong className="text-slate-400">{block.inspectorId}</strong></span>
                <span className="truncate max-w-[280px]">Hash: <code className="text-amber-500/80">{block.blockHash.slice(0, 24)}...</code></span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED ON-CHAIN
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
