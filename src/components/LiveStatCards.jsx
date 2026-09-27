import React from 'react';
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
      value: `${grandTotal.fy27Actual} MT`,
      target: `Target: ${grandTotal.monthlyTarget} MT (${grandTotal.achmt}%)`,
      growth: `+${grandTotal.momGrowth}% MoM`,
      growthPositive: grandTotal.momGrowth >= 0,
      icon: Pickaxe,
      color: 'amber',
      subtext: `CIL: ${cilProd.fy27Actual} MT (${cilProd.achmt}% achmt)`
    },
    {
      id: 'risk',
      title: 'High / Critical Risk Mines',
      value: `${riskSummary.critical + riskSummary.high} Mines`,
      target: `${riskSummary.critical} Critical (<50%) • ${riskSummary.high} High Risk`,
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
      value: `${totalRakes.actualAll} / Day`,
      target: `Plan: ${totalRakes.planAll} Rakes (${totalRakes.achmtAll}%)`,
      growth: '+16.41% vs FY26',
      growthPositive: true,
      icon: Truck,
      color: 'purple',
      subtext: `Power Priority: ${totalRakes.actualPower} rakes`
    },
    {
      id: 'exchequer',
      title: 'Govt Exchequer Payments',
      value: `₹${EXCHEQUER_PAYMENTS.totalPaidJuly26.toLocaleString()} Cr`,
      target: `YTD FY27: ₹${EXCHEQUER_PAYMENTS.ytdPaidJuly26.toLocaleString()} Cr`,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const styles = getColorClasses(kpi.color);
        return (
          <div
            key={kpi.id}
            onClick={() => onCardClick && onCardClick(kpi.id)}
            className={`cursor-pointer group relative overflow-hidden rounded-xl bg-gradient-to-br ${styles.bg} border ${styles.border} p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-slate-400 truncate max-w-[120px]">
                {kpi.title}
              </span>
              <div className={`p-2 rounded-lg ${styles.iconBg} transition-transform group-hover:scale-110`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mb-1">
              <h3 className="font-tech text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {kpi.value}
              </h3>
            </div>

            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-mono text-[11px]">{kpi.target}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${styles.badge}`}>
                {kpi.growth}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate">{kpi.subtext}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 ml-1 transition-colors" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
