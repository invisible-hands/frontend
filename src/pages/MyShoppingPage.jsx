import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ShoppingRecord from '../components/ShoppingRecord';
import SellingRecord from '../components/SellingRecord';
import AuctionRecord from '../components/AuctionRecord';
import ErrorPage from './ErrorPage';

function DefaultContent() {
  return <ErrorPage />;
}

function MyShoppingPage() {
  const { recordType } = useParams();

  let ContentComponent;

  switch (recordType) {
    case 'shopping':
      ContentComponent = ShoppingRecord;
      break;
    case 'selling':
      ContentComponent = SellingRecord;
      break;
    case 'auction':
      ContentComponent = AuctionRecord;
      break;
    default:
      ContentComponent = DefaultContent;
  }

  return (
    <div>
      <Sidebar />
      <ContentComponent />
    </div>
  );
}

export default MyShoppingPage;
