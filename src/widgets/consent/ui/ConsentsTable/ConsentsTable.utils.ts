import { conditionIdToLabel, conditionIds } from '@/entities/agreement';
import type { Consent } from '@/shared/lib/types';

import { Column } from './ConsentsTable.types';

export const columnToContent = (column: Column, row: Consent) => {
  if (column.id === 'email' || column.id === 'name') {
    return row[column.id];
  }

  return conditionIds
    .filter((id) => row[id])
    .map(conditionIdToLabel)
    .join(', ');
};
