import React from 'react';
import { css } from '@emotion/react';
import { useDrop } from 'react-dnd';

type DroppableProps<T> = {
  index: number;
  onDrop: (index: number, item: T) => void;
  children?: React.ReactNode;
  className?: string;
};

const droppableCss = css({
  position: 'relative',
  boxShadow: '0px 4px 25px 0px #00000040 inset',
  borderRadius: '50%',
  cursor: 'default',
});

const Droppable: React.FC<DroppableProps<any>> = ({
  index, onDrop, children, className,
}) => {
  const [, drop] = useDrop(() => ({
    accept: 'order-game-item',
    drop: (item) => {
      onDrop(index, item);
    },
  }));

  return (
    <div css={droppableCss} ref={drop} className={className}>
      {children}
    </div>
  );
};

export default Droppable;
