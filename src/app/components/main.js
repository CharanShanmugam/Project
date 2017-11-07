import React from 'react';
import _ from 'lodash';
import CurrencyInput from 'react-nebo15-currency-input';
import getLatest from '../service';
import loader from '../img/spinner.gif';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      inputCurrency: 'EUR',
      outputCurrency: 'USD',
      responseData: {},
      outputAmount: '',
      typedValue: '',
      error: false,
      showDisclaimer: false,
    };
    this.inputCurrencyMethod = this.inputCurrencyMethod.bind(this);
    this.outputCurrencyMethod = this.outputCurrencyMethod.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentWillMount() {
    this.fetchLatestRates();
  }

  async fetchLatestRates() {
    const data = await getLatest();

    if (data.rates) {
      const currencies = [];
      currencies.push(data.base);
      _.forEach(data.rates, function (value, key) {
        if (key === 'USD' || key === 'CAD' || key === 'EUR') {
          currencies.push(key);
        }
      });
      this.setState({ currencies, responseData: data.rates });
    } else {
      this.setState({ error: true });
    }
  }

  handleInputChange(e) {
    const typedValue = e.target ? e.target.value : e;
    const { inputCurrency, outputCurrency } = this.state;

    const inputValue = parseFloat(typedValue.replace(',', '.'));
    const exCurrency = parseFloat(this.state.responseData[this.state.outputCurrency]);
    let outputAmount;
    if (inputCurrency === outputCurrency) {
      outputAmount = typedValue;
    } else if (!typedValue || typeof (inputValue) !== 'number') {
      outputAmount = '';
    } else {
      outputAmount = (Math.round((inputValue * exCurrency) * 1000000) / 1000000).toString();
    }
    const tempValue = outputAmount.split('.');
    const preciseValue = tempValue.length > 1 ? ` ${tempValue[0]}.${tempValue[1].substr(0, 2)}` : tempValue[0];
    this.setState({ outputAmount: preciseValue, typedValue });
  }

  async currencyList(e) {
    this.setState({ inputCurrency: e });
    const { typedValue } = this.state;
    const response = await getLatest(e);
    this.setState({ responseData: response.rates }, () => this.handleInputChange(typedValue));
  }

  inputCurrencyMethod(e) {
    this.currencyList(e.target.value);
  }

  outputCurrencyMethod(e) {
    const { typedValue } = this.state;
    this.setState({ outputCurrency: e.target.value, typedValue }, () => this.handleInputChange(typedValue));
  }

  showMessage(e) {
    if (!e.keyCode || e.keyCode === 13) {
      const { showDisclaimer } = this.state;
      this.setState({ showDisclaimer: !showDisclaimer });
    }
  }

  render() {
    let inputAmount,
      errorMessage,
      displayComponent,
      loadingIcon,
      disclaimerMessage;
    const {
      currencies, responseData, inputCurrency, outputCurrency, outputAmount, error,
    } = this.state;
    if (error) {
      errorMessage = (
        <div className="error-info">
          API has encountered a problem. Please retry after sometime.
        </div>
      );
    }
    if (Object.keys(responseData).length === 0) {
      loadingIcon = (
        <div className="loading">
          <img src={loader} alt="Loading" title="Loading" />
        </div>
      );
    }
    if (this.state.showDisclaimer) {
      disclaimerMessage = (
        <div className="slds-m-top--large">
          The currency rates are based on data from fixer api.
        </div>
      );
    }
    if (Object.keys(responseData).length !== 0) {
      displayComponent = (
        <div>
          <div>{errorMessage}</div>
          <div className="slds-grid slds-grid_vertical-align-start slds-m-bottom--small slds-m-top--small">
            Type in amount and select currency:
          </div>

          <div className="slds-grid slds-grid_vertical-align-start">
            <div className="slds-form-element">
              <div className="slds-form-element__control">
                <CurrencyInput
                  className="slds-input"
                  placeholder="0.00"
                  decimalSeparator="."
                  precision={2}
                  value={inputAmount}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="slds-form-element slds-m-left--medium">
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select className="slds-select" value={inputCurrency} onChange={this.inputCurrencyMethod}>
                    {
                      currencies.map(id => <option key={id} value={id}>{id}</option>)
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="slds-grid slds-grid_vertical-align-start slds-m-bottom--small slds-m-top--small">
            Converted amount:
          </div>

          <div className="slds-grid slds-grid_vertical-align-start">
            <div className="slds-form-element">
              <div className="slds-form-element__control">
                <input className="slds-input" placeholder="0.00" type="text" value={outputAmount} disabled />
              </div>
            </div>
            <div className="slds-form-element slds-m-left--medium">
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select className="slds-select" value={outputCurrency} onChange={this.outputCurrencyMethod}>
                    {currencies.map(id => <option key={id} value={id}>{id}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <a tabIndex="0" className="slds-float--right disclaimer_info slds-m-bottom--small" onKeyDown={this.showMessage} onClick={this.showMessage}>Disclaimer</a>
          </div>
          <div>{disclaimerMessage}</div>
        </div>
      );
    }
    return (
      <div>{loadingIcon}{displayComponent}
      </div>
    );
  }
}
