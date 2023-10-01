import { ListProjects } from './components/ListProjects';

export const metadata = {
  title: 'Projects',
};

export default function ProjectsPage(): JSX.Element {
  return (
    <>
      <ListProjects />
    </>
  );
}
