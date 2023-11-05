import { fireEvent } from '@testing-library/react';

import { render } from '@/shared/lib/tests';
import type { Consent } from '@/shared/types';
import { createConsentApi } from '@/services/consentApi';

import { Agreement } from './Agreement';

it('renders the Agreement form accessible', () => {
  const consentApiMock = createConsentApi(jest.fn());
  const { getByRole } = render(<Agreement />, {
    consentApi: consentApiMock,
  });

  expect(getByRole('form')).toBeInTheDocument();
});

it('enables the "give consent" button when at least one of the conditions is chosen', () => {
  const consentApiMock = createConsentApi(jest.fn());
  const { getByRole } = render(<Agreement />, {
    consentApi: consentApiMock,
  });

  expect(getByRole('button', { name: /give consent/i })).toBeDisabled();

  fireEvent.click(getByRole('checkbox', { name: /receive newsletter/i }));
  expect(getByRole('button', { name: /give consent/i })).toBeEnabled();

  fireEvent.click(getByRole('checkbox', { name: /be shown targeted ads/i }));
  expect(getByRole('button', { name: /give consent/i })).toBeEnabled();

  fireEvent.click(getByRole('checkbox', { name: /be shown targeted ads/i }));
  expect(getByRole('button', { name: /give consent/i })).toBeEnabled();

  fireEvent.click(getByRole('checkbox', { name: /receive newsletter/i }));
  expect(getByRole('button', { name: /give consent/i })).toBeDisabled();
});

it('sends the form data on give consent clicked', () => {
  const fetchApiMock = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockReturnValue(null),
  });
  const consentApiMock = createConsentApi(fetchApiMock);
  const testData: Consent = {
    name: 'John',
    email: 'John@email.com',
    ads: false,
    newsletter: true,
    statistics: false,
  };
  const { getByRole } = render(<Agreement />, {
    consentApi: consentApiMock,
  });

  fireEvent.input(getByRole('textbox', { name: /name/i }), {
    target: { value: testData.name },
  });
  fireEvent.input(getByRole('textbox', { name: /email address/i }), {
    target: { value: testData.email },
  });
  fireEvent.click(getByRole('checkbox', { name: /receive newsletter/i }));
  fireEvent.click(getByRole('button', { name: /give consent/i }));

  expect(fetchApiMock).toHaveBeenCalledTimes(1);
  expect(fetchApiMock).toHaveBeenCalledWith(
    '/consents',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(testData),
    }),
  );
});

it('shows consent giving error message', async () => {
  const errorMessage = 'test error message';
  const fetchApiMock = jest.fn().mockResolvedValueOnce({
    ok: false,
    json: jest.fn().mockResolvedValueOnce(errorMessage),
  });
  const consentApiMock = createConsentApi(fetchApiMock);
  const { getByRole, findByText } = render(<Agreement />, {
    consentApi: consentApiMock,
  });

  fireEvent.input(getByRole('textbox', { name: /name/i }), {
    target: { value: 'test name' },
  });
  fireEvent.input(getByRole('textbox', { name: /email address/i }), {
    target: { value: 'test@email.com' },
  });
  fireEvent.click(getByRole('checkbox', { name: /receive newsletter/i }));
  fireEvent.click(getByRole('button', { name: /give consent/i }));

  expect(fetchApiMock).toHaveBeenCalledTimes(1);
  expect(await findByText(errorMessage)).toBeInTheDocument();
});
