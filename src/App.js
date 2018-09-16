import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Pad keys={['clear', 'divide', 'multiply', 'seven', 'eight', 'nine', 'subtract', 'four', 'five', 'six', 'add', 'one', 'two', 'three', 'equals', 'zero', 'decimal']}/>
      </div>
    );
  }
}

class Pad extends React.Component {
  render() {
    return (
      <div id="pad">
        {this.props.keys.map((k) =>
          <Key key={k} name={k}/>
        )}
      </div>
    );
  }
}

class Key extends React.Component {
  render() {
    return (
      <div className="key" id={this.props.name}>
        <div className="key-text">
          {
            {
              'clear': 'AC',
              'divide': '/',
              'multiply': 'X',
              'seven': '7',
              'eight': '8',
              'nine': '9',
              'subtract': '-',
              'four': '4',
              'five': '5',
              'six': '6',
              'add': '+',
              'one': '1',
              'two': '2',
              'three': '3',
              'equals': '=',
              'zero': '0',
              'decimal': '.'
            }[this.props.name]
          }
        </div>
      </div>
    );
  }
}

export default App;
