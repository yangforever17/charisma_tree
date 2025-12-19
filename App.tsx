import React, { useState } from 'react';
import Scene from './components/Scene';
import { FONTS, COLORS } from './constants';
import { generateLuxuryWish } from './services/geminiService';
import { Sparkles, Gift } from 'lucide-react';

const App: React.FC = () => {
  const [wish, setWish] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateWish = async () => {
    setLoading(true);
    const newWish = await generateLuxuryWish();
    setWish(newWish);
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Elegant Overlay UI */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">

        {/* Header */}
        <header className="flex justify-between items-start animate-fade-in">
          <div className="text-left">
            <h1
              style={{ fontFamily: FONTS.TITLE, color: COLORS.GOLD_METALLIC }}
              className="text-3xl md:text-5xl tracking-widest uppercase font-bold drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]"
            >
              Arix
            </h1>
            <p
              style={{ fontFamily: FONTS.BODY, color: COLORS.GOLD_PALE }}
              className="text-sm md:text-lg tracking-[0.2em] mt-2 opacity-80 uppercase"
            >
              Signature Collection
            </p>
          </div>
          <div className="hidden md:block">
            <p style={{ fontFamily: FONTS.TITLE, color: COLORS.EMERALD_LITE }} className="text-xs tracking-widest border border-emerald-800 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20">
              Interactive Experience 2025
            </p>
          </div>
        </header>

        {/* Center/Bottom Content */}
        <main className="flex flex-col items-center justify-end h-full pb-12 pointer-events-auto">

          {/* The Generated Wish Card */}
          <div className={`transition-all duration-1000 transform ${wish ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mb-8 max-w-xl text-center`}>
            {wish && (
              <div className="relative p-1">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent blur-md"></div>
                <p
                  style={{ fontFamily: FONTS.BODY, color: COLORS.GOLD_PALE }}
                  className="relative text-xl md:text-3xl leading-relaxed italic drop-shadow-lg"
                >
                  "{wish}"
                </p>
              </div>
            )}
          </div>

          {/* Interaction Button */}
          <button
            onClick={handleGenerateWish}
            disabled={loading}
            className="group relative px-8 py-3 overflow-hidden transition-all duration-500 rounded-sm bg-transparent border border-[#E5B979]/30 hover:border-[#E5B979] backdrop-blur-sm"
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 w-0 bg-[#E5B979]/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>

            <span className="relative flex items-center gap-3">
              {loading ? (
                <Sparkles className="w-4 h-4 text-[#E5B979] animate-spin" />
              ) : (
                <Gift className="w-4 h-4 text-[#E5B979]" />
              )}
              <span
                style={{ fontFamily: FONTS.TITLE, letterSpacing: '0.15em' }}
                className="text-[#E5B979] text-xs md:text-sm uppercase font-semibold"
              >
                {loading ? 'Crafting Magic...' : wish ? 'Revealed' : 'Reveal A Signature Wish'}
              </span>
            </span>
          </button>

          {/* Footer Text */}
          <div className="mt-8 opacity-40">
            <p style={{ fontFamily: FONTS.BODY }} className="text-[10px] text-emerald-100/50 tracking-widest text-center">
              DRAG TO ROTATE &nbsp; • &nbsp; SCROLL TO ZOOM &nbsp; • &nbsp; IMMERSIVE AUDIO
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;