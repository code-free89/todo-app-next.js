import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';

import ToDoBoard from '../components/Board';
import AppLayout from '../layout/AppLayout';
import BoardForm from '../modules/BoardForm';
import CardForm from '../modules/CardForm';
import {
  addBoard,
  addCard,
  updateBoard,
  updateBoardOrder,
  updateCard,
} from '../redux/todo/todoSlice';
import { selectGlobalData } from '../redux/global/selector';
import { selectToDoData } from '../redux/todo/selector';
import { ITodoBoard } from '../models/todo';

const ReusableModal = dynamic(() => import('../components/ReusableModal'), {
  ssr: false,
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedCard, setSelectedCard] = useState('');

  const todoData = useSelector(selectToDoData);
  const globalData = useSelector(selectGlobalData);
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;
    //If there is no destination
    if (!destination) {
      return;
    }

    //If source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //If you're dragging boards
    if (type === 'column') {
      const newBoardOrder = Array.from(todoData.boardOrder);
      newBoardOrder.splice(source.index, 1);
      newBoardOrder.splice(destination.index, 0, draggableId);
      dispatch(updateBoardOrder(newBoardOrder));
      return;
    }

    //Anything below this happens if you're dragging cards
    const startBoard = todoData.boards[source.droppableId];
    const endBoard = todoData.boards[destination.droppableId];

    //If dropped inside the same board
    if (startBoard.id === endBoard.id) {
      const newCardIds = Array.from(startBoard.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newBoard: ITodoBoard = {
        ...startBoard,
        cardIds: newCardIds,
      };
      dispatch(
        updateBoard({
          ...todoData.boards,
          [newBoard.id]: newBoard,
        })
      );
      return;
    }

    //If dropped in a different board
    const startBoardCardIds = Array.from(startBoard.cardIds);
    startBoardCardIds.splice(source.index, 1);
    const newStartBoard: ITodoBoard = {
      ...startBoard,
      cardIds: startBoardCardIds,
    };

    const endBoardCardIds = Array.from(endBoard.cardIds);
    endBoardCardIds.splice(destination.index, 0, draggableId);
    const newEndBoard: ITodoBoard = {
      ...endBoard,
      cardIds: endBoardCardIds,
    };

    dispatch(
      updateBoard({
        ...todoData.boards,
        [newStartBoard.id]: newStartBoard,
        [newEndBoard.id]: newEndBoard,
      })
    );
    return;
  };

  return (
    <div className="w-screen h-screen p-5 bg-blue-400">
      <AppLayout>
        <div className="flex w-full overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  className="flex"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todoData.boardOrder.map((boardId, index) => {
                    const todoBoard = todoData.boards[boardId];
                    const boardCards = todoBoard.cardIds.map(
                      (cardId) => todoData.cards[cardId]
                    );
                    return mounted ? (
                      <ToDoBoard
                        key={todoBoard.id}
                        board={todoBoard}
                        cards={boardCards}
                        index={index}
                        cardHandler={(id?: string) => {
                          setSelectedBoard(todoBoard.id);
                          setSelectedCard(id ? id : '');
                          setShowCardForm(true);
                        }}
                        searchText={globalData.searchString}
                      />
                    ) : (
                      <></>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex items-center justify-center w-64 p-2 m-2 space-y-4 bg-gray-100 rounded min-w-64 h-content">
            {showBoardForm ? (
              <BoardForm
                onAddBoard={(title: string) => {
                  dispatch(addBoard(title));
                  setShowBoardForm(false);
                }}
                onCancel={() => setShowBoardForm(false)}
              />
            ) : (
              <button
                className="flex items-center justify-center text-base font-semibold text-gray-600"
                onClick={() => setShowBoardForm(true)}
              >
                <PlusCircleIcon className="w-5 h-5 mr-3" />
                Add another board
              </button>
            )}
          </div>

          <ReusableModal
            isOpen={showCardForm}
            closeModal={() => setShowCardForm(false)}
            title={!!selectedCard ? 'Edit Card' : 'Add Card'}
          >
            <CardForm
              selectedCard={selectedCard}
              onCardHandler={(title, description, options, isEdit) => {
                if (isEdit) {
                  dispatch(
                    updateCard({
                      cardId: selectedCard,
                      title,
                      description,
                      options,
                    })
                  );
                  setShowCardForm(false);
                  return;
                }
                dispatch(
                  addCard({
                    boardId: selectedBoard,
                    title,
                    description,
                    options,
                  })
                );
                setShowCardForm(false);
              }}
              onCancel={() => setShowCardForm(false)}
            />
          </ReusableModal>
        </div>
      </AppLayout>
    </div>
  );
}
