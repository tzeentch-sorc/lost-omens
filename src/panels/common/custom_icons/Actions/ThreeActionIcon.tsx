import React from 'react';

const ThreeActionIcon = ({ style }) => (
  <span style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    {/* Replace below SVG with your custom icon */}
    <svg width="16" height="16" viewBox="0 0 16 16" fill="black">
      <path d="M8 2C8 2 2 8 8 14C14 8 8 2 8 2ZM8 16C6.343 16 5 14.657 5 13H11C11 14.657 9.657 16 8 16Z"/>
    </svg>
  </span>
);

export default ThreeActionIcon;