import type { FC, ReactElement, ReactNode } from 'react';

import { FormGroup } from '@/shared/ui/FormGroup';
import { FormHelperText } from '@/shared/ui/FormHelperText';
import { Stack } from '@/shared/ui/Stack';

import styles from './Agreement.module.css';

type AgreementProps = {
  inputs: ReactElement;
  conditions: ReactElement;
  errors?: ReactNode;
  actions: ReactNode;
};

export const Agreement: FC<AgreementProps> = ({
  inputs,
  conditions,
  errors,
  actions,
}) => (
  <Stack direction="column" alignItems="center" spacing={2}>
    <Stack direction="row" spacing={1}>
      {inputs}
    </Stack>
    <p>I agree to:</p>
    <FormGroup className={styles.agreement}>{conditions}</FormGroup>
    {errors && <FormHelperText error>{errors}</FormHelperText>}
    {actions}
  </Stack>
);
