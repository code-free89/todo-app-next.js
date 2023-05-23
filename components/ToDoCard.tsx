import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { ITodoCard } from '../models/todo';

type ToDoCardProps = {
  card: ITodoCard;
  index: number;
  onClick: VoidFunction;
};

export default function ToDoCard({ card, index, onClick }: ToDoCardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="p-2 text-gray-500 bg-white rounded shadow-sm hover:bg-gray-50"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={onClick}
        >
          <div className="font-bold">{card.title}</div>
          <div className="ml-2">{card.description ?? ''}</div>
        </div>
      )}
    </Draggable>
  );
}
