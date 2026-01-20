import React, { useRef, useEffect, useState } from 'react';

const Marquee = ({ text, repeat = 2, speed = 6, rightPadding = 60 }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [scrollCount, setScrollCount] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (container && textEl && textEl.scrollWidth > container.offsetWidth) {
      setShouldScroll(true);
      setScrollCount(0);

      const scroll = () => {
        if (scrollCount >= repeat) return;
        textEl.style.transition = `transform ${speed}s linear`;
        textEl.style.transform = `translateX(-${textEl.scrollWidth - container.offsetWidth + rightPadding}px)`;
        timeoutRef.current = setTimeout(() => {
          textEl.style.transition = 'none';
          textEl.style.transform = 'translateX(0)';
          setScrollCount((c) => c + 1);
          setTimeout(scroll, 1000);
        }, speed * 1000 + 1000);
      };

      scroll();
      return () => clearTimeout(timeoutRef.current);
    }
  }, [text, speed, repeat, rightPadding]);

  const handleClick = () => {
    clearTimeout(timeoutRef.current);
    setScrollCount(0);
    setShouldScroll(false);
    setTimeout(() => setShouldScroll(true), 100); // restart scroll on click
  };

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        width: `calc(100% - ${rightPadding}px)`, // reserve space for VK icons
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      onClick={handleClick}
    >
      <span
        ref={textRef}
        style={{
          display: 'inline-block',
          willChange: 'transform',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default Marquee;