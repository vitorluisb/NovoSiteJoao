import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      <main>{children}</main>
      <Footer />
      <Cart />
    </div>
  );
}
