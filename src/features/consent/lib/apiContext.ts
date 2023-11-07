import { createContext, useContext } from 'react';

import type { ConsentApi } from '@/shared/lib/types';

export const ApiContext = createContext<ConsentApi>({
  getConsents: () =>
    Promise.resolve({ ok: false, data: new Error('Api is not implemented') }),
  giveConsent: () =>
    Promise.resolve({ ok: false, data: new Error('Api is not implemented') }),
});

export const useApi = (): ConsentApi => useContext(ApiContext);
