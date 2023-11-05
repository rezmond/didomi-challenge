import {
  type RenderOptions as RenderOptionsBase,
  type RenderResult,
  render as renderBase,
} from '@testing-library/react';
import { FC, ReactElement, ReactNode } from 'react';
import { ConsentApi } from '@/shared/types';
import { ConsentApiContext } from './consentApiContext';

type RenderOptions = Omit<RenderOptionsBase, 'queries'> & {
  consentApi: ConsentApi;
};

export const render = (
  ui: ReactElement,
  { consentApi, ...options }: RenderOptions,
): RenderResult => {
  const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => (
    <ConsentApiContext.Provider value={consentApi}>
      {children}
    </ConsentApiContext.Provider>
  );

  return renderBase(ui, { wrapper: AllTheProviders, ...options });
};
