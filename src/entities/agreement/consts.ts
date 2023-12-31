import type { Consent } from '@/shared/lib/types';

type Checkbox = {
  id: keyof Consent;
  label: string;
};

export const conditions: Checkbox[] = [
  {
    id: 'newsletter',
    label: 'Receive newsletter',
  },
  {
    id: 'ads',
    label: 'Be shown targeted ads',
  },
  {
    id: 'statistics',
    label: 'Contribute to anonymous visit statistics',
  },
];

export const conditionIds = conditions.map(({ id }) => id);
