export const MODE = {
  ADD: 'add',
  EDIT: 'edit'
} as const;

export type Mode = (typeof MODE)[keyof typeof MODE];