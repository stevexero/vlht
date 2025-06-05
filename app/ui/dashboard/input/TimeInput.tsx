export default function TimeInput({
  value,
  onChange,
  className,
  label,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
}) {
  const sanitizeLabel = (text: string) => {
    return text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  };

  const inputId = label ? sanitizeLabel(label) : 'time-input';

  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={inputId} className='text-sm text-gray-500 ml-0.5'>
        {label}
      </label>
      <input
        id={inputId}
        type='time'
        value={value}
        onChange={onChange}
        className={`w-full p-2 bg-white border border-gray-300 rounded-lg inset-shadow-2xs inset-shadow-gray-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400 ${className}`}
      />
    </div>
  );
}
