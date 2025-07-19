import React from 'react';

type Props = {
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  isLoading: boolean;
  error?: Error | null;
  children: React.ReactNode;
};

export function AsyncBoundary({
  isLoading,
  error = null,
  loadingFallback = <p>Loading...</p>,
  errorFallback = <p>Something went wrong.</p>,
  children,
}: Props) {
  if (isLoading) return <>{loadingFallback}</>;
  if (error) return <>{errorFallback}</>;
  return <>{children}</>;
}
