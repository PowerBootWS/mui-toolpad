/**
 * Toolpad data provider file.
 * See: https://mui.com/toolpad/concepts/data-providers/
 */

import { createDataProvider } from '@mui/toolpad/server';
import prisma from '../prisma';

export default createDataProvider({
  paginationMode: 'cursor',

  async getRecords({ paginationModel: { cursor, pageSize } }) {
    const userRecords = await prisma.user.findMany({
      cursor: cursor
        ? {
            id: Number(cursor),
          }
        : undefined,
      skip: cursor ? 1 : 0,
      take: pageSize,
      orderBy: {
        id: 'asc',
      },
    });
    const nextCursor = userRecords[pageSize - 1]?.id ?? null;
    return {
      records: userRecords,
      cursor: typeof nextCursor === 'number' ? String(nextCursor) : null,
      hasNextPage: Boolean(nextCursor),
    };
  },
});
