'use client';

import React, { useState, useEffect } from 'react';

// A curated list of visually distinct architectural fonts, matching your request:
// Times New Roman (Classic), Futura (Geometric), Arial Black (Bold), Helvetica Neue (Grotesk)
const LOGO_FONTS = [
  '"Times New Roman", Times, serif',                  // Classic Roman Serif
  'Futura, "Trebuchet MS", sans-serif',               // Geometric Modern
  '"Helvetica Neue", Helvetica, Arial, sans-serif',   // Grotesk / Neutral
  'Impact, fantasy',                                  // Extreme Bold Block
  '"Courier New", Courier, monospace',                // Tech Typewriter
  'Georgia, serif',                                   // High-contrast elegant
  '"Arial Black", Gadget, sans-serif'                 // Heavy Sans
];

export default function DynamicLogo() {
  const [font, setFont] = useState<string>('');

  useEffect(() => {
    // Pick a random font mathematically only after the client mounts
    // This perfectly prevents React hydration mismatch errors!
    const randomFont = LOGO_FONTS[Math.floor(Math.random() * LOGO_FONTS.length)];
    setFont(randomFont);
  }, []);

  return (
    <span
      // We start with opacity-0 so there is no ugly "snap" when the font switches.
      // It elegantly appears half a second after evaluating the random math.
      className={`inline-flex items-center justify-center text-4xl font-bold italic transition-opacity duration-300 ${font ? 'opacity-100' : 'opacity-0'}`}
      style={{ fontFamily: font || 'inherit' }}
      aria-hidden="true"
    >
      ё
    </span>
  );
}
