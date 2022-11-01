import React from 'react';
import { css } from '@emotion/react';

type GradientBorderProps = {
  className?: string;
  children: React.ReactNode;
  width: string;
  radius: string;
  color: string;
};

const gradientCss = css({
  position: 'relative',
  backgroundClip: 'padding-box',
  zIndex: 10,
});

const GradientBorder: React.FC<GradientBorderProps> = ({
  className, children, radius, color, width,
}) => {
  const beforeCss = css({
    border: `${width} solid transparent`,
    borderRadius: radius,
    '&:before': {
      content: "''",
      position: 'absolute',
      inset: '0px',
      zIndex: -1,
      margin: `-${width}`,
      borderRadius: 'inherit',
      background: color,
    },
  });
  return (
    <div css={[gradientCss, beforeCss]} className={className}>{children}</div>
  );
};

export default GradientBorder;
