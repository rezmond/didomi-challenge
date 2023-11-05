import { GlobalStyles, useTheme } from '@mui/material';
import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { Stack } from '../Stack';

import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactElement | ReactElement[];
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <GlobalStyles
        styles={{
          ':root': {
            '--spacing': theme.spacing(),
            '--color-divider': theme.palette.divider,
            '--color-primary-main': theme.palette.primary.main,
            '--color-primary-contrast-text': theme.palette.primary.contrastText,
          },
        }}
      />
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <nav className={styles.navigation} aria-label="pages">
          <List>
            <ListItem disablePadding className={styles.listItem}>
              <Button
                variant="outlined"
                fullWidth
                component={NavLink}
                className={styles.navLink}
                to="/give-consent"
              >
                Give consent
              </Button>
            </ListItem>
            <ListItem disablePadding className={styles.listItem}>
              <Button
                variant="outlined"
                fullWidth
                component={NavLink}
                className={styles.navLink}
                to="/consents"
              >
                Collected consents
              </Button>
            </ListItem>
          </List>
        </nav>
        <div className={styles.content}>{children}</div>
      </Stack>
    </>
  );
};
