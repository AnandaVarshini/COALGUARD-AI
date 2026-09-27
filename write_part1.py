import os

os.makedirs('src/components', exist_ok=True)

navbar_code = '''import React, { useState, useEffect } from 'react';
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

export default function Navbar({ activeTab, setActiveTab, selectedLang, setSelectedLang, onTriggerSOS, sosActive }) {
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

  return (
    <header className=sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl>
      {/* Top Notification Ticker */}
      <div className=bg-gradient-to-r from-amber-950/80 via-slate-900 to-rose-950/80 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-xs>
        <div className=flex items-center gap-2 overflow-hidden flex-1>
          <span className=flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-tech tracking-wider text-[11px] font-bold uppercase shrink-0>
            <Radio className=w-3 h-3 text-amber-400 animate-pulse /> Live AI Alert Stream
          </span>
          <p className=text-slate-200 font-medium truncate transition-all duration-500>
            {alerts[tickerIndex].text}
          </p>
        </div>
        <div className=hidden md:flex items-center gap-3 text-slate-400 text-[11px] font-mono shrink-0 pl-4>
          <span className=flex items-center gap-1 text-emerald-400>
            <span className=w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block></span>
            CIL IoT Telemetry: ONLINE
          </span>
          <span className=text-slate-600>|</span>
          <span>PROVISIONAL DATA: JULY 2026</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className=max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4>
        {/* Brand & Emblem */}
        <div className=flex items-center gap-3 cursor-pointer onClick={() => setActiveTab('overview')}>
          <div className=relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/40>
            <Flame className=w-6 h-6 text-slate-950 fill-slate-950 />
            <div className=absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-bold text-black>AI</div>
          </div>
          <div>
            <div className=flex items-center gap-2>
              <h1 className=font-tech text-xl font-bold tracking-wider text-slate-100 flex items-center gap-1.5>
                COAL-VAULT <span className=text-amber-400 font-extrabold>AI</span>
              </h1>
              <span className=bg-amber-500/10 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/30 uppercase tracking-widest>
                Gov Portal
              </span>
            </div>
            <p className=text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block>
              Ministry of Coal • Smart Governance, Compliance & Risk Monitoring System
            </p>
          </div>
        </div>

        {/* Action Controls & Language Selector */}
        <div className=flex items-center gap-2 sm:gap-3>
          {/* Language Selector */}
          <div className=flex items-center bg-slate-900/90 border border-slate-700/70 rounded-lg p-1 text-xs>
            <span className=text-slate-400 px-2 font-mono text-[10px] uppercase hidden sm:inline>Lang:</span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className=bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer pr-1 text-xs
            >
              <option value=en className=bg-slate-900 text-slate-100>EN (English)</option>
              <option value=hi className=bg-slate-900 text-slate-100>HI (Hindi)</option>
              <option value=bn className=bg-slate-900 text-slate-100>BN (Bengali)</option>
              <option value=or className=bg-slate-900 text-slate-100>OR (Odia)</option>
              <option value=mr className=bg-slate-900 text-slate-100>MR (Marathi)</option>
              <option value=te className=bg-slate-900 text-slate-100>TE (Telugu)</option>
            </select>
          </div>

          {/* SOS Emergency Siren Trigger */}
          <button
            onClick={onTriggerSOS}
            className={'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg font-tech tracking-wide ' + (
              sosActive
                ? 'bg-rose-600 text-white animate-bounce shadow-rose-600/50 border border-rose-400'
                : 'bg-rose-950/60 text-rose-300 hover:bg-rose-900/80 border border-rose-700/50'
            )}
            title=Trigger Simulated Emergency Beacon
          >
            {sosActive ? <Volume2 className=w-4 h-4 animate-spin /> : <AlertTriangle className=w-4 h-4 text-rose-400 />}
            <span className=hidden sm:inline>{sosActive ? 'EMERGENCY ACTIVE' : 'MINE SOS'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className=max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none border-t border-slate-800>
        {navItems.map((item) => {
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
                <span className=w-2 h-2 rounded-full bg-rose-500 animate-pulse inline-block></span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}'''

