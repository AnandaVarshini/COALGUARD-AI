import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LoginModule from './components/LoginModule';
import LiveStatCards from './components/LiveStatCards';
import GISMapExplorer from './components/GISMapExplorer';
import MineDetailModal from './components/MineDetailModal';
import RiskObservatory from './components/RiskObservatory';
import CoalMitraChatbot from './components/CoalMitraChatbot';
import GovernanceCompliance from './components/GovernanceCompliance';
import LogisticsDispatch from './components/LogisticsDispatch';
import IncidentReporter from './components/IncidentReporter';
import StatutoryReports from './components/StatutoryReports';
import { TOP_35_MINES, SUBSIDIARY_PRODUCTION } from './data/coalMinesDataset';
import { getRiskSummary } from './utils/riskEngine';
import { getRoleById, hasAccessToTab } from './utils/authRoles';
import { 
  ShieldAlert, 
  MapPin, 
  Bot, 
  Layers, 
  AlertTriangle, 
  Sparkles, 
  Activity, 
  Truck, 
  FileCheck2, 
  ChevronRight,
  TrendingUp,
  Volume2
} from 'lucide-react';

export default function App() {
  const [selectedRole, setSelectedRole] = useState('mine-worker');
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedMine, setSelectedMine] = useState(null);
  const [incidentPreselectMine, setIncidentPreselectMine] = useState(null);
  const [sosActive, setSosActive] = useState(false);

  const riskSummary = getRiskSummary(TOP_35_MINES);
  const currentRole = getRoleById(userProfile?.roleId ?? selectedRole);
  const allowedTabs = currentRole?.accessTabs ?? ['overview'];

  useEffect(() => {
    if (currentRole && !hasAccessToTab(currentRole.id, activeTab)) {
      setActiveTab(currentRole.accessTabs[0]);
    }
  }, [activeTab, currentRole]);

  const handleLogin = (profile) => {
    setUserProfile(profile);
    setSelectedRole(profile.roleId);
  };

  const handleLogout = () => {
    setUserProfile(null);
    setSelectedMine(null);
    setIncidentPreselectMine(null);
    setActiveTab('overview');
  };

  const triggerSOSAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.0);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log('Audio Context restricted:', e);
    }
  };

  const handleTriggerSOS = () => {
    setSosActive(true);
    triggerSOSAudio();
    setTimeout(() => {
      setSosActive(false);
    }, 4000);
  };

  const handleOpenIncident = (mine) => {
    setIncidentPreselectMine(mine);
    setSelectedMine(null);
    setActiveTab('incident');
  };

  const handleCardClick = (id) => {
    if (id === 'risk') setActiveTab('risk');
    else if (id === 'mines') setActiveTab('map');
    else if (id === 'rakes' || id === 'prod') setActiveTab('logistics');
    else if (id === 'exchequer' || id === 'compliance') setActiveTab('compliance');
  };

  if (!userProfile) {
    return (
      <LoginModule
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        onLogin={handleLogin}
      />
    );
  }

  const isTabAllowed = allowedTabs.includes(activeTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Navbar Component */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        onTriggerSOS={handleTriggerSOS}
        sosActive={sosActive}
        userProfile={userProfile}
        currentRole={currentRole}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {!isTabAllowed && (
          <div className="glass-panel rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-rose-300 font-bold">Access restricted</p>
            <h2 className="mt-3 text-2xl font-bold text-white">This page is not available for {currentRole?.label}</h2>
            <p className="mt-2 text-sm text-slate-300">Please return to the permitted dashboard for your role.</p>
            <button
              type="button"
              onClick={() => setActiveTab(allowedTabs[0])}
              className="mt-4 rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950"
            >
              Go to {getRoleById(currentRole?.id)?.label ? `${currentRole.label} dashboard` : 'dashboard'}
            </button>
          </div>
        )}
        
        {/* Command Center (Executive Overview) */}
        {isTabAllowed && activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Live KPI Metric Cards */}
            <LiveStatCards 
              riskSummary={riskSummary} 
              onCardClick={handleCardClick} 
            />

            {/* Quick Interactive Dual Feature Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* GIS Map Preview Card */}
              <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      <h3 className="font-tech text-base font-bold text-white">
                        All-India Real-Time Coal Mines GIS Radar Map
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('map')}
                      className="text-xs text-amber-400 hover:text-amber-300 font-tech font-bold flex items-center gap-1"
                    >
                      Expand Full Map <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mb-4">
                    Tracking 35 Tier-1 flagship opencast & underground mines across 8 CIL subsidiaries with real-time geotechnical slope stability, methane & inundation telemetry.
                  </p>
                </div>

                {/* Quick Map Embed Preview */}
                <div className="h-64 rounded-xl overflow-hidden border border-slate-800 relative">
                  <GISMapExplorer onSelectMine={(m) => setSelectedMine(m)} />
                </div>
              </div>

              {/* Quick AI Risk Anomaly Widget */}
              <div className="lg:col-span-1 glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
                      <h3 className="font-tech text-base font-bold text-white">Critical Risk Tickers</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('risk')}
                      className="text-xs text-amber-400 hover:text-amber-300 font-tech font-bold flex items-center gap-1"
                    >
                      Risk Matrix <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div 
                      onClick={() => {
                        const m = TOP_35_MINES.find(x => x.name.includes('MANIKPUR'));
                        if (m) setSelectedMine(m);
                      }}
                      className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 cursor-pointer hover:border-rose-400 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-rose-400">MANIKPUR OC (SECL)</span>
                        <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[10px]">CRITICAL</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans">
                        OBR at 0.41% achievement. Unbalanced strip ratio risking highwall landslide.
                      </p>
                    </div>

                    <div 
                      onClick={() => {
                        const m = TOP_35_MINES.find(x => x.name.includes('BLOCK B'));
                        if (m) setSelectedMine(m);
                      }}
                      className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 cursor-pointer hover:border-rose-400 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-rose-400">BLOCK B OC (NCL)</span>
                        <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[10px]">CRITICAL</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans">
                        30.85% Production Achmt (0.87 MT vs 2.82 MT). Pit sump flooded at 82%.
                      </p>
                    </div>

                    <div 
                      onClick={() => {
                        const m = TOP_35_MINES.find(x => x.name.includes('JAGANNATH') && x.subsidiary === 'MCL');
                        if (m) setSelectedMine(m);
                      }}
                      className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 cursor-pointer hover:border-amber-400 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-amber-400">JAGANNATH OC (MCL)</span>
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px]">DEFICIT</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans">
                        18.71% Production & 29.05% OBR. Dragline maintenance and legal dispute.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('chatbot')}
                  className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-tech font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Bot className="w-4 h-4" /> Ask CoalMitra AI About Risk Mitigations
                </button>
              </div>

            </div>

            {/* Subsidiary Performance Quick Grid */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <h3 className="font-tech text-base font-bold text-white">
                    Subsidiary Performance & Growth Scorecard (July 2026 Provisional)
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Fig. in Million Tonnes (MT)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {SUBSIDIARY_PRODUCTION.slice(0, 8).map((sub) => (
                  <div 
                    key={sub.subs}
                    onClick={() => {
                      setActiveTab('map');
                    }}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer text-center group"
                  >
                    <span className="font-tech font-bold text-slate-200 text-sm block group-hover:text-amber-400">
                      {sub.subs}
                    </span>
                    <span className="text-lg font-tech font-bold text-white block my-0.5">
                      {sub.fy27Actual} <span className="text-[10px] text-slate-400 font-normal">MT</span>
                    </span>
                    <span className={`text-[10px] font-mono font-bold block ${sub.achmt >= 100 ? 'text-emerald-400' : (sub.achmt >= 80 ? 'text-yellow-400' : 'text-rose-400')}`}>
                      {sub.achmt}% Achmt
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono block mt-1">
                      {sub.momGrowth >= 0 ? `+${sub.momGrowth}%` : `${sub.momGrowth}%`} MoM
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* GIS Map Tab */}
        {isTabAllowed && activeTab === 'map' && (
          <div>
            <GISMapExplorer onSelectMine={(m) => setSelectedMine(m)} />
          </div>
        )}

        {/* Risk Observatory Tab */}
        {isTabAllowed && activeTab === 'risk' && (
          <div>
            <RiskObservatory 
              onSelectMine={(m) => setSelectedMine(m)}
              onOpenIncident={handleOpenIncident}
            />
          </div>
        )}

        {/* CoalMitra AI Chatbot Tab */}
        {isTabAllowed && activeTab === 'chatbot' && (
          <div className="max-w-4xl mx-auto">
            <CoalMitraChatbot 
              selectedLang={selectedLang}
              onTriggerSOS={handleTriggerSOS}
            />
          </div>
        )}

        {/* Governance & Compliance Suite Tab */}
        {isTabAllowed && activeTab === 'compliance' && (
          <div>
            <GovernanceCompliance />
          </div>
        )}

        {/* Logistics & Dispatch Tab */}
        {isTabAllowed && activeTab === 'logistics' && (
          <div>
            <LogisticsDispatch />
          </div>
        )}

        {/* Field Incident Reporter Tab */}
        {isTabAllowed && activeTab === 'incident' && (
          <div>
            <IncidentReporter preselectedMine={incidentPreselectMine} />
          </div>
        )}

        {/* Statutory Reports Tab */}
        {isTabAllowed && activeTab === 'reports' && (
          <div>
            <StatutoryReports />
          </div>
        )}

      </main>

      {/* Mine Detail Modal Flyout */}
      {selectedMine && (
        <MineDetailModal
          mine={selectedMine}
          onClose={() => setSelectedMine(null)}
          onOpenIncident={handleOpenIncident}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>COALGUARD AI • Ministry of Coal • Coal India Limited</span>
            <span>•</span>
            <span className="text-amber-500/80">Provisional Statistics July 2026</span>
          </div>
          <div>
            Built with Real-Time Risk Radar & DGMS CMR 2017 Smart Compliance
          </div>
        </div>
      </footer>

    </div>
  );
}
