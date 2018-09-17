import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      output: '0',
      answered: false,
      decimalAllowed: true,
      lastAnswer: ''
    };
    this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    switch(e.key) {
        case('0'):
          document.getElementById('zero').click();
          break;
        case('1'):
          document.getElementById('one').click();
          break;
        case('2'):
          document.getElementById('two').click();
          break;
        case('3'):
          document.getElementById('three').click();
          break;
        case('4'):
          document.getElementById('four').click();
          break;
        case('5'):
          document.getElementById('five').click();
          break;
        case('6'):
          document.getElementById('six').click();
          break;
        case('7'):
          document.getElementById('seven').click();
          break;
        case('8'):
          document.getElementById('eight').click();
          break;
        case('9'):
          document.getElementById('nine').click();
          break;
        case('Backspace'):
          document.getElementById('clear').click();
          break;
        case('/'):
          document.getElementById('divide').click();
          break;
        case('x'):
        case('X'):
        case('*'):
          document.getElementById('multiply').click();
          break;
        case('+'):
          document.getElementById('add').click();
          break;
        case('-'):
          document.getElementById('subtract').click();
          break;
        case('.'):
          document.getElementById('decimal').click();
          break;
        case('Enter'):
        case('='):
          document.getElementById('equals').click();
          break;
        default:
          break;
    };
  }

  outputTooLong() {
    if (this.state.output.length < 20)
      return false;
    this.setState({
      output: 'DIGIT LIMIT MET'
    });
    return true;
  }

  updateScreen(v) {
    this.state.answered && this.setState({
      input: '0',
      output: '0',
      answered: false
    });
    switch(v) {
      case('AC'):
        this.setState({
          input: '0',
          output: '0',
          decimalAllowed: true
        });
        break;
      case('='):
        const answer = eval(this.state.input.replace('X', '*'));
        this.setState({
          input: this.state.input + '=' + answer,
          output: answer,
          answered: true,
          lastAnswer: '' + answer
        });
        break;
      case('.'):
        this.state.decimalAllowed && !this.outputTooLong() && this.setState({
          input: this.state.input + v,
          output: this.state.output + v,
          decimalAllowed: false
        });
        break;
      case('+'):
      case('-'):
      case('X'):
      case('/'):
        const lastAnswer = this.state.lastAnswer;
        lastAnswer !== '' && this.setState({
          input: lastAnswer,
          lastAnswer: ''
        });
        ['+', '-', 'X', '/'].some((x) => x === this.state.input.slice(-1)) ? this.setState({
          input: this.state.input.slice(0, -1) + v,
          output: v,
          decimalAllowed: true
        }) : this.setState({
          input: this.state.input + v,
          output: v,
          decimalAllowed: true
        });
        break;
      default:
        !this.outputTooLong() && this.setState({
          input: this.state.input == '0' ? v : this.state.input + v,
          output: ['+', '-', 'X', '/', '0'].some((x) => x === this.state.input.slice(-1)) ? v : this.state.output + v
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
