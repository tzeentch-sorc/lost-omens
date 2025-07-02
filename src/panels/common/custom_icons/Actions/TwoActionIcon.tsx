import React from 'react';

const TwoActionIcon = ({ style }) => (
  <span style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    {/* Replace below SVG with your custom icon */}
    <svg width="26" height="16" viewBox="0 0 58 36" fill="white">
      <g transform="translate(0.000000,36.000000) scale(0.100000,-0.100000)"
        stroke="none">
        <path d="M135 320 l-39 -40 49 -50 49 -50 -49 -50 -49 -50 42 -43 42 -42 92
93 93 92 -90 90 c-49 49 -92 90 -95 90 -3 0 -24 -18 -45 -40z"/>
        <path d="M390 305 l-34 -35 42 -42 42 -43 -45 -45 -45 -46 38 -37 38 -37 79
80 80 80 -80 80 -81 80 -34 -35z"/>
        <path d="M27 202 l-27 -28 28 -27 28 -27 29 30 29 30 -24 25 c-13 14 -26 25
-30 25 -3 0 -18 -13 -33 -28z"/>
      </g>
    </svg>
  </span>
);

export default TwoActionIcon;