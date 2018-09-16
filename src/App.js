import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      output: '0'
    };
  }

  updateScreen(v) {
    switch(v) {
      case('AC'):
        this.setState({
          input: '0',
          output: '0'
        });
        break;
      case('='):
        break;
      case('.'):
        !this.state.input.includes(v) && this.setState({
          input: this.state.input + v,
          output: this.state.output + v
        });
        break;
      case('+'):
      case('-'):
      case('X'):
      case('/'):
        ['+', '-', 'X', '/'].some((x) => x === this.state.input.slice(-1)) ? this.setState({
          input: this.state.input.slice(0, -1) + v,
          output: v
        }) : this.setState({
          input: this.state.input + v,
          output: v
        });
        break;
      default:
        this.setState({
          input: this.state.input == '0' ? v : this.state.input + v,
          output: this.state.output == '0' ? v : this.state.output + v
        });
    }
  }

  render() {
    return (
      <div id="app">
        <Display input={this.state.input} output={this.state.output}/>
        <Pad updateScreen={this.updateScreen.bind(this)} keys={['clear', 'divide', 'multiply', 'seven', 'eight', 'nine', 'subtract', 'four', 'five', 'six', 'add', 'one', 'two', 'three', 'equals', 'zero', 'decimal']}/>
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div id="display">
        <Input input={this.props.input}/>
        <br/>
        <Output output={this.props.output}/>
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    return (
      <div id="input">
        {this.props.input == '0' ? '' : this.props.input}
      </div>
    );
  }
}

class Output extends React.Component {
  render() {
    return (
      <div id="output">
        {this.props.output}
      </div>
    );
  }
}

class Pad extends React.Component {
  render() {
    return (
      <div id="pad">
        {this.props.keys.map((k) =>
          <Key key={k} name={k} clear={this.props.clear} updateScreen={this.props.updateScreen}/>
        )}
      </div>
    );
  }
}

class Key extends React.Component {
  constructor(props) {
    super(props);
    this.values = {
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
    }
  }

  render() {
    return (
      <div onClick={() => this.props.updateScreen(this.values[this.props.name])} className="key" id={this.props.name}>
        <div className="key-text">
          {this.values[this.props.name]}
        </div>
      </div>
    );
  }
}

export default App;
