import React, { ReactNode } from 'react';

import Layout from '../../../components/analytics/layout';
import Footer from '../../../components/footer/footer';


interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Layout />

      {/* Footer */}
      <Footer />
    </div>
  );
}