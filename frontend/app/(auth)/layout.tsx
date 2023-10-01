import { AuthLayout } from './components';

export const metadata = {
  title: 'Auth',
  description: 'some',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <AuthLayout>{children}</AuthLayout>;
}
