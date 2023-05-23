import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import ToDoCard from './ToDoCard';
import { ITodoBoard, ITodoCard } from '../models/todo';

type ToDoBoardProps = {
  board: ITodoBoard;
  cards: ITodoCard[];
  index: number;
  cardHandler: (cardId?: string) => void;
  searchText: string;
};

export default function ToDoBoard({
  board,
  cards,
  index,
  cardHandler,
  searchText,
}: ToDoBoardProps) {
  return (
    <Draggable draggableId={board.id} index={index}>
      {(provided) => (
        <div
          className="w-64 p-2 m-2 space-y-4 bg-gray-100 rounded h-content"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className="text-base font-semibold text-gray-600"
            {...provided.dragHandleProps}
          >
            {board.title}
          </div>
          <Droppable droppableId={board.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`space-y-2`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards
                  .filter((card) =>
                    card.title.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((card, index) => {
                    return (
                      <ToDoCard
                        key={card.id}
                        card={card}
                        index={index}
                        onClick={() => cardHandler(card.id)}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            className="flex items-center justify-center text-base font-semibold text-gray-600"
            onClick={() => cardHandler()}
          >
            <PlusCircleIcon className="w-5 h-5 mr-3" />
            Add another card
          </button>
        </div>
      )}
    </Draggable>
  );
}
