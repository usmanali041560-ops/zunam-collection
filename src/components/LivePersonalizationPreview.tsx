import React from 'react';
import { MetalFinish, FontStyleOption } from '../types';
import { Sparkles, Eye, ShieldCheck, Check } from 'lucide-react';

interface LivePersonalizationPreviewProps {
  customName: string;
  defaultPlaceholder: string;
  previewType?: 'necklace' | 'couplestand' | 'bracelet' | 'wallart' | 'pendant';
  selectedFinish: MetalFinish;
  selectedFont: FontStyleOption;
  onFontChange?: (font: FontStyleOption) => void;
  onFinishChange?: (finish: MetalFinish) => void;
  availableFinishes?: MetalFinish[];
  interactiveControls?: boolean;
}

export const LivePersonalizationPreview: React.FC<LivePersonalizationPreviewProps> = ({
  customName,
  defaultPlaceholder,
  previewType = 'necklace',
  selectedFinish,
  selectedFont,
  onFontChange,
  onFinishChange,
  availableFinishes = ['18K Gold', 'Polished Silver', 'Rose Gold', 'Matte Black'],
  interactiveControls = true,
}) => {
  const displayText = customName.trim() || defaultPlaceholder || 'Your Name';

  // Finish style mapping
  const getFinishClasses = () => {
    switch (selectedFinish) {
      case '18K Gold':
        return {
          textColor: 'text-amber-300',
          gradientText: 'gold-gradient-text drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]',
          borderCol: 'border-amber-400/40',
          metalBg: 'bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500',
          metalGlow: 'shadow-[0_0_20px_rgba(212,175,55,0.3)]',
          chainColor: 'border-amber-400/60'
        };
      case 'Polished Silver':
        return {
          textColor: 'text-slate-200',
          gradientText: 'silver-gradient-text drop-shadow-[0_2px_8px_rgba(226,232,240,0.4)]',
          borderCol: 'border-slate-300/40',
          metalBg: 'bg-gradient-to-r from-slate-200 via-white to-slate-400',
          metalGlow: 'shadow-[0_0_20px_rgba(255,255,255,0.2)]',
          chainColor: 'border-slate-300/60'
        };
      case 'Rose Gold':
        return {
          textColor: 'text-rose-200',
          gradientText: 'rose-gold-gradient-text drop-shadow-[0_2px_8px_rgba(244,164,96,0.4)]',
          borderCol: 'border-rose-400/40',
          metalBg: 'bg-gradient-to-r from-rose-300 via-amber-100 to-rose-400',
          metalGlow: 'shadow-[0_0_20px_rgba(244,164,96,0.3)]',
          chainColor: 'border-rose-300/60'
        };
      case 'Matte Black':
      default:
        return {
          textColor: 'text-zinc-300',
          gradientText: 'text-zinc-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]',
          borderCol: 'border-zinc-700',
          metalBg: 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-950',
          metalGlow: 'shadow-[0_0_15px_rgba(0,0,0,0.6)]',
          chainColor: 'border-zinc-600'
        };
    }
  };

  const finishStyles = getFinishClasses();

  // Font family mapping
  const getFontFamily = () => {
    switch (selectedFont) {
      case 'Signature Script':
        return 'font-script text-4xl sm:text-5xl font-normal tracking-wide';
      case 'Classical Serif':
        return 'font-serif-luxury text-3xl sm:text-4xl font-semibold tracking-wider uppercase';
      case 'Artisan Gothic':
        return 'font-brand text-2xl sm:text-3xl font-bold tracking-widest uppercase';
      case 'Modern Minimal':
      default:
        return 'font-sans font-bold text-2xl sm:text-3xl tracking-widest uppercase';
    }
  };

  // Split names for couple stands if contains "&" or "and"
  const getCoupleNames = () => {
    let name1 = 'Sarah';
    let name2 = 'James';
    if (displayText.includes('&')) {
      const parts = displayText.split('&');
      name1 = parts[0]?.trim() || 'Name 1';
      name2 = parts[1]?.trim() || 'Name 2';
    } else if (displayText.toLowerCase().includes(' and ')) {
      const parts = displayText.split(/ and /i);
      name1 = parts[0]?.trim() || 'Name 1';
      name2 = parts[1]?.trim() || 'Name 2';
    } else {
      name1 = displayText;
      name2 = 'Forever';
    }
    return { name1, name2 };
  };

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-5 overflow-hidden">
      {/* Live Badge & Status */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Interactive Artisan Studio Preview
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Real-time Laser Simulation</span>
        </div>
      </div>

      {/* Mockup Canvas */}
      <div className="relative min-h-[220px] sm:min-h-[250px] w-full rounded-lg bg-gradient-to-b from-zinc-900 via-zinc-950 to-[#090a0b] border border-zinc-800/80 flex flex-col items-center justify-center p-6 select-none overflow-hidden group shadow-inner">
        {/* Subtle studio spot lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />
        
        {/* Subtle grid lines for laser engraving bench feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* 1. NECKLACE SIMULATION */}
        {previewType === 'necklace' && (
          <div className="w-full flex flex-col items-center justify-center relative py-6">
            {/* Jewelry Chain Graphic */}
            <div className="w-full max-w-sm flex items-center justify-between relative px-4">
              {/* Left hanging chain */}
              <div className="w-1/4 h-1 border-t-2 border-dashed border-amber-400/50 transform -rotate-6" />
              {/* Connector Ring Left */}
              <div className="w-2.5 h-2.5 rounded-full border border-amber-400/70 bg-zinc-900 shrink-0" />
              
              {/* Center Laser-Cut Name */}
              <div className="relative px-4 py-2 text-center group-hover:scale-105 transition-transform duration-300">
                <span className={`${getFontFamily()} ${finishStyles.gradientText} block transition-all duration-200 select-none`}>
                  {displayText}
                </span>
                {/* Metallic thickness underline simulation */}
                <div className={`h-[2px] w-3/4 mx-auto mt-0.5 rounded-full ${finishStyles.metalBg} opacity-80`} />
              </div>

              {/* Connector Ring Right */}
              <div className="w-2.5 h-2.5 rounded-full border border-amber-400/70 bg-zinc-900 shrink-0" />
              {/* Right hanging chain */}
              <div className="w-1/4 h-1 border-t-2 border-dashed border-amber-400/50 transform rotate-6" />
            </div>

            <p className="text-[11px] text-zinc-500 mt-4 tracking-wider uppercase">
              18K PVD Micro-Laser Cut Specimen · 1.5mm Gauge Plate
            </p>
          </div>
        )}

        {/* 2. COUPLE STAND SIMULATION */}
        {previewType === 'couplestand' && (
          <div className="w-full flex flex-col items-center justify-center relative py-4">
            {/* Infinity loop with names */}
            {(() => {
              const { name1, name2 } = getCoupleNames();
              return (
                <div className="w-full max-w-md flex flex-col items-center">
                  <div className="relative w-full flex items-center justify-center py-4 px-2">
                    {/* Infinity outer frame */}
                    <div className="border-4 border-zinc-800 rounded-full px-6 py-4 flex items-center gap-4 bg-zinc-900/60 shadow-2xl relative">
                      <span className={`font-brand font-bold text-lg sm:text-xl ${finishStyles.gradientText} uppercase tracking-wider`}>
                        {name1}
                      </span>
                      {/* Center Intertwined Heart */}
                      <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-amber-300 font-bold text-sm shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                        ♥
                      </div>
                      <span className={`font-brand font-bold text-lg sm:text-xl ${finishStyles.gradientText} uppercase tracking-wider`}>
                        {name2}
                      </span>
                    </div>
                  </div>
                  
                  {/* Heavy Metal Base Stand */}
                  <div className="w-56 h-3 bg-gradient-to-r from-zinc-700 via-amber-400/60 to-zinc-700 rounded-sm shadow-xl flex items-center justify-center">
                    <div className="w-32 h-1 bg-zinc-950/80 rounded" />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-3 tracking-wider uppercase">
                    Weighted Dual-Metal Stand · Hand-Assembled Keepsake
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* 3. BRACELET SIMULATION */}
        {previewType === 'bracelet' && (
          <div className="w-full flex flex-col items-center justify-center relative py-5">
            {/* Curved Heavy Cuff */}
            <div className="w-full max-w-sm h-14 rounded-[28px] border-4 border-amber-500/50 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-6 shadow-2xl relative overflow-hidden">
              {/* Highlight sweep */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <span className={`font-mono text-sm sm:text-base font-semibold tracking-widest uppercase ${finishStyles.gradientText}`}>
                {displayText}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-4 tracking-wider uppercase">
              Deep Fiber-Laser Precision Engraving · 4mm Solid Steel
            </p>
          </div>
        )}

        {/* 4. WALL ART SIMULATION */}
        {previewType === 'wallart' && (
          <div className="w-full flex flex-col items-center justify-center relative py-4">
            <div className="w-full max-w-sm rounded-lg border-2 border-dashed border-amber-500/40 p-5 bg-zinc-900/70 text-center shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Laser Cut Wall Sculpture</div>
              <span className={`font-brand font-bold text-xl sm:text-2xl ${finishStyles.gradientText} tracking-widest block uppercase`}>
                {displayText}
              </span>
              <div className="w-16 h-0.5 mx-auto bg-amber-400/60 mt-2" />
            </div>
            <p className="text-[11px] text-zinc-500 mt-3 tracking-wider uppercase">
              Includes 1-Inch Wall Standoffs For Dramatic Natural Shadows
            </p>
          </div>
        )}

        {/* 5. PENDANT SIMULATION */}
        {previewType === 'pendant' && (
          <div className="w-full flex flex-col items-center justify-center relative py-6">
            <div className="w-10 h-28 bg-gradient-to-r from-zinc-800 via-amber-300/40 to-zinc-900 rounded-sm border border-amber-400/40 shadow-2xl flex items-center justify-center p-2 relative">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-200 rotate-90 whitespace-nowrap">
                {displayText}
              </span>
            </div>
            <div className="w-3 h-3 rounded-full border border-amber-400/60 -mt-2 bg-zinc-950" />
            <p className="text-[11px] text-zinc-500 mt-4 tracking-wider uppercase">
              4-Sided Solid 3D Bar · Custom Laser Carved
            </p>
          </div>
        )}
      </div>

      {/* Font & Material Customization Selectors */}
      {interactiveControls && (
        <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-3">
          {/* Font Selector */}
          {onFontChange && (
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-2">
                Typography / Engraving Style:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Signature Script', 'Classical Serif', 'Modern Minimal', 'Artisan Gothic'] as FontStyleOption[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => onFontChange(f)}
                    className={`px-2.5 py-1.5 text-xs rounded-md border text-center transition-all ${
                      selectedFont === f
                        ? 'bg-amber-400/15 border-amber-500 text-amber-300 font-semibold shadow-sm'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Finish Quick Selector */}
          {onFinishChange && (
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-2">
                Metal Finish Swatch:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableFinishes.map((finish) => {
                  const isSelected = selectedFinish === finish;
                  return (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => onFinishChange(finish)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/10 text-amber-200 font-semibold'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      {/* Color circle */}
                      <span className={`w-3 h-3 rounded-full border border-black/40 ${
                        finish === '18K Gold' ? 'bg-amber-400' :
                        finish === 'Polished Silver' ? 'bg-slate-200' :
                        finish === 'Rose Gold' ? 'bg-rose-300' : 'bg-zinc-900'
                      }`} />
                      <span>{finish}</span>
                      {isSelected && <Check className="w-3 h-3 text-amber-400 ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Craftsmanship Assurance */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-900">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500/80" />
          Lifetime Anti-Tarnish & Plating Guarantee
        </span>
        <span>Lead time: 24-48h laser cut</span>
      </div>
    </div>
  );
};
