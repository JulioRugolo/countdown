import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    const url = 'https://raw.githubusercontent.com/JulioRugolo/portfolio/6c64bdcbf5127d1f043b2dbf4b61d6827dbf1f7d/src/Components/img/Logo.svg'
    const urlTrybe = 'https://www.betrybe.com/static/images/logo-negative-green.svg'
    return (
      <header>
        <img src={url} alt="logo" />
        <h1>Tryber Timer</h1>
        <img src={urlTrybe} alt="logo" className='trybe' />
      </header>
    );
  }
}

export default Header;