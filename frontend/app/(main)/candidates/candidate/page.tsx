import { ItemCandidate } from '../components';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Candidate',
  };
}

export default function CandidatePage(): JSX.Element {
  return <ItemCandidate />;
}
