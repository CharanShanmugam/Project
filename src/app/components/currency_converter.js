import React from 'react';
import Main from './main.js';

export default class CurrencyConverter extends React.Component
{
  constructor(props) {
  super(props);
    this.state = {
      showDisclaimer : false
    }
    this.showMessage = this.showMessage.bind(this);
  }

  showMessage (e) {
    if (!e.keyCode || e.keyCode == 13){
      const {showDisclaimer} = this.state;
      this.setState({showDisclaimer : !showDisclaimer});
    }
    
  }

  render()
  {
    let disclaimerMessage;
    const {showDisclaimer} = this.state;

    if (this.state.showDisclaimer) {
      disclaimerMessage = (
        <div className="slds-m-top--large">
          The currency rates are based on data from fixer api.
        </div>
      )
    }

    return (<div className="slds-p-around_medium slds-color__background_gray-2">
                <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--medium">
                  <h3>Currency converter</h3>
                </div>
                <Main />
                <div>
                  <a tabIndex="0" className="slds-float--right disclaimer_info" onKeyDown={this.showMessage} onClick={this.showMessage}>Disclaimer</a>
                </div>
                <div className="disclaimer_msg">{disclaimerMessage}</div>
            </div>);
  }
}

