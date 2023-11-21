import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
