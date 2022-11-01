import React from 'react';
import { css } from '@emotion/react';

type ButtonProps = {
  type?: 'primary' | 'default';
  htmlType?: 'submit' | 'reset' | 'button' | undefined;
  ghosted?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const buttonCss = css({
  transition: 'scale 0.1s, opacity 0.1s',
  '&:active': {
    scale: '0.98',
  },
});

const buttonTypesCss = {
  default: css({
    background: '#FFD748',
    padding: '5px 24px',
    color: '#423F45',
    borderRadius: '20px',
    fontSize: 16,
    fontWeight: 700,
  }),
  primary: css({
    background: '#38DF7A',
    color: '#FFFFFF',
    padding: '8px 45px',
    borderRadius: '12px',
    fontSize: 16,
    fontWeight: 700,
  }),
};

const ghostedCss = css({
  opacity: 0.5,
});

const Button: React.FC<ButtonProps> = ({
  type, htmlType, ghosted, children, onClick, className,
}) => (
  <button
    css={[buttonCss, ghosted && ghostedCss, type && buttonTypesCss[type]]}
    type={htmlType}
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
);

export default Button;