stat_cards_code = '''import React from 'react';
import { 
  AlertOctagon, 
  Truck, 
  Building2, 
  Coins, 
  Pickaxe, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { SUBSIDIARY_PRODUCTION, EXCHEQUER_PAYMENTS, RAKE_LOADING_DATA } from '../data/coalMinesDataset';

export default function LiveStatCards({ riskSummary, onCardClick }) {
  const cilProd = SUBSIDIARY_PRODUCTION.find(s => s.subs === 'CIL Total') || { fy27Actual: 50.34, achmt: 93.69 };
  const grandTotal = SUBSIDIARY_PRODUCTION.find(s => s.subs === 'Grand Total India') || { fy27Actual: 69.82, monthlyTarget: 57.40, achmt: 121.63, momGrowth: 7.61 };
  const totalRakes = RAKE_LOADING_DATA.find(r => r.company.includes('Total')) || { actualAll: 314.3, planAll: 373.0, achmtAll: 84.30, actualPower: 287.4 };

  const kpis = [
    {
      id: 'prod',
      title: 'Total Coal Production (July)',
      value: ${grandTotal.fy27Actual} MT,
      target: Target:  MT (%),
      growth: +% MoM,
      growthPositive: grandTotal.momGrowth >= 0,
      icon: Pickaxe,
      color: 'amber',
      subtext: CIL:  MT (% achmt)
    },
    {
      id: 'risk',
      title: 'High / Critical Risk Mines',
      value: ${riskSummary.critical + riskSummary.high} Mines,
      target: ${riskSummary.critical} Critical (<50%) •  High Risk,
      growth: 'Immediate Action Needed',
      growthPositive: false,
      icon: AlertOctagon,
      color: 'rose',
      subtext: 'Manikpur (0.41% OBR) • Block B (30.85%)'
    },
    {
      id: 'mines',
      title: 'Total Producing Mines',
      value: '296 Mines',
      target: '35 Top Tier-1 Tracked',
      growth: '77 Flagship Units',
      growthPositive: true,
      icon: Building2,
      color: 'blue',
      subtext: 'Across 8 Coal Subsidiaries'
    },
    {
      id: 'rakes',
      title: 'Daily Coal Rake Loading',
      value: ${totalRakes.actualAll} / Day,
      target: Plan:  Rakes (%),
      growth: '+16.41% vs FY26',
      growthPositive: true,
      icon: Truck,
      color: 'purple',
      subtext: Power Priority:  rakes
    },
    {
      id: 'exchequer',
      title: 'Govt Exchequer Payments',
      value: ₹ Cr,
      target: YTD FY27: ₹ Cr,
      growth: 'Royalty: ₹1,418 Cr',
      growthPositive: true,
      icon: Coins,
      color: 'emerald',
      subtext: 'Jharkhand: 46.95% • MP: 12.83%'
    },
    {
      id: 'compliance',
      title: 'DGMS Safety Compliance',
      value: '91.4% Avg',
      target: 'Zero Fatal Incident Target',
      growth: '35 Live Radar Links',
      growthPositive: true,
      icon: ShieldCheck,
      color: 'cyan',
      subtext: '24/7 Gas Telemetry & Highwall Tilt'
    }
  ];

  const getColorClasses = (color) => {
    switch(color) {
      case 'rose':
        return {
          border: 'border-rose-500/30 hover:border-rose-500/60',
          bg: 'from-rose-950/30 to-slate-900/60',
          iconBg: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
        };
      case 'amber':
        return {
          border: 'border-amber-500/30 hover:border-amber-500/60',
          bg: 'from-amber-950/30 to-slate-900/60',
          iconBg: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-500/60',
          bg: 'from-emerald-950/30 to-slate-900/60',
          iconBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        };
      case 'purple':
        return {
          border: 'border-purple-500/30 hover:border-purple-500/60',
          bg: 'from-purple-950/30 to-slate-900/60',
          iconBg: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
        };
      case 'cyan':
        return {
          border: 'border-cyan-500/30 hover:border-cyan-500/60',
          bg: 'from-cyan-950/30 to-slate-900/60',
          iconBg: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
        };
      default:
        return {
          border: 'border-blue-500/30 hover:border-blue-500/60',
          bg: 'from-blue-950/30 to-slate-900/60',
          iconBg: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
        };
    }
  };

  return (
    <div className=grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4>
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const styles = getColorClasses(kpi.color);
        return (
          <div
            key={kpi.id}
            onClick={() => onCardClick && onCardClick(kpi.id)}
            className={cursor-pointer group relative overflow-hidden rounded-xl bg-gradient-to-br  border  p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl}
          >
            <div className=flex items-center justify-between mb-2>
              <span className=text-[11px] font-tech font-bold uppercase tracking-wider text-slate-400 truncate max-w-[120px]>
                {kpi.title}
              </span>
              <div className={p-2 rounded-lg  transition-transform group-hover:scale-110}>
                <Icon className=w-4 h-4 />
              </div>
            </div>

            <div className=mb-1>
              <h3 className=font-tech text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors>
                {kpi.value}
              </h3>
            </div>

            <div className=flex items-center justify-between text-xs mb-2>
              <span className=text-slate-300 font-mono text-[11px]>{kpi.target}</span>
              <span className={px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border }>
                {kpi.growth}
              </span>
            </div>

            <div className=pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400>
              <span className=truncate>{kpi.subtext}</span>
              <ArrowUpRight className=w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 ml-1 transition-colors />
            </div>
          </div>
        );
      })}
    </div>
  );
}'''

with open('src/components/Navbar.jsx', 'w', encoding='utf-8') as f:
    f.write(navbar_code)

with open('src/components/LiveStatCards.jsx', 'w', encoding='utf-8') as f:
    f.write(stat_cards_code)

print('Wrote Navbar.jsx and LiveStatCards.jsx successfully!')
