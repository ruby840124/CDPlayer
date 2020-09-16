import React from 'react';
import mp3 from './assets/music.mp3';
import CDPlayer from './CDPlayer';
import './App.css';

const initialState = {
  clockState: true
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }


  render() {
    return (
      <div className='App'>
        <CDPlayer mp3= {mp3} musicName= {'黑色幽默'} author= {'周杰倫'}/>
      </div>
    );
  }
}
export default App;