import React from 'react';
import { useContext } from 'react';
import { CompanyContext } from '../../App';

export default function Test() {
  const { userInput, setUserInput } = useContext(CompanyContext);
  return <div>{userInput}</div>;
}
