import { Consent, FetchApi } from '@/shared/lib/types';
import consentListSrc from './consentsList.json';
import { FetchApiMockError } from './fetchApiMockError';

const consentList = [...consentListSrc] as Consent[];

const toSuccessResponse = (data: unknown): Promise<Response> =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);

/**
 * It works only for predefined endpoints and throws error for others.
 * @param input URL of the target page.
 * @param init options of request. If not provided the function throws exception.
 * @returns mocked response
 */
export const fetchApiMock: FetchApi = (input, init) => {
  if (input !== '/consents') {
    throw new FetchApiMockError(`Unexpected fetch input "${input}"`);
  }

  if (!init) {
    throw new FetchApiMockError(`Unexpected fetch init "${input}"`);
  }

  if (init.method?.toUpperCase() === 'GET') {
    return toSuccessResponse(consentList);
  }

  if (init.method?.toUpperCase() === 'POST') {
    consentList.push(JSON.parse(init.body as string) as Consent);
    return toSuccessResponse(consentList);
  }

  throw new FetchApiMockError(`Something went wrong`);
};
