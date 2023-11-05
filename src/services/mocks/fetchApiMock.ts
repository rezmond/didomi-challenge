import { Consent, FetchApi } from "@/types";
import { FetchApiMockError } from "./fetchApiMockError";
import consentListSrc from './consentsList.json';

const consentList = [...consentListSrc] as Consent[];

const toSuccessResponse = (data: unknown): Promise<Response> =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data)
  } as unknown as Response)

export const fetchApiMock: FetchApi = (input, init) => {
  if (input !== '/consents') {
    throw new FetchApiMockError(`Unexpected fetch input "${input}"`)
  }
  
  if (!init) {
    throw new FetchApiMockError(`Unexpected fetch init "${input}"`)
  }

  if (init.method?.toUpperCase() === 'GET') {
    return toSuccessResponse(consentList);
  }
 
  if (init.method?.toUpperCase() === 'POST') {
    consentList.push(JSON.parse(init.body as string) as Consent);
    return toSuccessResponse(consentList);
  }

  throw new FetchApiMockError(`Something went wrong`)
}