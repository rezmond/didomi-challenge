import { Consent, ConsentApi, FetchApi } from "@/types";

export const createConsentApi = (fetchApi: FetchApi): ConsentApi => {
  const callFetchApi = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const response = await fetchApi(input, init)
      const data = await response.json();
      return {
        ok: response.ok,
        data: response.ok ? data : new Error(data),
      }
    } catch (error) {
      return { ok: false, data: error }
    }
  }

  return ({
    getConsents() {
      return callFetchApi('/consents', { method: 'GET' })
    },
    giveConsent(form) {
      const data: Consent = {
        name: form.name,
        email: form.email,
        ads: form.ads || false,
        newsletter: form.newsletter || false,
        statistics: form.statistics || false,
      }
      return callFetchApi('/consents', { method: 'POST', body: JSON.stringify(data) })
    }
})
}