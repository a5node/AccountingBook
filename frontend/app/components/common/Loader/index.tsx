import React from 'react';
import cn from 'classnames';

import styles from './loader.module.css';
import { LoaderProps } from './props';

//https://cssloaders.github.io/
export const Loader: React.FC<LoaderProps> = ({ size = 'md', className }): React.JSX.Element => {
  return (
    <span
      className={cn(
        styles.loader,
        {
          [styles.sm]: size === 'sm',
          [styles.md]: size === 'md',
          [styles.lg]: size === 'lg',
        },
        className,
      )}
    ></span>
  );
};
