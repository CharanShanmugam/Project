import React from 'react';
import { render } from 'react-dom';
import CurrencyConverter from './components/currency_converter';
import '../../assets/styles/salesforce-lightning-design-system.min.css';
import './style.scss';
/* global document:true; */
const App = () => {
  return (
    <div className="slds-grid slds-wrap">
      <div className="slds-col slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--1-of-3 slds-p-around_x-small">
        <div className="slds-size--1-of-1 slds-medium-size--1-of-1 slds-large-size--1-of-1 currency-container">
          <CurrencyConverter />
        </div>
      </div>
      <div className="slds-col slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--1-of-3 slds-p-around_x-small">
        <div className="slds-size--1-of-1 slds-medium-size--1-of-1 slds-large-size--1-of-1 currency-container">
          <CurrencyConverter />
        </div>
      </div>
      <div className="slds-size--1-of-1 slds-large-size--1-of-3">
        <div className="slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--1-of-1 slds-p-around_x-small">
          <div className="slds-size--1-of-1 slds-medium-size--1-of-1 slds-large-size--1-of-1 currency-container">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;

render(<App />, document.getElementById('app'));
