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
      akhiran: '',
      pantunDic: [],
      output: '',
      reverseOutput: ''
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

    fetch('./generator_dict.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    }
    )
    .then(response => response.json())
    .then(users => this.setState({pantunDic: users}))
  }

  onInputChange = (event) => {
    const masuk = event.target.value
    const masukk = masuk.split(' ')
    this.setState({ input: masuk })
    this.setState({ output: masukk[masukk.length - 1] })
    this.setState({ reverseOutput: masukk[masukk.length - 1] })
  }

  onButtonSubmit = () => {
    // const theString = this.state.input.split(" ");
    // const lastWord = theString[theString.length - 1].toLowerCase();
    // const result = lastWord.split('')
    // var i;
    // var resultt = []
    // for (i = 0; i < result.length; i++) {
    //   resultt.push(this.state.wordDic[result[i]]);
    // }
    // for (i = 0; i < 120 - result.length; i++){
    //   resultt.unshift(0)
    // }
    // const converted = tf.tensor1d(resultt).expandDims(0);
    // this.predictAkhiran(converted)

    var i;
    const forLoop = async _ => {
      for(i = 0; i < 3; i++){
        await this.generatePantun(this.state.output);
        await new Promise(r => setTimeout(r, 500));
      }
    }
    forLoop();
    

    
    


    

  }

  async generatePantun(message){
    console.log("cooking pantun");
    const model = await tf.loadLayersModel('./pantunModel/model.json');
    const pantunInput = await this.preprocessPantunInput(message);
    const predicted = model.predict(pantunInput)
    predicted.data().then(data => {
      const number = Math.max.apply(Math, data);
      const index = data.indexOf(number);
      const new_json = this.swap(this.state.pantunDic);
      const newString = this.state.output + " " + new_json[index];
      const reversedNewString = new_json[index] + " " + this.state.reverseOutput;
      this.setState({output: newString});
      this.setState({reverseOutput: reversedNewString});
      console.log(newString);
    })
  }

  async predictAkhiran(message){
    console.log("detecting akhiran...");
    const model = await tf.loadLayersModel('./rhymeModel/model.json');
    const predicted = model.predict(message)
    predicted.data().then(data => {
      const number = Math.max.apply(Math, data);
      const index = data.indexOf(number)
      const new_json = this.swap(this.state.wordDicLabel)
      this.setState({akhiran: new_json[index]})
    })
  }

  preprocessPantunInput(message){
    const newMes = message.toLowerCase();
    const theString = newMes.split(" ");
    var sequence = [];
    var i;
  
    for (i = 0; i < theString.length; i++) {
      var tokenizedMes = 0
      if (theString[i] in this.state.pantunDic){
        tokenizedMes = this.state.pantunDic[theString[i]]
      }
      sequence.push(tokenizedMes);
    }
    for (i = 0; i < 7 - theString.length; i++) {
      sequence.unshift(0);
    }
    const seqConverted = tf.tensor1d(sequence).expandDims(0);

    return seqConverted;
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
        <Result sampiran={this.state.reverseOutput}/>
        {/* {this.loadModel()} */}
      </div>
    );
  }
}

export default App;
