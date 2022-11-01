import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

type ReactDndProviderProps = {
  children: React.ReactNode;
};

const ReactDndProvider: React.FC<ReactDndProviderProps> = ({ children }) => {
  if ('ontouchstart' in window) {
    return <DndProvider backend={TouchBackend}>{children}</DndProvider>;
  }
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default ReactDndProvider;
