import React from 'react';

const OneActionIcon = ({ style }) => (
  <span style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>

    <svg width="16" height="16" viewBox="0 0 36 36" fill="white">
      <g transform="translate(0.000000,36.000000) scale(0.100000,-0.100000)"
        stroke="none">
        <path d="M135 320 l-39 -40 49 -50 49 -50 -49 -50 -49 -50 42 -43 42 -42 92
93 93 92 -90 90 c-49 49 -92 90 -95 90 -3 0 -24 -18 -45 -40z"/>
        <path d="M27 202 l-27 -28 30 -29 30 -29 30 29 30 29 -27 28 c-15 15 -30 28
-33 28 -3 0 -18 -13 -33 -28z"/>
      </g>
    </svg>
  </span>
);

export default OneActionIcon;