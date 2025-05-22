import Link from 'next/link';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
}

export default function SocialLink({ href, icon, className }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target='_blank'
      className={`text-white hover:text-amber-300 transition-colors duration-300 ${className}`}
    >
      {icon}
    </Link>
  );
}
