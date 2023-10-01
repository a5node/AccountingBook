'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@chakra-ui/next-js';

import { ActiveLinkProps } from './props';

export const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href, activeLinkClass }): React.JSX.Element => {
  const pathname = usePathname();

  return (
    <Link variant={pathname === href && !activeLinkClass ? 'active' : 'unactive'} href={href}>
      {children}
    </Link>
  );
};
