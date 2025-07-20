import { Row } from '@tanstack/react-table';

export function makeSearchFilter<T>(keys: Extract<keyof T, string>[]) {
  return (row: Row<T>, _columnId: string, filterValue: string) => {
    return keys.some(key => {
      const value = row.getValue(key);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    });
  };
}
