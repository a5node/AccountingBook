import { Metadata } from 'next';
import { ItemProject } from '../components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Project',
  };
}

export default function ProjectPage(): JSX.Element {
  return <ItemProject />;
}
