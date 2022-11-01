import React from 'react';
import { css } from '@emotion/react';
import Button from '../Button';
import GradientBorder from '../GradientBorder';

const endScreenCss = {
  window: css({
    position: 'absolute',
    inset: '0px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.3)',
  }),
  contentContainer: css({
    width: '90%',
    zIndex: 10,
  }),
  content: css({
    padding: 20,
    background: '#FFFFFF',
    fontFamily: 'Circe Rounded',
    fontSize: 30,
    textAlign: 'center',
    borderRadius: '10px',
    '& :last-child': {
      marginTop: 50,
    },
  }),
  title: css({
    background: 'linear-gradient(180deg, #FFF9D8 8.65%, #FFE44F 69.58%)',
    filter: 'drop-shadow(0 0 5px #1E813A)',
    backgroundClip: 'text',
    color: 'transparent',
    fontSize: 90,
    fontWeight: '800',
  }),
  text: css({
    color: '#5F40A1',
  }),
  button: css({
    background: '#2BD600',
    color: '#FFFFFF',
    borderRadius: '15px',
    padding: '5px 40px',
    fontWeight: '800',
  }),
};

type GameEndModalProps = {
  type: 'win' | 'lose';
  onClick: () => void;
};

const GameEndModal: React.FC<GameEndModalProps> = ({ type, onClick }) => {
  const texts = {
    win: {
      title: 'Победа!',
      text: 'Молодец! Ты успешно справился с заданием!',
    },
    lose: {
      title: 'Неудачно',
      text: 'В этот раз не получилось :( Стоит попробовать еще раз!',
    },
  };

  return (
    <div css={endScreenCss.window}>
      <GradientBorder
        css={endScreenCss.contentContainer}
        width="10px"
        radius="15px"
        color="linear-gradient(180deg, #67DF89 0%, rgba(141, 103, 223, 0) 100%),
        radial-gradient(384.16% 384.16% at 50% 50%, #FFFFFF 12.29%, #AA92D2 21.15%)"
      >
        <div css={endScreenCss.content}>
          <div css={endScreenCss.title}>{texts[type].title}</div>
          <div css={endScreenCss.text}>{texts[type].text}</div>
          <Button css={endScreenCss.button} onClick={onClick}>
            Заново
          </Button>
        </div>
      </GradientBorder>
    </div>
  );
};

export default GameEndModal;
