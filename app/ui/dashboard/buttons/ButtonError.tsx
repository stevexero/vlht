export default function ButtonError({
  type,
  className,
  children,
  onClick,
  disabled,
}: {
  type: 'button' | 'submit';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`bg-gradient-to-br from-red-300 to-red-600 border border-red-500 text-white font-semibold text-shadow-2xs text-shadow-red-700 px-4 py-2 rounded-md shadow-md shadow-gray-400 ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-gradient-to-br hover:from-red-400 hover:to-red-700 hover:border-red-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 cursor-pointer'
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
