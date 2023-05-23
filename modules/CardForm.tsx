import { PlusCircleIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ToDoOption from '../components/ToDoOption';
import { ITodoOption } from '../models/todo';
import { selectToDoData } from '../redux/todo/selector';

type CardFormProps = {
  onCardHandler: (
    title: string,
    description: string,
    options: ITodoOption[],
    isEdit: boolean
  ) => void;
  onCancel: VoidFunction;
  selectedCard: string;
};

export default function CardForm({
  onCardHandler,
  onCancel,
  selectedCard,
}: CardFormProps) {
  const todoData = useSelector(selectToDoData);
  console.log('selectedCard: ', todoData.cards[selectedCard]);
  const [cardTitle, setCardTitle] = useState(
    !!selectedCard ? todoData.cards[selectedCard].title : ''
  );
  const [cardDescription, setCardDescription] = useState(
    !!selectedCard ? todoData.cards[selectedCard].description : ''
  );
  const [showOptionForm, setShowOptionForm] = useState(false);
  const [optionDescription, setOptionDescription] = useState('');

  const [options, setOptions] = useState<ITodoOption[]>(
    !!selectedCard ? todoData.cards[selectedCard].options : []
  );

  return (
    <div className="flex flex-wrap items-center">
      <label className="mt-4 text-sm font-medium">Title</label>
      <input
        type="text"
        className="w-full p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
        value={cardTitle}
        onChange={(e) => {
          setCardTitle(e.target.value);
        }}
      />

      <label className="mt-2 text-sm font-medium">Description</label>
      <input
        type="text"
        className="w-full p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
        value={cardDescription}
        onChange={(e) => {
          setCardDescription(e.target.value);
        }}
      />

      <div className="flex flex-col w-full mt-2 space-y-1">
        {options.map((option, index) => (
          <ToDoOption
            key={option.id}
            isChecked={option.isChecked}
            setChecked={(checked) => {
              const newOption = { ...option, isChecked: checked };
              console.log('newOption: ', newOption);
              const newOptions = [...options];
              newOptions.splice(index, 1, newOption);
              setOptions([...newOptions]);
            }}
            description={option.description}
          />
        ))}
      </div>

      {showOptionForm ? (
        <div className="flex items-center w-full space-x-2">
          <input
            type="text"
            className="flex-1 p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setOptionDescription(e.target.value)}
          />
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => {
              setOptions([
                ...options,
                {
                  id: Math.random().toString(),
                  description: optionDescription,
                  isChecked: false,
                },
              ]);
              setShowOptionForm(false);
            }}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      ) : null}

      <button
        className="flex items-center mt-2 space-x-1"
        onClick={() => setShowOptionForm(true)}
      >
        <PlusCircleIcon className="w-5 h-5 text-gray-500" />
        <span className="text-sm">Add Option</span>
      </button>
      <div className="flex items-center justify-around w-full mt-8">
        <button
          className="w-16 py-1 font-bold text-gray-600 transition-colors duration-300 bg-green-300 rounded-md hover:bg-green-400"
          onClick={() =>
            onCardHandler(
              cardTitle,
              cardDescription,
              options,
              !!selectedCard ? true : false
            )
          }
        >
          {!!selectedCard ? 'Save' : 'Add'}
        </button>
        <button
          className="w-16 py-1 font-bold text-gray-700 transition-colors duration-300 bg-gray-300 rounded-md hover:bg-gray-400"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
