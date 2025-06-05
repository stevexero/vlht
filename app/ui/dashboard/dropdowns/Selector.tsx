export default function Selector({
  id,
  options,
  selectedValue,
  setSelectedValue,
  defaultOptionValue,
  defaultOptionLabel,
  className,
}: {
  id: string;
  options: { key: string; label: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  defaultOptionValue: string;
  defaultOptionLabel: string;
  className?: string;
}) {
  return (
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
  );
}
