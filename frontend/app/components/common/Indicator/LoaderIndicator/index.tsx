import React from 'react';
import cn from 'classnames';

import styles from './loaderIndicator.module.css';
import { LoaderIndicatorProps } from './props';

//https://cssloaders.github.io/
export const LoaderIndicator: React.FC<LoaderIndicatorProps> = ({ size = 'sm' }): React.JSX.Element => {
  return (
    <span
      className={cn(styles.loader, {
        [styles.sm]: size === 'sm',
        [styles.md]: size === 'md',
        [styles.lg]: size === 'lg',
      })}
    ></span>
  );
};
