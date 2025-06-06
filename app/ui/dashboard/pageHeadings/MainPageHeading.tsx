import LinkButton from '@/app/ui/dashboard/links/LinkButton';

export default function MainPageHeading({
  title,
  link,
  linkText,
}: {
  title: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className='flex justify-between items-center'>
      <h1 className='text-2xl font-bold text-gray-600 text-shadow-2xs text-shadow-white'>
        {title}
      </h1>
      <LinkButton href={link} className='mr-8'>
        {linkText}
      </LinkButton>
    </div>
  );
}
