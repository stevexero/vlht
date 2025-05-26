export default function Loading() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-200'></div>
    </div>
  );
}
