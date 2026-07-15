import { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy- & Cookiebeleid | SPROSCALE',
  description: 'Lees meer over hoe wij omgaan met uw privacy en welke cookies wij gebruiken.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
