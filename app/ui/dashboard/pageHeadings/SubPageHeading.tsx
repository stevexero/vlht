import BackLinkButton from '@/app/ui/dashboard/links/BackLinkButton';

export default function SubPageHeading({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <div className='flex items-center gap-4'>
      <BackLinkButton href={href} />
      <h1 className='text-2xl font-bold text-gray-600 text-shadow-2xs text-shadow-white'>
        {title}
      </h1>
    </div>
  );
}
