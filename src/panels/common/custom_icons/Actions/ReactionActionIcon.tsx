import React from 'react';

const ReactionActionIcon = ({ style }) => (
  <span style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <svg width="16" height="16" viewBox="0 0 34 30" fill="white">
      <g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
        stroke="none">
        <path d="M66 285 c-63 -22 -61 -31 8 -27 35 2 80 -1 99 -7 99 -33 118 -130 34
-181 -29 -18 -30 -20 -9 -20 55 0 129 57 138 106 19 99 -140 176 -270 129z"/>
        <path d="M92 71 l-62 -38 75 -15 c66 -13 93 -11 66 6 -5 3 -8 24 -7 46 0 22
-1 40 -4 40 -3 -1 -33 -18 -68 -39z"/>
      </g>
    </svg>
  </span>
);

export default ReactionActionIcon;