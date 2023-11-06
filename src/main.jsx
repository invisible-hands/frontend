import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Main() {
  const url = useParams();
  console.log(url);
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
