import React from 'react';
import Main from './main';

const CurrencyConverter = () => {
  return (
    <div className="slds-color__background_gray-2 slds-p-around_x-small">
      <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--medium">
        <h3>Currency Converter</h3>
      </div>
      <Main />
    </div>
  );
};

export default CurrencyConverter;
