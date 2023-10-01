import React from 'react';
import cn from 'classnames';

import { LoaderIndicator } from './LoaderIndicator';
import { IndicatorProps } from './props';
import styles from './indicator.module.css';
import { LoaderIndicatorItem } from './LoaderIndicatorItem';

// //https://cssloaders.github.io/
// https://emojipedia.org/search/?q=Circle
export const Indicator: React.FC<IndicatorProps> = ({
  className,
  children,
  text,
  color,
  greenIcon,
  redIcon,
  loading,
  yellowIcon,
  size,
  loadingItem,
}): React.JSX.Element => {
  if (text) {
    return (
      <span
        className={cn(className, {
          [styles.lime]: color === 'green',
          [styles.red]: color === 'red',
        })}
      >
        {children}
      </span>
    );
  }
  if (greenIcon) return <span className={cn(className)}>{'🟢'}</span>;
  if (redIcon) return <span className={cn(className)}>{'🔴'}</span>;
  if (yellowIcon) return <span className={cn(className)}>{'🟡'}</span>;
  if (loading) return <LoaderIndicator size={size ? size : 'sm'} />;
  if (loadingItem) return <LoaderIndicatorItem />;
  return <>{children}</>;
};
