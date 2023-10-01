import React from 'react';
import cn from 'classnames';

import styles from './loaderIndicatorItem.module.css';
import { LoaderIndicatorItemProps } from './props';

//https://cssloaders.github.io/
export const LoaderIndicatorItem: React.FC<LoaderIndicatorItemProps> = (): React.JSX.Element => {
  return <span className={cn(styles.loader)}></span>;
};
