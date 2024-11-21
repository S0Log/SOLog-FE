import React from 'react';
import { useContext } from 'react';
import { CompanyContext } from '../../contexts/companyContext';

export default function Test() {
  const { userInput, setUserInput } = useContext(CompanyContext);
  return <div>{userInput}</div>;
}
