import './globals.css';
import styles from './wrapper.module.css';
import { AppProvider } from './contexts';

export const metadata = {
  title: 'ABook',
  description: 'some',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className={styles.wrapper}>{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
