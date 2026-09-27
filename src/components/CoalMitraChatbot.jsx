import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  Download, 
  Trash2
} from 'lucide-react';
import { processUserQuery } from '../utils/nlpHelper';

export default function CoalMitraChatbot({ selectedLang }) {
  const [input, setInput] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: processUserQuery('', selectedLang).reply,
      timestamp: 'Just now',
      chips: processUserQuery('', selectedLang).chips
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend = null) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const response = processUserQuery(query, selectedLang);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: response.chips
      };
      setMessages((prev) => [...prev, botMsg]);
      speakText(response.reply);
    }, 450);
  };

  const handleExportChat = () => {
    const chatContent = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CoalMitra_Transcript_${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: processUserQuery('', selectedLang).reply,
        timestamp: 'Just now',
        chips: processUserQuery('', selectedLang).chips
      }
    ]);
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 shadow-2xl flex flex-col h-[720px] overflow-hidden">
      
      {/* Chatbot Header */}
      <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 border border-amber-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-tech text-base font-bold text-white tracking-wide">
                CoalMitra AI <span className="text-amber-400 font-mono text-xs">(खान-साथी)</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Grounded Knowledge Base
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              DGMS CMR 2017 Safety Regulations • July 2026 Coal Stats Engine • Multilingual
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Voice Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
              voiceEnabled 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle Voice Speech Audio"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Export Chat */}
          <button
            onClick={handleExportChat}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Download Chat Transcript"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Clear Chat */}
          <button
            onClick={handleClearChat}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
        {messages.map((m) => {
          const isBot = m.sender === 'bot';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs font-sans leading-relaxed shadow-lg ${
                isBot 
                  ? 'bg-slate-900 border border-slate-800 text-slate-100' 
                  : 'bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 font-medium'
              }`}>
                <div className="whitespace-pre-line font-sans">
                  {m.text}
                </div>

                {/* Interactive Suggestion Chips */}
                {isBot && m.chips && m.chips.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                    {m.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-750 text-amber-300 hover:text-amber-200 border border-slate-700 text-[11px] font-mono transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}

                <div className={`text-[9px] font-mono mt-1.5 ${isBot ? 'text-slate-500' : 'text-amber-950 text-right'}`}>
                  {m.timestamp}
                </div>
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3.5 bg-slate-950/90 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask doubts about mining safety, gas limits, Manikpur/Block B status, rake loading, taxes..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-tech font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </form>
      </div>

    </div>
  );
}
