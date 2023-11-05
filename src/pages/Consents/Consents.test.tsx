import { fireEvent } from '@testing-library/react';
import { createConsentApi } from '@/shared/lib/consentApi';
import { render } from '@/shared/lib/tests';
import { Consent } from '@/shared/lib/types';
import { Consents } from './Consents';
import { columnToContent } from './Consents.utils';

const consentsMock: Consent[] = [
  {
    name: 'Paul',
    email: 'Paul@mail.com',
    newsletter: false,
    ads: false,
    statistics: true,
  },
  {
    name: 'Arshak',
    email: 'Arshak@mail.com',
    newsletter: false,
    ads: true,
    statistics: true,
  },
  {
    name: 'Joy',
    email: 'Joy@mail.com',
    newsletter: true,
    ads: false,
    statistics: false,
  },
];

const createFetchApiMock = (data: Consent[]) =>
  jest.fn().mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockReturnValue(data),
  });

it.each`
  newsletter | ads      | expected
  ${false}   | ${false} | ${1}
  ${true}    | ${false} | ${1}
  ${true}    | ${true}  | ${2}
`(
  'columnToContent renders correct items amount',
  ({ newsletter, ads, expected }) => {
    const content = columnToContent(
      {
        id: 'consent',
        label: 'test',
      },
      {
        name: 'test',
        email: 'test@mail.com',
        newsletter,
        ads,
        statistics: false,
      },
    );

    expect(content.split(', ').length).toEqual(expected);
  },
);

it('shows the second page by click to 2', async () => {
  const consentApiMock = createConsentApi(createFetchApiMock(consentsMock));
  const { getByRole, getByText, queryByText, findByText } = render(
    <Consents />,
    {
      consentApi: consentApiMock,
    },
  );

  expect(await findByText('Paul')).toBeInTheDocument();
  expect(getByText('Arshak')).toBeInTheDocument();
  expect(queryByText('Joy')).not.toBeInTheDocument();
  expect(getByRole('button', { name: /go to previous page/i })).toBeDisabled();
  expect(getByRole('button', { name: /go to next page/i })).toBeEnabled();

  fireEvent.click(getByRole('button', { name: /go to page 2/i }));

  expect(await findByText('Joy')).toBeInTheDocument();
  expect(queryByText('Paul')).not.toBeInTheDocument();
  expect(queryByText('Arshak')).not.toBeInTheDocument();
  expect(getByRole('button', { name: /go to previous page/i })).toBeEnabled();
  expect(getByRole('button', { name: /go to next page/i })).toBeDisabled();
});

it('can go forward and back', async () => {
  const consentApiMock = createConsentApi(createFetchApiMock(consentsMock));
  const { getByRole, getByText, queryByText, findByText } = render(
    <Consents />,
    {
      consentApi: consentApiMock,
    },
  );

  expect(await findByText('Paul')).toBeInTheDocument();
  expect(getByText('Arshak')).toBeInTheDocument();
  expect(queryByText('Joy')).not.toBeInTheDocument();
  expect(getByRole('button', { name: /go to previous page/i })).toBeDisabled();
  expect(getByRole('button', { name: /go to next page/i })).toBeEnabled();

  fireEvent.click(getByRole('button', { name: /go to next page/i }));

  expect(await findByText('Joy')).toBeInTheDocument();
  expect(queryByText('Paul')).not.toBeInTheDocument();
  expect(queryByText('Arshak')).not.toBeInTheDocument();
  expect(getByRole('button', { name: /go to previous page/i })).toBeEnabled();
  expect(getByRole('button', { name: /go to next page/i })).toBeDisabled();

  fireEvent.click(getByRole('button', { name: /go to previous page/i }));

  expect(await findByText('Paul')).toBeInTheDocument();
  expect(getByText('Arshak')).toBeInTheDocument();
  expect(queryByText('Joy')).not.toBeInTheDocument();
  expect(getByRole('button', { name: /go to previous page/i })).toBeDisabled();
  expect(getByRole('button', { name: /go to next page/i })).toBeEnabled();
});

it('shows consents getting error message', async () => {
  const errorMessage = 'test error message';
  const consentApiMock = createConsentApi(
    jest.fn().mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockReturnValue(errorMessage),
    }),
  );
  const { findByText } = render(<Consents />, {
    consentApi: consentApiMock,
  });

  expect(await findByText(errorMessage)).toBeInTheDocument();
});
