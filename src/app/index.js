import React from 'react';
import { render } from 'react-dom';
import CurrencyConverter from './components/currency_converter';
import '../../assets/styles/salesforce-lightning-design-system.min.css';
import './style.scss';
/* global document:true; */
const App = () => {
  return (
    <div>
      <div className="currency-container">
        <CurrencyConverter />
      </div>
      <div className="currency-container">
        <CurrencyConverter />
      </div>
      <div className="currency-container">
        <CurrencyConverter />
      </div>
    </div>
  );
};
export default App;

render(<App />, document.getElementById('app'));
