import React from 'react';
import mp3 from './assets/taste.mp3';
import cover from './assets/cover_.jpg';
import CDPlayer from './CDPlayer';
import './App.css';

const initialState = {
  hiddenList: false,
  init: true,
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  hiddenList = () =>{
    const {hiddenList, init} = this.state;
    if(init) {
      this.setState({init: false});
    }
    if (hiddenList) {
      this.setState({hiddenList: false});
    } else {
      this.setState({hiddenList: true});
    }
  }


  getHiddenSearchListAnimation = () => {
    const {hiddenList, init} = this.state;
    if(!init){
      if(hiddenList){
        return {
          animation: 'forwards hiddenSearchList 0.5s ease-out'
        };
      }else {
        return {
          animation: 'forwards showSearchList 0.5s ease-out'
        };
      }
    }
  }

  getMusicListAnimation = () => {
    const {hiddenList, init} = this.state;
    if(!init){
      if(hiddenList) {
        return {
          animation: 'forwards hiddenMusicList 0.5s ease-out'
        };
      }else {
        return {
          animation: 'forwards showMusicList 0.5s ease-out'
        };
      }
    }
  }

  render() {
    const {hiddenList, init} =  this.state;
    return (
      <div className = 'App'>
        <div className = 'listBlock'>
          <div className = 'searchList' style = {this.getHiddenSearchListAnimation()}>456</div>
          <div className = 'musicList' style = {this.getMusicListAnimation()}>
            <div className = 'title'>
              <div className ='titleText'>工作歌單</div>
              <div className ='listButton' onClick = {this.hiddenList}>
                List
                <div className='line'/>
                <div className='line'/>
                <div className='line'/>
              </div>
            </div>
            <div className = 'list'>
              <div>list</div>
            </div>
            <div className = 'cover'>
              <div className='coverImg' style={{backgroundImage: 'url(' + require('./assets/cover_.jpg') + ')'}}></div>
            </div>
          </div>
        </div>
        <CDPlayer mp3 = {mp3} musicName = {'immaculate taste'} author = {'engelwood'} hidden = {hiddenList} hiddenInit = {init}/>
      </div>
    );
  }
}
export default App;