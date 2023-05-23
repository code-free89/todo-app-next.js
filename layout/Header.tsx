import { useDispatch } from 'react-redux';
import { updateSearchString } from '../redux/global/globalSlice';

export default function AppHeader() {
  const dispatch = useDispatch();

  return (
    <main>
      <div className="flex items-center justify-between px-2 pb-5">
        <div className="text-2xl font-bold text-white">Trello Board</div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-bold text-white">Search : </div>
          <input
            type="text"
            className="p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => dispatch(updateSearchString(e.target.value))}
          />
        </div>
      </div>
    </main>
  );
}
