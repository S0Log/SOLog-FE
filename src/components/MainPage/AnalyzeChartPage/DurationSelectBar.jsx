import React from 'react';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './DurationSelectBar.css';

export default function DurationSelectBar({ durationType, setDurationType }) {
  return (
    <Nav
      variant="pills"
      defaultActiveKey={durationType}
      className="justify-content-end custom-nav"
      onSelect={(selectedKey) => {
        console.log(selectedKey);
        alert(selectedKey);
        setDurationType(selectedKey);
      }}
    >
      <Nav.Item>
        <Nav.Link eventKey="day">일봉</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="week">주봉</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="month">월봉</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
