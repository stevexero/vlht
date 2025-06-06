export default function ButtonPrimary({
  type,
  className,
  children,
}: {
  type: 'button' | 'submit';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      className={`bg-gradient-to-br from-blue-300 to-blue-600 border border-blue-500 text-white font-semibold text-shadow-2xs text-shadow-blue-700 px-4 py-2 rounded-md hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-700 hover:border-blue-300 hover:scale-105 shadow-md shadow-gray-400 hover:shadow-lg hover:shadow-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
