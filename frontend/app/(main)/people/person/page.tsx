import { Metadata } from 'next';
import { ItemPerson } from '../components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Person',
  };
}

export default function PersonPage(): JSX.Element {
  return <ItemPerson />;
}
