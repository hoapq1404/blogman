export const COLOR_SCHEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ColorScheme = (typeof COLOR_SCHEMES)[keyof typeof COLOR_SCHEMES];


export const MODE = {
  ADD: 'add',
  EDIT: 'edit'
} as const;

export type Mode = (typeof MODE)[keyof typeof MODE];