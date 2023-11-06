import type { FC } from 'react';

import { ConsentsTable } from '@/widgets/consent';
import { Layout } from '@/shared/ui/Layout';

export const Consents: FC = () => (
  <Layout>
    <ConsentsTable />
  </Layout>
);
