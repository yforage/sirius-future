import React from 'react';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Link from 'next/link';
import Button from '../src/components/Button';

const homeCss = css({
  fontFamily: 'Helvetica',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '30px',
  textAlign: 'center',
  padding: '20px',
});

const Home: NextPage = () => (
  <div css={homeCss}>
    <h1>Добро пожаловать в игру</h1>
    <p>Ваша цель расставить элементы в выбранном порядке</p>
    <Link href="/game">
      <Button type="primary">Играть</Button>
    </Link>
  </div>
);

export default Home;
