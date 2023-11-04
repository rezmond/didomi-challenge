import { GlobalStyles, useTheme } from '@mui/material';
import { FC, ReactElement } from 'react';

// import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactElement | ReactElement[];
};

export const Layout: FC<LayoutProps> = ({children}) => {
  const theme =  useTheme();
  return (
    <>
    <GlobalStyles styles={{
      ':root': {
        '--spacing': theme.spacing(),
        '--color-divider': theme.palette.divider,
      }
    }}/>
    {children}
    </>
  )
};