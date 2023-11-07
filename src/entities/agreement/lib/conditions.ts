import { Consent } from '@/shared/lib/types';
import { conditions } from '../consts';

export const conditionIdToLabel = (id: keyof Consent): string =>
  conditions.find((condition) => condition.id === id)!.label;
