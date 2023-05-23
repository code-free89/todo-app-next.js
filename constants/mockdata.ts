import { ITodo } from '../models/todo';

const initialData: ITodo = {
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Take out the garbage',
      description: '',
      options: [],
    },
    'card-2': {
      id: 'card-2',
      title: 'Watch my favorite show',
      description: '',
      options: [],
    },
    'card-3': {
      id: 'card-3',
      title: 'Charge my phone',
      description: '',
      options: [],
    },
    'card-4': {
      id: 'card-4',
      title: 'Cook dinner',
      description: '',
      options: [],
    },
  },
  boards: {
    'board-1': {
      id: 'board-1',
      title: 'To Do',
      cardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
    },
    'board-2': {
      id: 'board-2',
      title: 'In progress',
      cardIds: [],
    },
    'board-3': {
      id: 'board-3',
      title: 'Done',
      cardIds: [],
    },
  },
  // Facilitate reordering of the boards
  boardOrder: ['board-1', 'board-2', 'board-3'],
};

export default initialData;
