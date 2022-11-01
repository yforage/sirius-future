import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Button from '../../src/components/Button';
import GradientBorder from '../../src/components/GradientBorder';
import OrderGame, { OrderGameProps } from '../../src/components/OrderGame';
import SliderInput from '../../src/components/SliderInput';

import startBg from '../../public/orderGame/startBg.png';
import { getRandomNumber } from '../../src/utils/generateRandomNumbers';

const pageCss = css({
  width: '100%',
  height: '100vh',
  margin: '0 auto',
});

const contentCss = css({
  maxWidth: '500px',
  margin: '0 auto',
});

const gameCss = {
  setup: css({
    padding: '30px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'Helvetica',
  }),
  content: css({
    padding: '30px',
    background: '#FFFFFF',
    fontSize: '24px',
    color: '#423F45',
    textAlign: 'center',
    borderRadius: '10px',
    '& > :not(:first-of-type)': {
      marginTop: '40px',
    },
    '& > :last-of-type': {
      marginTop: '60px',
    },
  }),
  buttons: css({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  }),
};

const qtyRange = ['2', '3', '4', '5'];
const valuesRange = ['A', '9', '19', '50', '99', '999'];
const themes: OrderGameProps['theme'][] = ['christmas', 'coins', 'flowers', 'pastry'];
const defaultValues: Omit<OrderGameProps, 'range' | 'onDone'> = {
  qty: Number(qtyRange[0]), value: valuesRange[0], order: 'asc', theme: 'pastry',
};

const Game: NextPage = () => {
  const [gameState, setGameState] = useState(defaultValues);
  const [play, setPlay] = useState(false);

  const handleProps = useCallback((qty: string) => setGameState((prev) => ({ ...prev, qty: Number(qty) })), []);
  const handleValues = useCallback((value: string) => setGameState((prev) => ({ ...prev, value })), []);
  const handleAsc = useCallback(() => setGameState((prev) => ({ ...prev, order: 'asc' })), []);
  const handleDesc = useCallback(() => setGameState((prev) => ({ ...prev, order: 'desc' })), []);

  const handlePlay = useCallback(() => {
    const randomNumber = getRandomNumber(0, themes.length - 1);
    const randomTheme = themes[randomNumber];
    setGameState((prev) => ({ ...prev, theme: randomTheme }));
    setPlay(true);
  }, []);

  const handleReset = useCallback(() => {
    setPlay(false);
    setGameState(defaultValues);
  }, []);

  return (
    <div css={pageCss}>
      <div css={contentCss}>
        {!play && (
          <div css={gameCss.setup}>
            <Image src={startBg} fill alt="" />
            <GradientBorder
              width="10px"
              radius="15px"
              color="linear-gradient(198.7deg, #7F75F0 -40.02%, #101F32 96.22%), linear-gradient(0deg, #FFFFFF, #FFFFFF)"
            >
              <div css={gameCss.content}>
                <SliderInput title="Кол-во предметов" range={qtyRange} onChange={handleProps} />
                <SliderInput title="Значения" range={valuesRange} onChange={handleValues} />
                <div css={gameCss.buttons}>
                  <Button type="default" ghosted={gameState.order === 'desc'} onClick={handleAsc}>По возрастанию</Button>
                  <Button type="default" ghosted={gameState.order === 'asc'} onClick={handleDesc}>По убыванию</Button>
                </div>
                <div>
                  <Button onClick={handlePlay} type="primary">Играть</Button>
                </div>
              </div>
            </GradientBorder>
          </div>
        )}
        {play && (
          <OrderGame {...gameState} range={valuesRange} onDone={handleReset} />
        )}
      </div>
    </div>
  );
};

export default Game;
