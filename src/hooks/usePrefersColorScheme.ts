import { useEffect, useState } from 'react';
import { COLOR_SCHEMES, ColorScheme } from '@/constants/common';

export function usePrefersColorScheme(): ColorScheme {
  const [scheme, setScheme] = useState<ColorScheme>(COLOR_SCHEMES.LIGHT);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set current value
    const updateScheme = () => {
      setScheme(mediaQuery.matches ? COLOR_SCHEMES.DARK : COLOR_SCHEMES.LIGHT);
    };

    updateScheme(); // Set immediately on mount
    mediaQuery.addEventListener('change', updateScheme);

    return () => {
      mediaQuery.removeEventListener('change', updateScheme);
    };
  }, []);

  return scheme;
}
