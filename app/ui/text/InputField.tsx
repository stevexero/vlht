interface InputFieldProps {
  label?: string;
  name?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  light?: boolean;
}

export default function InputField({
  label = '',
  name = '',
  id = '',
  type = 'text',
  placeholder = '',
  required = false,
  className = '',
  disabled = false,
  light = true,
}: InputFieldProps) {
  return (
    <>
      <label
        className={`text-sm -mb-2 ${light ? 'text-gray-600' : 'text-gray-900'}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        aria-required={required}
        className={`text-black rounded-lg ${
          light ? 'bg-gray-100 border border-gray-900' : 'bg-gray-200'
        } p-2 mb-2 focus:outline-cyan-500 active:outline-cyan-500 ${className} ${
          disabled ? 'bg-gray-300' : ''
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  );
}
