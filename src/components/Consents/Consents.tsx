import { FC, useEffect, useState } from 'react';

import { useConsentApi } from '@/shared/lib/consentApiContext';
import { Layout } from '@/shared/ui/Layout';
import { Paper } from '@/shared/ui/Paper';
import { Table } from '@/shared/ui/Table';
import { TableBody } from '@/shared/ui/TableBody';
import { TableCell } from '@/shared/ui/TableCell';
import { TableContainer } from '@/shared/ui/TableContainer';
import { TableHead } from '@/shared/ui/TableHead';
import { Pagination } from '@/shared/ui/Pagination';
import { TableRow } from '@/shared/ui/TableRow';
import { Consent } from '@/shared/types';
import { Alert } from '@/shared/ui/Alert';

import styles from './Consents.module.css';
import { ROWS_PER_PAGE, COLUMNS } from './Consents.constants';
import { columnToContent } from './Consents.utils';

export const Consents: FC = () => {
  const [rows, setRows] = useState<Consent[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(0);
  const consentApi = useConsentApi();
  const pagesCount = Math.ceil(rows.length / ROWS_PER_PAGE);

  useEffect(() => {
    (async () => {
      const { data, ok } = await consentApi.getConsents();
      if (!ok) {
        setError(data);
        return;
      }
      setRows(data);
    })();
  }, [consentApi]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  return (
    <Layout>
      <Paper>
        <TableContainer>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell className={styles.cell} align="center">
                  Name
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Email
                </TableCell>
                <TableCell className={styles.cell} align="left">
                  Consent given for
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(
                  page * ROWS_PER_PAGE,
                  page * ROWS_PER_PAGE + ROWS_PER_PAGE,
                )
                .map((row) => (
                  <TableRow key={row.name}>
                    {COLUMNS.map((column) => (
                      <TableCell className={styles.cell} key={column.id}>
                        {columnToContent(column, row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          classes={{ ul: styles.paginationUl }}
          variant="text"
          count={pagesCount}
          page={page + 1}
          onChange={handleChangePage}
        />
        {error && <Alert severity="error">{error.message}</Alert>}
      </Paper>
    </Layout>
  );
};
