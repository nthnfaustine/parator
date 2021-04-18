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
      wordDic: [],
      wordDicLabel: [],
      akhiran: ''
    }
  }

  componentDidMount(){
    fetch('./word_dict.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    }
    )
    .then(response => response.json())
    .then(users => this.setState({wordDic: users}))

    fetch('./word_dict_label.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    }
    )
    .then(response => response.json())
    .then(users => this.setState({wordDicLabel: users}))
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    const theString = this.state.input.split(" ");
    const lastWord = theString[theString.length - 1].toLowerCase();
    const result = lastWord.split('')
    var i;
    var resultt = []
    for (i = 0; i < result.length; i++) {
      resultt.push(this.state.wordDic[result[i]]);
    }
    for (i = 0; i < 120 - result.length; i++){
      resultt.unshift(0)
    }
    const converted = tf.tensor1d(resultt).expandDims(0);
    this.predictAkhiran(converted)


    

  }

  // async generatePantun(message){
  //   console.log("started");
  //   const model = await tf.loadLayersModel('./detectModel/model.json');
  //   console.log(message)
  //   // const predicted = model.predict(message)
  //   // console.log(predicted);
  // }

  async predictAkhiran(message){
    console.log("detecting akhiran...");
    const model = await tf.loadLayersModel('./rhymeModel/model.json');
    const predicted = model.predict(message)
    predicted.data().then(data => {
      const number = Math.max.apply(Math, data);
      const index = data.indexOf(number)
      const new_json = this.swap(this.state.wordDicLabel)
      this.setState({akhiran: new_json[index]})
      console.log(this.state.akhiran)
    })
  }

  swap(json){
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    return ret;
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
