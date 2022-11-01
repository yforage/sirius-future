import React from 'react';
import { useDrag } from 'react-dnd';

type DraggableProps<T> = {
  item: T;
  children: React.ReactNode;
  className?: string;
};

const Draggable: React.FC<DraggableProps<any>> = ({ children, item, className }) => {
  const [, drag] = useDrag(() => ({
    type: 'order-game-item',
    item,
  }));

  return (
    <div ref={drag} className={className}>
      {children}
    </div>
  );
};

export default Draggable;
