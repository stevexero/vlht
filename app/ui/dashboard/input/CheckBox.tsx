export default function CheckBox({
  checked,
  onChange,
  label,
  labelPlacement = 'right',
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  labelPlacement?: 'top' | 'right' | 'bottom';
}) {
  const containerClasses = {
    top: 'flex flex-col-reverse items-center gap-1',
    right: 'flex items-center gap-2',
    bottom: 'flex flex-col items-center gap-1',
  };

  return (
    <div className={containerClasses[labelPlacement]}>
      <label className='flex items-center gap-2 cursor-pointer'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={checked}
            onChange={onChange}
            className='peer sr-only'
          />
          <div
            className={`
            h-5 w-5 rounded bg-white border border-gray-300 inset-shadow-2xs inset-shadow-gray-400/50
            transition-all duration-200 ease-in-out
            peer-checked:border-blue-500 peer-checked:bg-blue-500
            peer-focus:ring-2 peer-focus:ring-blue-200
            peer-hover:border-blue-400
            flex items-center justify-center cursor-pointer
          `}
          >
            <svg
              className={`
                h-3 w-3 text-white
                transition-all duration-200 ease-in-out
                ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
        </div>
        <span className='text-sm text-gray-700 select-none'>{label}</span>
      </label>
    </div>
  );
}
