import { FC, ReactElement, ReactNode } from 'react';

import { Stack } from '@/shared/ui/Stack';

import styles from './AgreementLayout.module.css';
import { FormGroup } from '@/shared/ui/FormGroup';

type AgreementLayoutProps = {
  inputs: ReactElement;
  conditionsLabel: string;
  conditions: ReactElement;
  actions: ReactNode;
};

export const AgreementLayout: FC<AgreementLayoutProps> = ({ inputs, conditionsLabel, conditions, actions }) => (
  <Stack direction="column" alignItems="center" spacing={2}>
    <Stack direction="row" spacing={1}>
      {inputs}
    </Stack>
    <p>{conditionsLabel}</p>
    <FormGroup className={styles.agreement}>
      {conditions}
    </FormGroup>
    {actions}
  </Stack>
);