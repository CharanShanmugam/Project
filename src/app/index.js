import React from 'react';
import {render} from 'react-dom';
import CurrencyConverter from './components/currency_converter.js';
import '../../assets/styles/salesforce-lightning-design-system.min.css';
import './style.scss';

export default class App extends React.Component {
  render () {
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
  }
}

render(<App/>, document.getElementById('app'));