import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Activity, 
  MessageSquareCode, 
  FileCheck2, 
  Truck, 
  AlertTriangle, 
  Volume2, 
  Radio, 
  Flame, 
  Layers
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, selectedLang, setSelectedLang, onTriggerSOS, sosActive, userProfile, currentRole, onLogout }) {
  const [tickerIndex, setTickerIndex] = useState(0);

  const alerts = [
    { type: 'CRITICAL', text: 'MANIKPUR OC (SECL): Critical Overburden Removal Deficit (0.41% Achmt) - Highwall slope collapse hazard!' },
    { type: 'CRITICAL', text: 'BLOCK B OC (NCL): Production stalled at 30.85% (0.87 MT vs 2.82 MT) - Pit sump inundation at 82%' },
    { type: 'WARNING', text: 'JAGANNATH OC (MCL): Lowest July performance at 18.71% production achievement' },
    { type: 'LOGISTICS', text: 'SECL RAKE ALERT: Daily loading at 75.38% (49 vs 65 plan) due to SECR rail corridor congestion' },
    { type: 'SUCCESS', text: 'STAR PERFORMER: Mungoli Nirguda OC (WCL) at 129.75% and Sonepur Bazari (ECL) at 107.59%' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % alerts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [alerts.length]);

  const navItems = [
    { id: 'overview', label: 'Command Center', icon: Activity },
    { id: 'map', label: 'GIS GPS Map', icon: MapPin },
    { id: 'risk', label: 'AI Risk Observatory', icon: ShieldAlert },
    { id: 'chatbot', label: 'CoalMitra AI', icon: MessageSquareCode },
    { id: 'compliance', label: 'Governance & Audits', icon: FileCheck2 },
    { id: 'logistics', label: 'Logistics & Dispatch', icon: Truck },
    { id: 'incident', label: 'Field Incident Logger', icon: AlertTriangle },
    { id: 'reports', label: 'Statutory Reports', icon: Layers },
  ];

  const visibleNavItems = currentRole
    ? navItems.filter((item) => currentRole.accessTabs.includes(item.id))
    : navItems;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      {/* Top Notification Ticker */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-rose-950/80 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-tech tracking-wider text-[11px] font-bold uppercase shrink-0">
            <Radio className="w-3 h-3 text-amber-400 animate-pulse" /> Live AI Alert Stream
          </span>
          <p className="text-slate-200 font-medium truncate transition-all duration-500">
            {alerts[tickerIndex].text}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 text-slate-400 text-[11px] font-mono shrink-0 pl-4">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            CIL IoT Telemetry: ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span>PROVISIONAL DATA: JULY 2026</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/40">
            <Flame className="w-6 h-6 text-slate-950 fill-slate-950" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-bold text-black">AI</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-tech text-xl font-bold tracking-wider text-slate-100 flex items-center gap-1.5">
                COAL-VAULT <span className="text-amber-400 font-extrabold">AI</span>
              </h1>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/30 uppercase tracking-widest">
                Gov Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Ministry of Coal • Smart Governance, Compliance & Risk Monitoring System
            </p>
          </div>
        </div>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          {userProfile && currentRole && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[11px] text-amber-200">
              <span className="font-bold uppercase tracking-[0.18em]">{currentRole.label}</span>
              <span className="text-slate-400">•</span>
              <span className="font-mono text-slate-200">{userProfile.employeeId}</span>
            </div>
          )}

          {/* Language Selector */}
          <div className="flex items-center bg-slate-900/90 border border-slate-700/70 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-2 font-mono text-[10px] uppercase hidden sm:inline">Lang:</span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer pr-1 text-xs"
            >
              <option value="en" className="bg-slate-900 text-slate-100">EN (English)</option>
              <option value="hi" className="bg-slate-900 text-slate-100">HI (Hindi)</option>
              <option value="bn" className="bg-slate-900 text-slate-100">BN (Bengali)</option>
              <option value="or" className="bg-slate-900 text-slate-100">OR (Odia)</option>
              <option value="mr" className="bg-slate-900 text-slate-100">MR (Marathi)</option>
              <option value="te" className="bg-slate-900 text-slate-100">TE (Telugu)</option>
            </select>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:border-slate-500"
            >
              Sign Out
            </button>
          )}

          {/* SOS Emergency Siren Trigger */}
          <button
            onClick={onTriggerSOS}
            className={'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg font-tech tracking-wide ' + (
              sosActive
                ? 'bg-rose-600 text-white animate-bounce shadow-rose-600/50 border border-rose-400'
                : 'bg-rose-950/60 text-rose-300 hover:bg-rose-900/80 border border-rose-700/50'
            )}
            title="Trigger Simulated Emergency Beacon"
          >
            {sosActive ? <Volume2 className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
            <span className="hidden sm:inline">{sosActive ? 'EMERGENCY ACTIVE' : 'MINE SOS'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none border-t border-slate-800">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={'flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ' + (
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-300 border border-amber-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              )}
            >
              <Icon className={'w-4 h-4 ' + (isActive ? 'text-amber-400' : 'text-slate-400')} />
              <span>{item.label}</span>
              {item.id === 'risk' && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse inline-block"></span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
