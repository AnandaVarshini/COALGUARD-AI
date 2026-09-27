import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Search, 
  ShieldAlert, 
  Pickaxe, 
  SlidersHorizontal, 
  ChevronRight
} from 'lucide-react';
import { TOP_35_MINES } from '../data/coalMinesDataset';
import { calculateMineRisk } from '../utils/riskEngine';

const createCustomIcon = (riskTier) => {
  let color = '#22c55e';
  if (riskTier === 'Critical') color = '#ef4444';
  else if (riskTier === 'High') color = '#f97316';
  else if (riskTier === 'Moderate') color = '#eab308';

  const html = `
    <div style="position: relative; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center;">
      <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: 0.75; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
      <div style="width: 16px; height: 16px; border-radius: 50%; background-color: ${color}; border: 2px solid #0f172a; box-shadow: 0 0 12px ${color}; display: flex; align-items: center; justify-content: center; z-index: 2;">
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-pin',
    html,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14]
  });
};

function MapController({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function GISMapExplorer({ onSelectMine }) {
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('ALL');
  const [selectedRiskTier, setSelectedRiskTier] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([22.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);

  const coalfields = [
    { name: 'All India', coords: [22.5937, 78.9629], zoom: 5 },
    { name: 'Raniganj (ECL)', coords: [23.65, 87.15], zoom: 10 },
    { name: 'Jharia (BCCL)', coords: [23.75, 86.42], zoom: 10 },
    { name: 'Karanpura (CCL)', coords: [23.86, 85.05], zoom: 10 },
    { name: 'Singrauli (NCL)', coords: [24.15, 82.65], zoom: 10 },
    { name: 'Korba (SECL)', coords: [22.33, 82.60], zoom: 10 },
    { name: 'Talcher / Ib (MCL)', coords: [21.40, 84.50], zoom: 9 },
    { name: 'Chandrapur (WCL)', coords: [19.95, 79.30], zoom: 10 },
  ];

  const filteredMines = useMemo(() => {
    return TOP_35_MINES.filter((mine) => {
      const risk = calculateMineRisk(mine);
      const matchSubs = selectedSubsidiary === 'ALL' || mine.subsidiary === selectedSubsidiary;
      const matchRisk = selectedRiskTier === 'ALL' || risk.riskTier === selectedRiskTier;
      const matchQuery = 
        mine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mine.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mine.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubs && matchRisk && matchQuery;
    });
  }, [selectedSubsidiary, selectedRiskTier, searchQuery]);

  const jumpToMine = (mine) => {
    setMapCenter([mine.lat, mine.lng]);
    setMapZoom(11);
  };

  return (
    <div className="space-y-4">
      
      {/* Top Filter & Jump Control Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Left: Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="relative min-w-[220px] flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search mine, state, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Subsidiary Filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-900/90 border border-slate-700 rounded-lg px-2.5 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 hidden sm:inline">Subsidiary:</span>
            <select
              value={selectedSubsidiary}
              onChange={(e) => setSelectedSubsidiary(e.target.value)}
              className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-slate-900 text-slate-100">All Subsidiaries (8)</option>
              <option value="ECL" className="bg-slate-900 text-slate-100">ECL (Eastern Coalfields)</option>
              <option value="BCCL" className="bg-slate-900 text-slate-100">BCCL (Bharat Coking)</option>
              <option value="CCL" className="bg-slate-900 text-slate-100">CCL (Central Coalfields)</option>
              <option value="NCL" className="bg-slate-900 text-slate-100">NCL (Northern Coalfields)</option>
              <option value="WCL" className="bg-slate-900 text-slate-100">WCL (Western Coalfields)</option>
              <option value="SECL" className="bg-slate-900 text-slate-100">SECL (South Eastern)</option>
              <option value="MCL" className="bg-slate-900 text-slate-100">MCL (Mahanadi Coalfields)</option>
            </select>
          </div>

          {/* Risk Tier Filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-900/90 border border-slate-700 rounded-lg px-2.5 py-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 hidden sm:inline">Risk Tier:</span>
            <select
              value={selectedRiskTier}
              onChange={(e) => setSelectedRiskTier(e.target.value)}
              className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-slate-900 text-slate-100">All Risk Tiers</option>
              <option value="Critical" className="bg-slate-900 text-rose-400">Critical Risk (&lt;50%)</option>
              <option value="High" className="bg-slate-900 text-amber-400">High Risk (50-80%)</option>
              <option value="Moderate" className="bg-slate-900 text-yellow-400">Moderate (80-100%)</option>
              <option value="Low" className="bg-slate-900 text-emerald-400">Low Risk (&gt;100%)</option>
            </select>
          </div>
        </div>

        {/* Right: Coalfield Quick-Fly Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs">
          <span className="text-slate-400 text-[11px] font-tech font-bold uppercase shrink-0 mr-1 hidden sm:inline">Coalfields:</span>
          {coalfields.map((cf) => (
            <button
              key={cf.name}
              onClick={() => {
                setMapCenter(cf.coords);
                setMapZoom(cf.zoom);
              }}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-[11px] font-mono whitespace-nowrap transition-colors border border-slate-700/60"
            >
              {cf.name}
            </button>
          ))}
        </div>

      </div>

      {/* Map Main Container & Side Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[650px]">
        
        {/* Leaflet Map Viewer */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <MapController center={mapCenter} zoom={mapZoom} />
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              maxZoom={18}
            />

            {/* Mine Pins */}
            {filteredMines.map((mine) => {
              const risk = calculateMineRisk(mine);
              const customIcon = createCustomIcon(risk.riskTier);

              return (
                <Marker
                  key={mine.id}
                  position={[mine.lat, mine.lng]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="p-1 min-w-[240px] text-slate-100 font-sans">
                      <div className="flex items-start justify-between gap-2 border-b border-slate-700 pb-1.5 mb-2">
                        <div>
                          <h4 className="font-tech font-bold text-sm text-white">{mine.name}</h4>
                          <span className="text-[10px] text-slate-400">{mine.subsidiary} • {mine.state}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${risk.badgeColor}`}>
                          {risk.riskTier}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
                        <div className="bg-slate-800/80 p-1.5 rounded">
                          <span className="text-[10px] text-slate-400 block">July Prod Achmt:</span>
                          <span className={`font-bold ${mine.achievement >= 100 ? 'text-emerald-400' : (mine.achievement >= 80 ? 'text-yellow-400' : 'text-rose-400')}`}>
                            {mine.achievement}% ({mine.actualJuly} MT)
                          </span>
                        </div>
                        <div className="bg-slate-800/80 p-1.5 rounded">
                          <span className="text-[10px] text-slate-400 block">OBR Achmt:</span>
                          <span className={`font-bold ${mine.obrAchievement >= 100 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {mine.obrAchievement}% ({mine.obrActualJuly} M.Cum)
                          </span>
                        </div>
                        <div className="bg-slate-800/80 p-1.5 rounded">
                          <span className="text-[10px] text-slate-400 block">Methane CH4:</span>
                          <span className="text-white font-bold">{mine.telemetry.ch4}%</span>
                        </div>
                        <div className="bg-slate-800/80 p-1.5 rounded">
                          <span className="text-[10px] text-slate-400 block">Slope Tilt:</span>
                          <span className="text-white font-bold">{mine.telemetry.slopeTiltRate} mm/h</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectMine(mine)}
                        className="w-full py-1.5 rounded-lg bg-amber-500 text-slate-950 font-tech font-bold text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
                      >
                        <Pickaxe className="w-3.5 h-3.5" /> Open Intelligence Dossier
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Map Floating Legend */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-2xl text-[11px] font-mono">
            <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-slate-400 block mb-2">
              GPS Risk Telemetry Legend:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block"></span> Critical (&lt;50%)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> High (50-80%)
              </span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span> Moderate (80-100%)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span> Low (&gt;100%)
              </span>
            </div>
          </div>
        </div>

        {/* Right Drawer: Filtered Mine List */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col h-full overflow-hidden border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
            <div>
              <h3 className="font-tech text-sm font-bold uppercase tracking-wider text-slate-200">
                Active Mines Explorer
              </h3>
              <p className="text-[11px] text-slate-400">
                Displaying <span className="text-amber-400 font-bold">{filteredMines.length}</span> of {TOP_35_MINES.length} Mines
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono border border-amber-500/20">
              {selectedSubsidiary}
            </span>
          </div>

          <div className="overflow-y-auto space-y-2.5 pr-1 mt-3 flex-1">
            {filteredMines.map((mine) => {
              const risk = calculateMineRisk(mine);
              return (
                <div
                  key={mine.id}
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group"
                  onClick={() => jumpToMine(mine)}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-tech text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                      {mine.name}
                    </h4>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${risk.badgeColor}`}>
                      {risk.riskTier}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-between mb-2 font-mono">
                    <span>{mine.subsidiary} • {mine.state}</span>
                    <span className="text-slate-300">Prod: {mine.achievement}%</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px]">
                    <span className="text-slate-400 font-mono">OBR: {mine.obrAchievement}%</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMine(mine);
                      }}
                      className="text-amber-400 hover:text-amber-300 font-tech font-bold flex items-center gap-0.5"
                    >
                      Dossier <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
