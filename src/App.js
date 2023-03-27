import logo from './logo.svg';
import './App.css';
import Countdown from 'react-countdown';
import { Component } from 'react';
import Header from './components/Header';

class App  extends Component{
  constructor() {
    super();
    this.state = {
      minutes: '',
      seconds: '',
      timerValue: 0,
      start: false,
      displayInput: true,
      buttonDisable: true
    };
  }

  handleChange = ({target}) => {
    if (target.name === 'minutes') {
      this.setState({
        [target.name]: Number(target.value),
        buttonDisable: false
      })
    } else {
      this.setState({
        [target.name]: Number(target.value),
        buttonDisable: false
      }) 
    }
    const {minutes, seconds } = this.state
    if (minutes.length > 0 || seconds.length > 0) {
    }
  }

  handleStart = (event) => {
    event.preventDefault()
    const {minutes, seconds} = this.state
    const timeInSeconds = (minutes * 1000 * 60) + (seconds * 1000)
    this.setState({ timerValue: timeInSeconds, start: true, displayInput: false})
  }

  handleCancel = (event) => {
    event.preventDefault()
    this.setState({ 
      timerValue: 0,
      start: false,
      displayInput: true,
      minutes: '',
      seconds: '',
      buttonDisable: true
    })
  }

  render(){
    const {minutes, seconds, timerValue, start, displayInput, buttonDisable} = this.state
    const renderer = ({ minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return
      } else {
        // Render a countdown
        return <span className='counter'>{minutes > 9 ? minutes : `0${minutes}`}:{seconds > 9 ? seconds : `0${seconds}`}</span>;
      }
    };
    return (
      <section className='appDefault'>
        <Header />
        {
          displayInput ?
          (<div className='inputCard'>
          <h1>Bora pro intervalo?</h1>
            <p><input type="text" placeholder='Digite os minutos!' value={minutes} onChange={this.handleChange} name="minutes"/></p>
            <p><input type="text" placeholder='Digite os segundos!' value={seconds} onChange={this.handleChange} name="seconds"/></p>
            <button type='submit' onClick={(this.handleStart)} disabled={buttonDisable}>Start</button>
            </div>
        ) :
        <div className='timerRunning'>
          <Countdown date={Date.now() + timerValue} autoStart={start} renderer={renderer}/>
          <button type='submit' onClick={(this.handleCancel)}>Cancelar</button>
        </div>
        }

        
      </section>
    );
  }
}

export default App;
