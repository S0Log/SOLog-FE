import React from 'react';
import { useContext } from 'react';
import { CompanyContext } from '../../contexts/companyContext';
import Chart from '../MainPage/Chart';

export default function Test() {
  // const { userInput, setUserInput } = useContext(CompanyContext);
  // return <div>{userInput}</div>;
  return <Chart />;
}
