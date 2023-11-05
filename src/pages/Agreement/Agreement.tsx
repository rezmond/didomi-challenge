import { FC, FormEventHandler, useCallback, useState } from 'react';

import { conditionIds, conditions } from '@/shared/lib/agreements';
import { useConsentApi } from '@/shared/lib/consentApiContext';
import type { GiveConsentDto } from '@/shared/types';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormControlLabel } from '@/shared/ui/FormControlLabel';
import { Layout } from '@/shared/ui/Layout';
import { List } from '@/shared/ui/List';
import { ListItem } from '@/shared/ui/ListItem';
import { TextField } from '@/shared/ui/TextField';

import { AgreementLayout } from './components/AgreementLayout';

export const Agreement: FC = () => {
  const [form, setForm] = useState<GiveConsentDto>({
    name: '',
    email: '',
  });
  const [error, setError] = useState<Error | null>(null);
  const consentApi = useConsentApi();

  const handleFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = event.currentTarget;
      if (field.type === 'checkbox') {
        setForm((old) => ({ ...old, [field.name]: field.checked }));
        return;
      }
      setForm((old) => ({ ...old, [field.name]: field.value }));
    },
    [],
  );

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const result = await consentApi.giveConsent(form);
    if (!result.ok) {
      setError(result.data);
    }
  };

  const canSubmit = conditionIds.some((id) => form[id]);

  return (
    <Layout>
      <form aria-label="Agreement form" onSubmit={handleSubmit}>
        <AgreementLayout
          inputs={
            <>
              <TextField
                id="name"
                name="name"
                label="Name"
                type="text"
                required
                value={form.name}
                InputLabelProps={{ required: false }}
                onChange={handleFieldChange}
              />
              <TextField
                id="email"
                name="email"
                label="Email address"
                type="email"
                required
                value={form.email}
                InputLabelProps={{ required: false }}
                onChange={handleFieldChange}
              />
            </>
          }
          conditionsLabel="I agree to:"
          conditions={
            <List disablePadding>
              {conditions.map(({ id, label }) => (
                <ListItem disablePadding key={id}>
                  <FormControlLabel
                    label={label}
                    control={
                      <Checkbox
                        id={id}
                        name={id}
                        checked={Boolean(form[id])}
                        onChange={handleFieldChange}
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          }
          errors={error?.message}
          actions={
            <Button type="submit" variant="contained" disabled={!canSubmit}>
              Give consent
            </Button>
          }
        />
      </form>
    </Layout>
  );
};
