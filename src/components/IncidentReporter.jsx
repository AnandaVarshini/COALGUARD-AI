import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Camera 
} from 'lucide-react';
import { TOP_35_MINES } from '../data/coalMinesDataset';
import { MOCK_INSPECTION_LOGS } from '../data/mockInspectionLogs';

export default function IncidentReporter({ preselectedMine }) {
  const [incidents, setIncidents] = useState(MOCK_INSPECTION_LOGS.fieldIncidents);
  const [mineId, setMineId] = useState(preselectedMine ? preselectedMine.id : TOP_35_MINES[0].id);
  const [category, setCategory] = useState('Slope Instability / Highwall Crack');
  const [urgency, setUrgency] = useState('High');
  const [reporterName, setReporterName] = useState('');
  const [description, setDescription] = useState('');
  const [photoSelected, setPhotoSelected] = useState(false);
  const [gpsLoc, setGpsLoc] = useState({ lat: 22.3415, lng: 82.7218 });
  const [submitted, setSubmitted] = useState(false);

  const selectedMineObj = TOP_35_MINES.find(m => m.id === parseInt(mineId)) || TOP_35_MINES[0];

  const handleCaptureGps = () => {
    if (selectedMineObj) {
      setGpsLoc({
        lat: selectedMineObj.lat + (Math.random() * 0.005 - 0.0025),
        lng: selectedMineObj.lng + (Math.random() * 0.005 - 0.0025)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newInc = {
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      mineId: selectedMineObj.id,
      mineName: selectedMineObj.name,
      subsidiary: selectedMineObj.subsidiary,
      reporter: reporterName || 'Anonymous Worker / Field Inspector',
      category,
      urgency,
      status: 'Investigation Active',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description,
      lat: gpsLoc.lat,
      lng: gpsLoc.lng,
      correctiveAction: 'Safety marshal dispatched to site. Section 22 geotechnical survey logged.'
    };

    setIncidents([newInc, ...incidents]);
    setSubmitted(true);
    setDescription('');
    setReporterName('');
    setPhotoSelected(false);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/60 border border-rose-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-tech text-xl font-bold tracking-wide text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
              Geo-Tagged Field Hazard Observation & Worker Grievance Portal
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Direct reporting to DGMS Safety Marshal & Internal Complaints Committee (Mines Act 1952)
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
            24/7 Rapid Emergency Response Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Incident Form (Left Column) */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="font-tech text-base font-bold text-white">Log Safety Observation</h3>
          </div>

          {submitted && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Incident logged and assigned with unique DGMS Tracking Token!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-sans">
            
            {/* Mine Selector */}
            <div>
              <label className="block text-slate-400 text-[11px] font-tech font-bold uppercase mb-1">
                Target Coal Mine
              </label>
              <select
                value={mineId}
                onChange={(e) => {
                  setMineId(e.target.value);
                  handleCaptureGps();
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-semibold focus:outline-none focus:border-amber-400"
              >
                {TOP_35_MINES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.subsidiary} • {m.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Category & Urgency */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 text-[11px] font-tech font-bold uppercase mb-1">
                  Hazard Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 text-[11px]"
                >
                  <option value="Slope Instability / Highwall Crack">Slope Instability</option>
                  <option value="Hazardous Gas Accumulation">Gas / CH4 / CO Spike</option>
                  <option value="Pit Sump Inundation / Dewatering">Sump Flooding</option>
                  <option value="Heavy Machinery / Dragline Breakdown">Machinery Failure</option>
                  <option value="PPE Shortage / Dust Inhalation">PPE / Dust Hazard</option>
                  <option value="Worker Shift Fatigue & Welfare">Worker Welfare</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] font-tech font-bold uppercase mb-1">
                  Urgency Level
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-bold focus:outline-none focus:border-amber-400 text-[11px]"
                >
                  <option value="Critical" className="text-rose-400">Critical (Imminent Danger)</option>
                  <option value="High" className="text-amber-400">High Priority</option>
                  <option value="Medium" className="text-yellow-400">Medium</option>
                  <option value="Low" className="text-emerald-400">Routine Non-Hazard</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-400 text-[11px] font-tech font-bold uppercase mb-1">
                Hazard Observation Details
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe crack location, gas odor, equipment ID, or safety violation..."
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
              />
            </div>

            {/* Reporter Name (Optional) */}
            <div>
              <label className="block text-slate-400 text-[11px] font-tech font-bold uppercase mb-1">
                Reporter Identity (Leave blank for Anonymous)
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="e.g. Safety Steward / Dumper Operator Shift A"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
              />
            </div>

            {/* Geo-Tag and Attachment Controls */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Auto-GPS Tag:
                </span>
                <span className="text-amber-300 font-bold">
                  {gpsLoc.lat.toFixed(4)}°N, {gpsLoc.lng.toFixed(4)}°E
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-850">
                <label className="cursor-pointer text-slate-300 hover:text-amber-300 flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>{photoSelected ? 'Photo Attached ✓' : 'Attach Geo-Photo'}</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={() => setPhotoSelected(true)} 
                    accept="image/*" 
                  />
                </label>
                <button
                  type="button"
                  onClick={handleCaptureGps}
                  className="text-[10px] text-amber-400 hover:underline"
                >
                  Refresh Coords
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-tech font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
            >
              <Send className="w-3.5 h-3.5" /> Submit Safety Grievance & Dispatch Alert
            </button>
          </form>
        </div>

        {/* Live Incident Timeline / Board (Right 2 Columns) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  Live Field Incident Feed & Investigation Tracker
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time ticket lifecycle managed by DGMS Safety Marshals & Pit Safety Committees
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/20">
                {incidents.length} Active Tickets
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-xs font-mono space-y-2 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold border border-slate-700 text-[10px]">
                        {inc.id}
                      </span>
                      <span className="text-white font-tech font-bold text-sm">
                        {inc.mineName} ({inc.subsidiary})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-slate-400">{inc.timestamp}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        inc.urgency === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                        (inc.urgency === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30')
                      }`}>
                        {inc.urgency}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-200 font-sans text-xs">
                    <strong className="text-amber-400">{inc.category}:</strong> {inc.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono">
                    <strong className="text-emerald-400">Action Status:</strong> {inc.correctiveAction}
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Logged By: <strong className="text-slate-400">{inc.reporter}</strong></span>
                    <span>GPS: {inc.lat.toFixed(4)}°N, {inc.lng.toFixed(4)}°E</span>
                    <span className="text-amber-400 font-bold">{inc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>DGMS Helpline: 1800-345-MINE</span>
            <span>All reports verified via geo-fenced token system.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
