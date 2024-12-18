import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import UpSideBar from '../components/MainPage/UpSideBar';
import SideBar from '../components/MainPage/SideBar';

export default function BoardLayout() {
  return (
    <div className="h-screen bg-[#f6f7f9]">
      <UpSideBar />
      <div className="flex h-[88vh]">
        <SideBar />

        {/* Main Content */}
        <main>
          <Container className="p-0">
            <div>
              <Outlet />
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
}
