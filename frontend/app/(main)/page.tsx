import { MainPage } from './components';

export const metadata = {
  title: 'Main',
};

export default async function Main(): Promise<JSX.Element> {
  return <MainPage></MainPage>;
}
