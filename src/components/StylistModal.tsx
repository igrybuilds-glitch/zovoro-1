import React, { useState } from 'react';
import { api } from '../services/api';
import { Sparkles, X, Send, CornerDownLeft, Loader2 } from 'lucide-react';

interface StylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductId?: string;
  defaultProductName?: string;
}

export const StylistModal: React.FC<StylistModalProps> = ({
  isOpen,
  onClose,
  defaultProductId,
  defaultProductName,
}) => {
  const [question, setQuestion] = useState(
    defaultProductName ? `How should I style the ${defaultProductName}?` : ''
  );
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const q = (customQuery || question).trim();
    if (!q) return;

    setLoading(true);
    setResponse(null);
    try {
      const res = await api.getStylistAdvice(q, defaultProductId);
      setResponse(res.advice);
      setSource(res.source);
    } catch {
      setResponse('Balance oversized, architectural proportions with razor-sharp tailoring. Pair heavyweight cotton with fluid worsted wool to create deliberate material contrast.');
      setSource('editorial-director');
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'How do I balance proportions with wide-leg trousers?',
    'What footwear pairs with the Structured Wool Coat?',
    'How should I layer for a monochromatic evening ensemble?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fdf8f8] border border-black w-full max-w-xl shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e2e1] bg-white">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-black" />
            <div>
              <span className="font-label-caps text-[10px] text-[#767676] tracking-[0.2em] uppercase block">
                Concierge
              </span>
              <h3 className="font-display text-lg font-semibold uppercase text-black">
                Atelier Styling Advisory
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-black hover:bg-neutral-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input & Form */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-[#5e5e5e] leading-relaxed">
            Consult our digital atelier director on silhouettes, fabric weights, layering geometry, and monochromatic palette pairing.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                placeholder="Ask about silhouettes, pairings, or event styling..."
                className="w-full p-3 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden resize-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-[10px] text-[#767676] font-mono">
                Powered by ZOVORO Atelier AI
              </div>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="px-5 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-900 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3 h-3" />}
                <span>{loading ? 'Consulting...' : 'Request Advice'}</span>
              </button>
            </div>
          </form>

          {/* Sample Prompts */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#767676] block">
              Suggested Questions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setQuestion(p);
                    handleSubmit(undefined, p);
                  }}
                  className="text-[11px] px-2.5 py-1 bg-white border border-[#e5e2e1] hover:border-black text-[#444748] hover:text-black transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Advice Output */}
          {response && (
            <div className="p-4 bg-white border border-black/80 space-y-2">
              <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-[#767676]">
                <span className="font-semibold text-black">Stylist Assessment</span>
                <span>{source === 'gemini' ? 'Gemini 2.5 Intelligence' : 'Atelier Director'}</span>
              </div>
              <p className="font-sans text-xs text-[#1c1b1b] leading-relaxed italic border-l-2 border-black pl-3 py-1">
                "{response}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
