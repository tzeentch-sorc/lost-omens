import React from 'react';
import SvgIconProps from './SvgIconProps.ts';

const SvgIcon = ({
    width = 0,
    height = 0,
    display = 'block',
    'aria-hidden': ariaHidden = true,
    className,
    fill,
    getRootRef,
    'style': propsStyle,
    title,
    children,
    ...restProps
  }: SvgIconProps) => {
    const size = Math.max(width, height);
  
    const style = {
      width,
      height,
      ...propsStyle,
    };
  
    return (
      <svg
        aria-hidden={ariaHidden}
        display={display}
        className={[
          'vkuiIcon',
          `vkuiIcon--${size}`,
          `vkuiIcon--w-${width}`,
          `vkuiIcon--h-${height}`,
          className,
        ]
          .join(' ')
          .trim()}
        width={width}
        height={height}
        style={{ fill: 'currentColor', color: fill, ...style }}
        ref={getRootRef}
        {...restProps}
      >
        {title && <title>{title}</title>}
        {children}
      </svg>
    );
  };

  
export default SvgIcon;