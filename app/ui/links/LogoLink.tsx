import Link from 'next/link';
import Image from 'next/image';

interface LogoLinkProps {
  className?: string;
  href?: string;
  pathname?: string;
}

export default function LogoLink({
  className = '',
  href = '/',
  pathname = '/',
}: LogoLinkProps) {
  const content = (
    <Image
      src='/images/z_vlht_logo.png'
      alt='Vegas Luxury Home Tours'
      width={70}
      height={40}
    />
  );

  if (href) {
    return (
      <Link
        href={pathname === '/dashboard' ? '/dashboard' : href}
        className={`flex items-center font-bold focus:outline-none focus:text-gray-400 underline hover:opacity-80 focus:opacity-80 transition-all duration-300 ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`flex items-center font-bold ${className}`}>{content}</div>
  );
}
