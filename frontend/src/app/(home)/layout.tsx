import { ReactNode } from 'react';
import Navbar from '../../components/navbar/navbar';
import Hero from '../../components/hero/hero'
import Description from '../../components/description/description';
import Footer from '../../components/footer/footer'; 

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header/Navbar - Fixed at top */}
      <Navbar />

      {/* Hero */}
      <Hero/>

      {/* Description */}
      <Description/>

      {/* Footer */}
      <Footer />
    </div>
  );
}