import { ListPeople } from './components/ListPeople';

export const metadata = {
  title: 'People',
};

export default function PeoplePage(): JSX.Element {
  return (
    <>
      <ListPeople />
    </>
  );
}
