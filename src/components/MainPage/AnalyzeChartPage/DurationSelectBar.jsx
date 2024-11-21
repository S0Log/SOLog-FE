import React from 'react';
import { Nav } from 'react-bootstrap';

export default function DurationSelectBar() {
  return (
    <Nav variant="pills" defaultActiveKey="daily">
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
