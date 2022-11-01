import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';

import Draggable from '../Draggable';
import Droppable from '../Droppable';
import GameEndModal from '../GameEndModal';
import OrderArrow from '../OrderArrow';
import ReactDndProvider from '../ReactDndProvider';
import generateRandomLetters from '../../utils/generateRandomLetters';
import {
  generateRandomNumbers,
  getRandomNumber,
} from '../../utils/generateRandomNumbers';
import TextBorder from '../TextBorder';

import pastryBg from '../../../public/orderGame/pastry/bg.png';
import christmasBg from '../../../public/orderGame/christmas/bg.png';
import coinsBg from '../../../public/orderGame/coins/bg.png';
import flowersBg from '../../../public/orderGame/flowers/bg.png';

export type OrderGameProps = {
  qty: number;
  range: string[];
  value: string;
  order: 'asc' | 'desc';
  onDone: () => void;
  theme: 'christmas' | 'coins' | 'flowers' | 'pastry';
  reserved?: number;
};

type DndItemType = {
  content: string;
  bgIndex: number;
};

const gameCss = css({
  position: 'relative',
  padding: 20,
  fontFamily: 'Calibri',
  '& > :not(:first-of-type):not(:last-of-type)': {
    marginBottom: '20px',
  },
});

const startCss = {
  items: css({
    height: '250px',
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'center',
    maxHeight: '50%',
    gap: 20,
    '& > :nth-child(even)': {
      aspectRatio: 'auto',
    },
  }),
  chessOrder: css({
    '& > :nth-child(odd)': {
      alignSelf: 'flex-end',
    },
  }),
  chessOrderAndEdgeCenter: css({
    '& > :first-child, & > :last-child': {
      alignSelf: 'center',
    },
  }),
};

const draggableCss = css({
  maxWidth: '80px',
  maxHeight: '80px',
  aspectRatio: '1/1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1 0 0px',
  cursor: 'pointer',
  fontSize: '32px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  zIndex: 10,
});

const dropFormCss = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 5,
  borderRadius: '20px',
  padding: '15px',
});

const dropItemsPastryCss = css({
  backgroundColor: '#D9D9D9',
  boxShadow: 'inset 0 0 0px 8px rgba(0, 0, 0, 0.1)',
  '& > img': {
    opacity: '0.12',
  },
});

const dropItemsChristmasCss = css({
  background:
    'radial-gradient(238.96% 238.96% at 50% 54.28%, #B7AFCC 0%, #392D58 100%)',
});

const themeSets = {
  christmas: {
    bg: css({ backgroundColor: '#132738' }),
    drop: dropItemsChristmasCss,
    bgImage: christmasBg,
  },
  coins: {
    bg: css({ backgroundColor: '#3A1F36' }),
    drop: null,
    bgImage: coinsBg,
  },
  flowers: {
    bg: css({ backgroundColor: '#132738' }),
    drop: null,
    bgImage: flowersBg,
  },
  pastry: {
    bg: css({ backgroundColor: '#DEC6AA' }),
    drop: dropItemsPastryCss,
    bgImage: pastryBg,
  },
};

const maxItems: Record<OrderGameProps['theme'], number> = {
  christmas: 4,
  coins: 3,
  flowers: 5,
  pastry: 4,
};

const OrderGame: React.FC<OrderGameProps> = ({
  qty,
  range,
  value,
  order,
  onDone,
  theme,
  reserved = 1,
}) => {
  const [items, setItems] = useState<DndItemType[]>([]);
  const [result, setResult] = useState<Record<number, DndItemType>>({});
  const [isWin, setIsWin] = useState<boolean | null>(null);

  useEffect(() => {
    let random: string[] = [];

    if (Number.isNaN(Number(value))) {
      random = generateRandomLetters(qty + reserved);
    } else {
      const index = range.indexOf(value);
      const min = (Number(range[index - 1]) || 0) + 1;
      const max = Number(value);
      random = generateRandomNumbers(qty + reserved, min, max).map((number) => number.toString());
    }
    const reservedIndex = order === 'asc' ? 0 : random.length - 1;
    const reservedValue = [...random].sort()[reservedIndex];

    const randomItems = random
      .filter((el) => el !== reservedValue)
      .map((content) => ({
        content,
        bgIndex: getRandomNumber(1, maxItems[theme]),
      }));

    setItems(randomItems);
    setResult({
      [reservedIndex]: {
        content: reservedValue,
        bgIndex: getRandomNumber(1, maxItems[theme]),
      },
    });
  }, [range, value, qty, theme, order, reserved]);

  useEffect(() => {
    const droppedItems = Object.values(result);

    if (droppedItems.length !== qty + reserved) return;

    const values = droppedItems.map((item) => item.content);

    const sorted = [...values].sort();

    if (values.toString() === sorted.toString()) {
      setIsWin(true);
    } else {
      setIsWin(false);
    }
  }, [result, items, qty, onDone, reserved]);

  const handleDrop = useCallback(
    (index: number, { content, bgIndex }: DndItemType) => {
      setResult((prev) => ({ ...prev, [index]: { content, bgIndex } }));
      setItems((prev) => prev.filter((prevItem) => prevItem.content !== content));
    },
    [],
  );

  const startItems = useMemo(
    () => items.map((item) => {
      const bgCss = css({
        backgroundImage: `url('/orderGame/${theme}/item-${item.bgIndex}.svg');`,
      });

      return (
        <Draggable css={[draggableCss, bgCss]} key={item.content} item={item}>
          <TextBorder color="#FFFFFF" background="#242546">
            {item.content}
          </TextBorder>
        </Draggable>
      );
    }),
    [items, theme],
  );

  const resultItems = useMemo(
    () => Array.from({ length: qty + reserved }).map((_, index) => {
      const bgCss = css({
        backgroundImage: `url('/orderGame/${theme}/item-${result[index]?.bgIndex}.svg');`,
      });

      return (
        <Droppable
          css={draggableCss}
          key={index}
          index={index}
          onDrop={handleDrop}
        >
          {result[index] && (
          <div css={[draggableCss, bgCss]}>
            <TextBorder color="#FFFFFF" background="#242546">
              {result[index].content}
            </TextBorder>
          </div>
          )}
        </Droppable>
      );
    }),
    [result, qty, handleDrop, theme, reserved],
  );

  return (
    <ReactDndProvider>
      <div css={[gameCss, themeSets[theme].bg]}>
        <Image
          style={{
            position: 'absolute',
            width: '100%',
            height: 'auto',
            inset: '0px',
            objectFit: 'contain',
          }}
          alt="items"
          src={themeSets[theme].bgImage}
        />
        <div
          css={[
            startCss.items,
            items.length > 2 && startCss.chessOrder,
            !(items.length % 5) && startCss.chessOrderAndEdgeCenter,
          ]}
        >
          {startItems}
        </div>
        <OrderArrow direction={order === 'asc' ? 'right' : 'left'}>
          <TextBorder color="#FFFFFF" background="#242546">
            {order === 'asc' ? 'По возрастанию' : 'По убыванию'}
          </TextBorder>
        </OrderArrow>
        <div css={[dropFormCss, themeSets[theme].drop]}>
          <Image alt="items" src={`/orderGame/${theme}/form.png`} fill />
          {resultItems}
        </div>
        {isWin !== null && (
          <GameEndModal type={isWin ? 'win' : 'lose'} onClick={onDone} />
        )}
      </div>
    </ReactDndProvider>
  );
};

export default React.memo(OrderGame);
