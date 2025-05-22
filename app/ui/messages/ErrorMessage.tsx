interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='text-red-500 text-sm'>
      <span className='font-bold'>*</span>
      {message}
    </div>
  );
}
