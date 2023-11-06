import { Column } from './ConsentsTable.types';

export const COLUMNS: Column[] = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'consent', label: 'Consent given for' },
];

export const ROWS_PER_PAGE = 2;
