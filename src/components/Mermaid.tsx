'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  darkMode: false,
  themeVariables: {
    darkMode: false,
    background: 'transparent',
    primaryColor: '#ffffff',
    primaryTextColor: '#000000',
    primaryBorderColor: '#000000',
    lineColor: '#000000',
    textColor: '#000000',
    nodeBorder: '#000000',
    mainBkg: '#ffffff',
    clusterBkg: '#ffffff',
    clusterBorder: '#000000',
    edgeLabelBackground: '#ffffff',
    fontFamily: 'inherit',
    actorBkg: '#ffffff',
    actorBorder: '#000000',
    actorTextColor: '#000000',
    actorLineColor: '#000000',
    noteBkg: '#ffffff',
    noteBorder: '#000000',
    noteBorderColor: '#000000',
    noteTextColor: '#000000',
    messageTextColor: '#000000',
    signalColor: '#000000',
    signalTextColor: '#000000',
    activationBkgColor: '#ffffff',
    activationBorderColor: '#000000',
    sequenceNumberColor: '#000000',
  }
});

export default function Mermaid({ chart }: { chart: string }) {
  const [svgStr, setSvgStr] = useState('');
  const id = useRef(`mermaid-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(id.current, chart);
        if (isMounted) {
          setSvgStr(svg);
        }
      } catch (err) {
        console.error("Mermaid parsing error", err);
      }
    };
    renderChart();
    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (!svgStr) {
    return (
      <div className="flex justify-center my-8 p-8 text-neutral-400 dark:text-neutral-600 animate-pulse text-sm font-mono font-bold tracking-widest uppercase">
        Drafting diagram...
      </div>
    );
  }

  return (
    <div 
      className="mermaid-wireframe flex justify-center my-8 overflow-x-auto dark:invert transition-all duration-300"
      dangerouslySetInnerHTML={{ __html: svgStr }} 
    />
  );
}
