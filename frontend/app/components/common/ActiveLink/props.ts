import { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

export interface ActiveLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  activeLinkClass?: 'active';
  href: string;
}
