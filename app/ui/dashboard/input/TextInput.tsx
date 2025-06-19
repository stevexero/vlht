export default function TextInput({
  value,
  onChange,
  className,
  label,
  disabled,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}) {
  const sanitizeLabel = (text: string) => {
    return text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  };

  const inputId = label ? sanitizeLabel(label) : 'text-input';
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={inputId} className='text-sm text-gray-500 ml-0.5'>
        {label}
      </label>
      <input
        id={inputId}
        type='text'
        value={value}
        onChange={onChange}
        className={`w-full p-2 border border-gray-300 rounded-lg inset-shadow-2xs inset-shadow-gray-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } ${className}`}
        disabled={disabled}
      />
    </div>
  );
}
