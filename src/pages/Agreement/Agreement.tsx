import { useCallback, type FC } from 'react';

import { useNavigate } from 'react-router';
import { AgreementForm } from '@/widgets/agreement';
import { Layout } from '@/shared/ui/Layout';

export const Agreement: FC = () => {
  const navigate = useNavigate();

  const handleGaveConsent = useCallback(() => {
    navigate('/consents');
  }, [navigate]);

  return (
    <Layout>
      <AgreementForm onGaveConsent={handleGaveConsent} />
    </Layout>
  );
};
