import { conditionIds } from '@/shared/lib/agreements';
import type { Consent } from '@/types';
import { conditionIdToLabel } from '@/shared/lib/agreements';

import type { Column } from './Consents.types';

export const columnToContent = (column: Column, row: Consent) => {
  if (column.id === 'email' || column.id === 'name') {
    return row[column.id];
  }

  return conditionIds
    .filter((id) => row[id])
    .map(conditionIdToLabel)
    .join(', ');
};
