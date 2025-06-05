export default function TextInput({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
      className={`w-full p-2 bg-white border border-gray-300 rounded-lg inset-shadow-2xs inset-shadow-gray-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400 ${className}`}
    />
  );
}
