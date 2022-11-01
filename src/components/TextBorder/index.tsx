import React from 'react';
import { css } from '@emotion/react';
import getTextBorder from '../../utils/getTextBorder';

type TextBorderProps = {
  color: string;
  background: string;
  children: React.ReactNode;
};

const TextBorder: React.FC<TextBorderProps> = ({
  color,
  background,
  children,
}) => {
  const textBorderCss = css({
    color,
    textShadow: getTextBorder(background, 2),
  });

  return <span css={textBorderCss}>{children}</span>;
};

export default TextBorder;
