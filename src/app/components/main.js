import React from 'react';
import CurrencyInput from 'react-nebo15-currency-input';
import * as CurrencyRatesService from '../service.js';

export default class Main extends React.Component{
  
  // Name should be change saranya
  componentWillMount() {
    this.fetchLatestRates();
  }
  // Name should be change saranya
  async fetchLatestRates() {
    const data = await CurrencyRatesService.getLatest();
    const currencies = [];
    currencies.push(data.base,...Object.entries(data.rates).filter(rates => rates[0]=='CAD' || rates[0]=='USD' ).map(rates =>rates[0]))
    this.setState( { currencies,responseData : data.rates } );
  }
  constructor(props) {
    super(props);
      this.state = {
          currencies: [],
          inputCurrency :'EUR',
          outputCurrency :'USD',
          responseData : [],
          value2 : '',
          value1 : '',
          typedValue : ''
      }

      this.inputCurrencyMethod = this.inputCurrencyMethod.bind(this);
      this.outputCurrencyMethod = this.outputCurrencyMethod.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      
      // fetch('https://api.fixer.io/latest')
      //   .then(data => data.json())
      //   .then(data => {
      //  console.log('555555555')
      //     const currencies = [];
      //     currencies.push(data.base,...Object.entries(data.rates).filter(rates => rates[0]=='CAD' || rates[0]=='USD' ).map(rates =>rates[0]))
      //     this.setState( { currencies,responseData : data.rates } );
      //   })
      //   .catch(err => console.log(err));
  }


  handleInputChange(e) {
    const typedValue = e.target ? e.target.value : e;    
    const { responseData, inputCurrency, outputCurrency } = this.state;

    const inputValue = parseFloat(typedValue.replace(',', '.'));
    const exCurrency = parseFloat(this.state.responseData[this.state.outputCurrency]);

    const value2 = inputCurrency == outputCurrency ? typedValue : Number.isNaN(inputValue) ? '' : ( Math.round( (inputValue * exCurrency) * 1000000 ) / 1000000 ).toString();
    const find1 = value2.split('.')
    const value3 = find1.length > 1 ? find1[0]+'.'+find1[1].substr(0, 2): find1[0]
    this.setState({value2 : value3, typedValue : typedValue});
  }

  async callMethod (e) {
    this.setState({inputCurrency : e});
    const { typedValue } = this.state;
    const data1 = await CurrencyRatesService.getLatest(e);
    this.setState({responseData : data1.rates},() => this.handleInputChange (typedValue));
  }

  inputCurrencyMethod (e) {    
    this.callMethod (e.target.value)
  }

  outputCurrencyMethod (e) {
    const { typedValue } = this.state;
    this.setState({outputCurrency : e.target.value,typedValue : typedValue },() => this.handleInputChange (typedValue));
  }

  render(){
      let value1;
      const { currencies, responseData, inputCurrency, outputCurrency, value2 } = this.state;
        
      return(
        <div>
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
                    value={value1}
                    onChange={this.handleInputChange}
                  />              
                </div>
              </div>
              <div className="slds-form-element slds-m-left--medium">
                <div className="slds-form-element__control">
                  <div className="slds-select_container">
                    <select className="slds-select" value={inputCurrency} onChange={this.inputCurrencyMethod}>
                      {currencies.map(id=>
                        <option key={id} value={id}>{id}</option>
                      )}
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
                    <input className="slds-input" placeholder="0.00" type="text" value={value2}/>
                  </div>
                </div>
                <div className="slds-form-element slds-m-left--medium">
                  <div className="slds-form-element__control">
                    <div className="slds-select_container">
                      <select className="slds-select" value={outputCurrency} onChange={this.outputCurrencyMethod}>
                        {currencies.map(id=>
                          <option key={id} value={id}>{id}</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
            </div>
        </div>
            

      )
    }
  }