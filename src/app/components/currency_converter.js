import React from 'react';
import Main from './main.js';

export default class CurrencyConverter extends React.Component
{
  render()
  {
    return (<div className="slds-p-around_medium slds-color__background_gray-2">
                <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--medium">
                  <h3>Currency converter</h3>
                </div>
                <Main />
                <div>
                  <a href="https://www.doorstepforex.com/" className="slds-float--right">Disclaimer</a>
                </div>
            </div>);
  }
}