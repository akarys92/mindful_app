import React, { Component } from 'react';
import Test from './test';
import './App.css';
import logo from './assets/MM-Label.JPG';
import StoreFront from './store/storefront';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="wrapper">
          <img src={logo} />
        </header>
        <div id='main'>
          <StoreFront />
        </div>
        <footer>Footer</footer>
      </div>
    );
  }
} 

export default App;
