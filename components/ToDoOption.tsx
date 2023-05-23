type TodoOptionProps = {
  isChecked: boolean;
  setChecked: (checked: boolean) => void;
  description: string;
};

export default function ToDoOption({
  isChecked,
  setChecked,
  description,
}: TodoOptionProps) {
  return (
    <label
      className={`flex items-center space-x-2 w-full ${
        isChecked ? 'line-through' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setChecked(!isChecked)}
        className="mt-0.5"
      />
      <span className={isChecked ? 'text-gray-400' : 'text-black'}>
        {description}
      </span>
    </label>
  );
}
