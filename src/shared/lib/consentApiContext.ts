import { createContext, useContext } from "react";
import type { ConsentApi } from "../../types";

export const ConsentApiContext = createContext<ConsentApi>({
  getConsents: () => Promise.resolve({ ok: false, data: new Error('Api is not implemented') }),
  giveConsent: () => Promise.resolve({ ok: false, data: new Error('Api is not implemented') }),
});

export const useConsentApi = (): ConsentApi =>
  useContext(ConsentApiContext);