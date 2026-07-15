import { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | SPROSCALE',
  description: 'Lees de algemene voorwaarden van SPROSCALE voor het gebruik van onze diensten.',
};

export default function AlgemeneVoorwaardenPage() {
  return <TermsContent />;
}
