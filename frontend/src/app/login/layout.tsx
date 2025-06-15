import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function LogInInLayout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
