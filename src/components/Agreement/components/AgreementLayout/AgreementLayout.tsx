import { FC, ReactElement, ReactNode } from 'react';

import { Stack } from '@/shared/ui/Stack';

import styles from './AgreementLayout.module.css';
import { FormGroup } from '@/shared/ui/FormGroup';
import { FormHelperText } from '@/shared/ui/FormHelperText';

type AgreementLayoutProps = {
  inputs: ReactElement;
  conditionsLabel: string;
  conditions: ReactElement;
  errors?: ReactNode;
  actions: ReactNode;
};

export const AgreementLayout: FC<AgreementLayoutProps> = ({
  inputs,
  conditionsLabel,
  conditions,
  errors,
  actions,
}) => (
  <Stack direction="column" alignItems="center" spacing={2}>
    <Stack direction="row" spacing={1}>
      {inputs}
    </Stack>
    <p>{conditionsLabel}</p>
    <FormGroup className={styles.agreement}>{conditions}</FormGroup>
    {errors && <FormHelperText error>{errors}</FormHelperText>}
    {actions}
  </Stack>
);
