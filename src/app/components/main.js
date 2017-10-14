import React from 'react';

export default class Main extends React.Component{
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
      
      fetch('https://api.fixer.io/latest')
        .then(data => data.json())
        .then(data => {
          const currencies = [];
          currencies.push(data.base,...Object.entries(data.rates).filter(rates => rates[0]=='CAD' || rates[0]=='USD' ).map(rates =>rates[0]))
          this.setState( { currencies,responseData : data.rates } );
        })
        .catch(err => console.log(err));
  }

  onKeyPress (e) {
    if(e.which >= 48 && e.which <= 57) {
    } else {
      e.preventDefault();
    }   
  };

  handleInputChange(e) {
    const typedValue = e.target ? e.target.value : e;    
    const { responseData, inputCurrency, outputCurrency } = this.state;

    const inputValue = parseFloat(typedValue.replace(',', '.'));
    const exCurrency = parseFloat(this.state.responseData[this.state.outputCurrency]);

    const value2 = inputCurrency == outputCurrency ? typedValue : Number.isNaN(inputValue) ? '' : ( Math.round( (inputValue * exCurrency) * 1000000 ) / 1000000 ).toString();
    this.setState({value2 : value2, typedValue : typedValue});
  }

  inputCurrencyMethod (e) {
    this.setState({inputCurrency : e.target.value});
    const { typedValue } = this.state;

    fetch(`https://api.fixer.io/latest?base=${e.target.value}`)
        .then(data => data.json())
        .then(data => {
          this.setState({responseData : data.rates},() => this.handleInputChange (typedValue));
        })
        .catch(err => console.log(err))
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
                  <input className="slds-input" placeholder="0.00" value={value1} onKeyPress={this.onKeyPress.bind(this)} onChange={this.handleInputChange} />
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