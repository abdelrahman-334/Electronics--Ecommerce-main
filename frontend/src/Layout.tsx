import React from 'react';
import NavBar  from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';

export const Layout = ({ children }: { children: React.ReactNode })=> {
    return (
      <div>
        <NavBar />
            <div className="content">
                {children}
            </div>
        <Footer />
      </div>
    );
}