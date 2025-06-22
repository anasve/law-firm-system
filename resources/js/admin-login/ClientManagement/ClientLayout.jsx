import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

// هذا هو الهيكل الذي سيحتوي على الهيدر الثابت ومحتوى الصفحة المتغير
const ClientLayout = ({ isLoggedIn }) => {
  return (
    <>
      {/* الهيدر سيظهر دائماً في الأعلى */}
      <Header isLoggedIn={isLoggedIn} />
      
      {/* <Outlet /> هو المكان الذي سيعرض فيه محتوى الصفحة الحالية */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ClientLayout;