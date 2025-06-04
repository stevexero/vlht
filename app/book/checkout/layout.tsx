export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='w-full min-h-screen flex justify-center'>
        <main className='w-full bg-gray-100 flex justify-center'>
          {children}
        </main>
      </div>
    </div>
  );
}
