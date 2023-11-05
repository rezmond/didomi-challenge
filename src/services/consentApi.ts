import { Consent, ConsentApi, FetchApi } from "@/types";

export const createConsentApi = (fetchApi: FetchApi): ConsentApi => {
  const callFetchApi = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const data = await fetchApi(input, init)
      return {
        ok: data.ok,
        data: await data.json(),
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