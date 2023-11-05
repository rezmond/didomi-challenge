type SuccessResponse<T = unknown> = {
  ok: true;
  data: T;
};

type FailedResponse = {
  ok: false;
  data: Error;
};

export type FetchApi = typeof fetch;

export type Consent = {
  name: string;
  email: string;
  newsletter: boolean;
  ads: boolean;
  statistics: boolean;
};

export type GiveConsentDto = {
  name: string;
  email: string;
  newsletter?: boolean;
  ads?: boolean;
  statistics?: boolean;
};

export type ConsentApi = {
  giveConsent(form: GiveConsentDto): Promise<SuccessResponse | FailedResponse>;
  getConsents(): Promise<SuccessResponse<Consent> | FailedResponse>;
};
