import React from 'react';

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
