import { useState } from 'react';

type BoardFormProps = {
  onAddBoard: (title: string) => void;
  onCancel: VoidFunction;
};

export default function BoardForm({ onAddBoard, onCancel }: BoardFormProps) {
  const [boardTitle, setBoardTitle] = useState('');

  return (
    <div className="flex flex-wrap items-center justify-center space-y-3">
      <input
        type="text"
        className="w-full p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => setBoardTitle(e.target.value)}
      />
      <div className="flex items-center justify-around w-full">
        <button
          className="w-16 py-1 font-bold text-gray-600 transition-colors duration-300 bg-green-300 rounded-md hover:bg-green-400"
          onClick={() => onAddBoard(boardTitle)}
        >
          Add
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
