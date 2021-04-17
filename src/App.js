import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import InputForm from './components/InputForm/InputForm';
import Rank from './components/Rank/Rank';
import Result from './components/Result/Result';
import * as tf from '@tensorflow/tfjs';

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    const theString = this.state.input.split(" ");
    const lastWord = theString[theString.length - 1];


  }

  async generatePantun(message){
    console.log("started");
    const model = await tf.loadLayersModel('./detectModel/model.json');
    // model.predict()
    // console.log(model);
  }

  async predictAkhiran(message){
    console.log("started");
    const model = await tf.loadLayersModel('./detectModel/model.json');
    // model.predict()
    // console.log(model);
  }

  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <InputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <Result sampiran={this.state.input}/>
        {/* {this.loadModel()} */}
      </div>
    );
  }
}

export default App;
