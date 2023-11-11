export const buildSelectQuery = ({
  col,
  table,
  where,
  distinct,
}: {
  col: string;
  table: string;
  where: string;
  distinct?: boolean;
}) => {
  return `SELECT${
    distinct ? ' DISTINCT' : ' '
  } ${col} FROM ${table} WHERE ${where}`;
};

export const buildInsertOrUpdateQuery = ({
  table,
  cols,
  values,
}: {
  table: string;
  cols: string[];
  values: string;
}) => {
  return `INSERT OR REPLACE INTO ${table} (${cols}) VALUES ${values}`;
};
