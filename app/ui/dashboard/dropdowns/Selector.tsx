export default function Selector({
  id,
  options,
  selectedValue,
  setSelectedValue,
  defaultOptionValue,
  defaultOptionLabel,
  className,
  label,
}: {
  id: string;
  options: { key: string; label: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  defaultOptionValue: string;
  defaultOptionLabel: string;
  className?: string;
  label?: string;
}) {
  const sanitizeLabel = (text: string) => {
    return text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  };

  const inputId = label ? sanitizeLabel(label) : 'selector';
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={inputId} className='text-sm text-gray-500 ml-0.5'>
        {label}
      </label>
      <select
        name={id}
        id={id}
        className={`w-full p-2 bg-white border border-gray-300 rounded-lg shadow-xs shadow-gray-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer ${className}`}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {options.length > 0 ? (
          options.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))
        ) : (
          <option value={defaultOptionValue}>{defaultOptionLabel}</option>
        )}
      </select>
    </div>
  );
}
