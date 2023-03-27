import './App.css';
import Countdown from 'react-countdown';
import { Component } from 'react';
import Header from './components/Header';
import Swal from 'sweetalert2'

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
    if (target.name === 'minutes' && target.value < 60 && target.value >= 0) {
      this.setState({
        [target.name]: Number(target.value),
        buttonDisable: false
      })
    } else if (target.name === 'seconds' && target.value < 60 && target.value >= 0) {
      this.setState({
        [target.name]: Number(target.value),
        buttonDisable: false
      }) 
    } else {
      alert('Valores inválidos')
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

  render(){
    const {minutes, seconds, timerValue, start, displayInput, buttonDisable} = this.state
    const renderer = ({ minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        this.setState({displayInput: true})
        Swal.fire({
          title: 'Timer finalizado',
          icon: 'success',
          confirmButtonText: 'Reiniciar!'
        })
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
            <div className='inputs'>
              <p><input type="text" placeholder='Minutos' value={minutes} onChange={this.handleChange} name="minutes"/></p>
              <p><input type="text" placeholder='Segundos' value={seconds} onChange={this.handleChange} name="seconds"/></p>
            </div>
            <button type='submit' onClick={(this.handleStart)} disabled={buttonDisable}>Start</button>
            </div>
        ) :
        <div className='timerRunning'>
          <Countdown date={Date.now() + timerValue} autoStart={start} controlled={false} onPause={() => false} renderer={renderer}/>
          <audio data-testid="audio-component" src="./audio/hadouken.mp3" controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento{" "} <code>audio</code>
          </audio>
          <button type='submit' onClick={(this.handleCancel)}>Cancelar</button>
        </div>
        }

        
      </section>
    );
  }
}

export default App;
