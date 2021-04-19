import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import InputForm from './components/InputForm/InputForm';
import Rank from './components/Rank/Rank';
import Result from './components/Result/Result';
import * as tf from '@tensorflow/tfjs';

class App extends Component {
  constructor(){
    super();
    this.state = {
      input1: '',
      input2: '',
      wordDic: [],
      wordDicLabel: [],
      pantunDic: [],
      akhiran1: '',
      output1: '',
      reverseOutput1: '',
      akhiran2: '',
      output2: '',
      reverseOutput2: '',
      kamos: {}
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

    fetch('./test.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    }
    )
    .then(response => response.json())
    .then(users => this.setState({kamos: users}))
  }

  onInputChange = (event) => {
    const masuk = event.target.value
    const masukk = masuk.split(' ')
    this.setState({ input1: masuk })
    this.setState({ output1: masukk[masukk.length - 1] })
    // this.setState({ reverseOutput1: masukk[masukk.length - 1] })
  }

  onInputChange2 = (event) => {
    const masuk = event.target.value
    const masukk = masuk.split(' ')
    this.setState({ input2: masuk })
    this.setState({ output2: masukk[masukk.length - 1] })
    // this.setState({ reverseOutput2: masukk[masukk.length - 1] })
  }

  onButtonSubmit = () => {
    // GENERATE AKHIRAN WITH THIS
    const theString1 = this.state.input1.split(" ");
    const theString2 = this.state.input2.split(" ");
    const lastWord1 = theString1[theString1.length - 1].toLowerCase();
    const lastWord2 = theString2[theString2.length - 1].toLowerCase();
    const result1 = lastWord1.split('')
    const result2 = lastWord2.split('')

    var i;
    var resultt1 = []
    var resultt2 = []
    for (i = 0; i < result1.length; i++) {
      resultt1.push(this.state.wordDic[result1[i]]);
    }
    for (i = 0; i < 120 - result1.length; i++){
      resultt1.unshift(0)
    }
    for (i = 0; i < result2.length; i++) {
      resultt2.push(this.state.wordDic[result2[i]]);
    }
    for (i = 0; i < 120 - result2.length; i++){
      resultt2.unshift(0)
    }

    const converted1 = tf.tensor1d(resultt1).expandDims(0);
    const converted2 = tf.tensor1d(resultt2).expandDims(0);
    // console.log("ini :" + converted2);

    const predicting = async _ => {
      await this.predictAkhiran(converted1);
      await this.predictAkhiranOther(converted2);
      await new Promise(r => setTimeout(r, 400));

      const akhiran = this.state.kamos['akhiran']
      const kata = this.state.kamos['kata']
      const new_akhiran = this.swap(akhiran)
      const number1 = new_akhiran[this.state.akhiran1];
      const number2 = new_akhiran[this.state.akhiran2];
      const kata1 = kata[number1];
      const kata2 = kata[number2];
      this.setState({ output1: kata1 });
      this.setState({ reverseOutput1: kata1 });
      this.setState({ output2: kata2 });
      this.setState({ reverseOutput2: kata2 });
      await new Promise(r => setTimeout(r, 400));
      
      // GENERATE PANTUN WITH THIS
      for(i = 0; i < 3; i++){
        await this.generatePantun(this.state.output1);
        await this.generatePantunOther(this.state.output2)
        await new Promise(r => setTimeout(r, 400));
      }
    }

    predicting();
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
      const newString = this.state.output1 + " " + new_json[index];
      const reversedNewString = new_json[index] + " " + this.state.reverseOutput1;
      this.setState({output1: newString});
      this.setState({reverseOutput1: reversedNewString});
      console.log(newString);
    })
  }

  async generatePantunOther(message){
    console.log("cooking pantun");
    const model = await tf.loadLayersModel('./pantunModel/model.json');
    const pantunInput = await this.preprocessPantunInput(message);
    const predicted = model.predict(pantunInput)
    predicted.data().then(data => {
      const number = Math.max.apply(Math, data);
      const index = data.indexOf(number);
      const new_json = this.swap(this.state.pantunDic);
      const newString = this.state.output2 + " " + new_json[index];
      const reversedNewString = new_json[index] + " " + this.state.reverseOutput2;
      this.setState({output2: newString});
      this.setState({reverseOutput2: reversedNewString});
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
      this.setState({akhiran1: new_json[index]})
    })
  }

  async predictAkhiranOther(message){
    console.log("detecting akhiran...");
    const model = await tf.loadLayersModel('./rhymeModel/model.json');
    const predicted = model.predict(message)
    predicted.data().then(data => {
      const number = Math.max.apply(Math, data);
      const index = data.indexOf(number)
      const new_json = this.swap(this.state.wordDicLabel)
      this.setState({akhiran2: new_json[index]})
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
        <Rank />
        <InputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onInputChange2={this.onInputChange2}/>
        <Result sampiran1={this.state.input1} sampiran2={this.state.input2} output1={this.state.reverseOutput1} output2={this.state.reverseOutput2}/>
      </div>
    );
  }
}

export default App;
