export default function DashboardCard({
  title,
  containerStyles,
  titleStyles,
  children,
}: {
  title: string;
  containerStyles?: string;
  titleStyles?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex flex-col gap-2 bg-gradient-to-br from-white via-white to-neutral-100/50 shadow-lg shadow-gray-400/30 border border-neutral-400 rounded-lg p-4 overflow-hidden ${containerStyles}`}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none' />
      <div className='relative z-10'>
        <h3
          className={`text-lg font-bold text-gray-600 text-shadow-2xs text-shadow-white ${titleStyles}`}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
