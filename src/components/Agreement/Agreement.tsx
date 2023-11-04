import { FC, useCallback, useState } from 'react';

import { TextField } from '@/shared/ui/TextField';
import { Layout } from '@/shared/ui/Layout';
import { List } from '@/shared/ui/List';
import { ListItem } from '@/shared/ui/ListItem';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormControlLabel } from '@/shared/ui/FormControlLabel';

import { conditionIds, conditions } from './agreements';
import { AgreementLayout } from './components/AgreementLayout';

export const Agreement: FC = () => {
  const [form, setForm] = useState<Record<string, unknown>>({});

  const handleFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.currentTarget;
    if (field.type === 'checkbox') {
      setForm(old => ({ ...old, [field.name]: field.checked }))
      return;
    }
    setForm(old => ({ ...old, [field.name]: field.value }))
  }, [])

  const canSubmit = conditionIds.some(id => form[id])

  return (
    <Layout>
      <form>
        <AgreementLayout
          inputs={
            <>
              <TextField
                id="name"
                label="Name"
                type="text"
                required
                value={form.name}
                onChange={handleFieldChange}
              />
              <TextField
                id="email"
                label="Email address"
                type="email"
                required
                value={form.email}
                onChange={handleFieldChange}
              />
            </>
          }
          conditionsLabel="I agree to:"
          conditions={
            <List disablePadding>
              {
                conditions.map(({ id, name, label }) =>
                  <ListItem disablePadding key={id}>
                    <FormControlLabel label={label} control={
                      <Checkbox id={id} name={name ?? id} checked={Boolean(form[id])} onChange={handleFieldChange} />
                    } />
                  </ListItem>
                )
              }
            </List>
          }
          actions={
            <Button type="submit" variant='contained' disabled={!canSubmit}>
              Give consent
            </Button>
          }
        />
      </form>
    </Layout>
  )
};