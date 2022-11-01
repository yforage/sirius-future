import React from 'react';
import { css } from '@emotion/react';

type OrderArrowProps = {
  direction: 'left' | 'right';
  children: React.ReactNode;
};

const leftArrowCss = css({
  left: '100%',
});

const rightArrowCss = css({
  right: '100%',
});

const OrderArrow: React.FC<OrderArrowProps> = ({ direction, children }) => {
  const isReverse = direction === 'left';

  const orderCss = css({
    display: 'flex',
    justifyContent: isReverse ? 'flex-end' : 'flex-start',
    color: '#FFFFFF',
    fontSize: '20px',
    '& > span': {
      position: 'relative',
    },
  });

  const arrowCss = css({
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100%',
    transform: `${
      isReverse ? 'translateX(70%) scale(-1.5)' : 'translateX(-70%) scale(1.5)'
    }`,
  });

  return (
    <div css={orderCss}>
      <span>
        {children}
        <svg
          css={[arrowCss, isReverse ? rightArrowCss : leftArrowCss]}
          width="358"
          height="69"
          viewBox="0 0 358 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M294.278 0L357.5 34.3222L294.278 68.6443V50.3945H0V18.2499H294.278V0Z"
            fill="url(#paint0_linear_1_1791)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_1791"
              x1="311.5"
              y1="68.636"
              x2="103"
              y2="13.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FEFFDE" />
              <stop offset="0.625112" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </span>
    </div>
  );
};

export default OrderArrow;
