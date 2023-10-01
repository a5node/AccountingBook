import { MainLayout } from './components';

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  return <MainLayout>{children}</MainLayout>;
}
