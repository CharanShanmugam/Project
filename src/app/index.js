import React from 'react';
import {render} from 'react-dom';
import './style.scss';

class App extends React.Component {
  render () {
    return (
      <div>
        <h3>Currency <span>Converter</span></h3>
        <Main />
        <a href="https://www.doorstepforex.com/">Disclaimer</a>
      </div>
    );
  }
}

class Main extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
          currencies: [],
          inputCurrency :'EUR',
          outputCurrency :'INR',
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
          currencies.push(data.base, ...Object.entries(data.rates).map(rates => rates[0]));
          this.setState( { currencies,responseData : data.rates } );
        })
        .catch(err => console.log(err));

  }

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
          <div>
            <input type="text" value={value1} onChange={this.handleInputChange}/>
            <select value={inputCurrency} onChange={this.inputCurrencyMethod}>
              {currencies.map(id=>
                <option key={id} value={id}>{id}</option>
              )}
            </select>
          </div>

          <div>
            <input type="text" value={value2}/>
            <select value={outputCurrency} onChange={this.outputCurrencyMethod}>
              {currencies.map(id=>
                <option key={id} value={id}>{id}</option>
              )}
            </select>
          </div>
        </div>
      )
    }
  }

render(<App/>, document.getElementById('app'));