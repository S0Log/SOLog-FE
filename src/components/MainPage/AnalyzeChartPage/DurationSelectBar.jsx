import React from 'react';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './DurationSelectBar.css';

export default function DurationSelectBar() {
  const [activeKey, setActiveKey] = useState('daily');

  const tabs = [
    { key: 'daily', label: '일봉' },
    { key: 'weekly', label: '주봉' },
    { key: 'monthly', label: '월봉' },
  ];

  return (
    // <Nav variant="pills" defaultActiveKey="daily" className="justify-content-end">
    //   <Nav.Item>
    //     <Nav.Link eventKey="daily" className="text-black">
    //       일봉
    //     </Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link eventKey="weekly" className="text-black">
    //       주봉
    //     </Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link eventKey="monthly" className="text-black">
    //       월봉
    //     </Nav.Link>
    //   </Nav.Item>
    // </Nav>

    <Nav variant="pills" defaultActiveKey="daily" className="justify-content-end custom-nav">
      <Nav.Item>
        <Nav.Link eventKey="daily">일봉</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="weekly">주봉</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="monthly">월봉</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
