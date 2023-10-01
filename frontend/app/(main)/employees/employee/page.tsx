import { ItemEmployee } from '../components';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Employer',
  };
}

export default function EmployerPage(): JSX.Element {
  return <ItemEmployee />;
}
