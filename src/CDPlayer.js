import React from 'react';
import './CDPlayer.css';
import sound from './assets/sound.svg';
import play from './assets/play.svg';
import pause from './assets/stop.svg';
import rightLine from './assets/line.svg';
import leftLine from './assets/line3.svg';
import left2Line from './assets/line2.svg';
import taste from './assets/taste.mp3';
import angel from './assets/angel.mp3';
import tasteCover from './assets/music_taste.jpg';
import angelCover from './assets/music_angel.jpg';

const initialState = {
  voice: 50, //mp3的聲音大小
  init: true, //控制第一次play物件的動畫
  cycleState: false, //歌曲循環按鈕
  playState: false, //開始&暫停按鈕
  audio: null, //放mp3的物件
  durationText: null, //mp3的總時間
  currentTimeText: '00:00',
  duration: 0,
  currentTime: 0,
  index: 0,
};

const music = [taste, angel];
const musicTitle = ['immaculate taste' , 'Angel With A Shotgun'];
const musicAuthor = ['engelwood', 'The Cab'];
const musicCover = [tasteCover, angelCover];

class CDPlayer extends React.Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.addAudioComponent(music[0]);
  }

  componentWillUnmount() {
    const {audio} = this.state;
    audio.pause();
  }

  //加入音訊
  addAudioComponent = (firstMusic) => {
    const {index} =this.state;
    const audio = document.createElement("audio");
    audio.src = firstMusic;
    audio.preload='metadata';
    audio.volume = 0.5; //初始音量
    audio.onloadedmetadata = () => {
      const duration = Math.floor(audio.duration)
			this.setState({durationText: this.msToTime(duration), duration: duration});
    };
    audio.onended = () => {
      const {cycleState} = this.state;
      if(!cycleState){
        if(index + 1 < music.length){
          this.updateAudioComponent(music[index+1]);
          this.setState({index: index + 1});
        }else{
          this.updateAudioComponent(music[0]);
          this.setState({index: 0});
        }
      }else {
        this.updateAudioComponent(music[index]);
      }
    }
    this.currentTimeInterval = setInterval( () => {
      const currentTime = this.msToTime(Math.floor(audio.currentTime));
      this.setState({currentTimeText: currentTime, currentTime: audio.currentTime});
    }, 500);
    this.setState({audio: audio});
  }

    //加入音訊
    updateAudioComponent = (newMusic) => {
      const {audio, playState} =this.state;
      if(playState){
        audio.pause();
        audio.src = newMusic;
        audio.volume = 0.5; //初始音量
        audio.currentTime = 0; //初始音量
        audio.load();
        audio.play();
        this.setState({currentTimeText: '00:00', currentTime: 0});
      }else {
        audio.src = newMusic;
        audio.volume = 0.5; //初始音量
        audio.currentTime = 0; //初始音量
        audio.load();
        this.setState({currentTimeText: '00:00', currentTime: 0});
      }
    }

  msToTime = (duration) => {
    let seconds = (duration % 60).toLocaleString();
    let minutes = (Math.floor(duration / 60)).toLocaleString();
    minutes = (minutes.length === 1) ? "0" + minutes : minutes;
    seconds = (seconds.length === 1) ? "0" + seconds : seconds;
  
    return minutes + ":" + seconds;
  }


  //mp3播放&暫停按鈕
  play = () => {
    const {playState, audio, init} = this.state;
    if(init) {
      this.setState({init: false});
    }
    if (playState) {
      audio.pause();
      this.setState({playState: false});
    } else {
      audio.play();
      this.setState({playState: true});
    }
  }

  //mp3循環按鈕
  cycle = () => {
    const {cycleState} = this.state;
    if (cycleState) {
      this.setState({cycleState: false});
    } else {
      this.setState({cycleState: true});
    }
  }

  //mp3循環按鈕style
  getCycleState = () => {
    const {cycleState} = this.state;
    if (cycleState) {
     const afterStyle = document.createElement('style');
     afterStyle.innerHTML = '.cycleButton:after{visibility: hidden}';
     document.head.appendChild(afterStyle);
      return {
        border: '4px solid #000',
        transform: 'translate(3px, 2px)',
        backgroundColor:'#E0E0E0'
      };
    } else {
      const afterStyle = document.createElement('style');
      afterStyle.innerHTML = '.cycleButton:after{visibility: visible}';
      document.head.appendChild(afterStyle);
      return {
        backgroundColor:'white'
      };
    }
  }

  getPlayAnimation = () => {
    const {playState, init} = this.state;
    if(!init){
      if(playState){
        return {
          animation: 'forwards playAnimation 0.2s linear'
        };
      }
      return {
        animation: 'stopAnimation 0.2s linear'
      };
    }
  }

  next = () => {
    const {index, audio} = this.state;
    if(index + 1 < music.length){
      this.updateAudioComponent(music[index+1]);
      this.setState({index: index + 1});
    }else{
      this.updateAudioComponent(music[0]);
      this.setState({index: 0});
    }
  }

  last = () => {
    const {index, audio} = this.state;
    if(index - 1 >= 0){
      this.updateAudioComponent(music[index-1]);
      this.setState({index: index - 1});
    }else{
      this.updateAudioComponent(music[music.length-1]);
      this.setState({index: music.length - 1});
    }
  }

  //控制聲音
  voice = () =>{
    const {audio} = this.state;
    const voiceValue = document.getElementById("voice");
    audio.volume = voiceValue.value/100; //聲音參數0.0 ~ 1.0
    this.setState({voice: voiceValue.value});
  }

  currentTime = () => {
    const {audio} = this.state;
    const musicValue = document.getElementById("music");
    audio.currentTime = musicValue.value;
    this.setState({currentTime: musicValue.value});
  }

  getHiddenCDAnimation = () => {
    const {hidden, hiddenInit} = this.props;
    if(!hiddenInit){
      if(hidden){
        return {
          animation: 'forwards hiddenCD 0.5s ease-out'
        };
      }else {
        return {
          animation: 'forwards showCD 0.5s ease-out'
      };
      }
    }
  }

  render() {
    const {playState, cycleState, voice, durationText, currentTimeText, currentTime, duration, index} = this.state;
    const {musicName, author} = this.props;
    return (
        <div className='main'>
            <div className='player' style={this.getHiddenCDAnimation()}> 
                <div className='CDBlock'>
                  <div><img className='rightLine' src={rightLine} alt="logo" style={{visibility: playState? 'visible':'hidden'}} /></div>
                  <div className='CD' 
                    style={{animationPlayState: playState? 'running':'paused', backgroundImage: 'url(' + musicCover[index] + ')'}}>
                      <div className='CDCenter'/>
                  </div>
                  <div><img className='leftLine' src={leftLine} alt="logo" style={{visibility: playState? 'visible':'hidden'}}/></div>
                  <div><img className='leftLine' src={left2Line} alt="logo" style={{visibility: playState? 'visible':'hidden'}}/></div>
                  <div className='buttons'>
                    <div>
                      <div className='nextButton' onClick={this.next}/>
                      <div className='lastButton' onClick={this.last}/>
                    </div>
                    <div className='cycleBlock'>
                      <div className='cycleButton' onClick={this.cycle} style={this.getCycleState()} />  
                      <div style={{width:'0.4vw', height:'0.4vw', backgroundColor:'black', borderRadius: '100%', visibility: cycleState? 'visible': 'hidden'}} />  
                    </div>
                    </div>
                </div>
                <div className='controlBlock'>
                  <div className='controlVoiceBlock'>
                    <div className='musicInfo'>
                      <div className='musicName'>{musicTitle[index]}</div>
                      <div>{musicAuthor[index]}</div>
                    </div>
                    <div  className='playerComponentBlock'>
                      <div className='playButton' onClick={this.play}>
                        <img src={playState ? pause: play} className='playButtonImg' alt="logo" />
                      </div>
                      <div className='playerComponent' style={this.getPlayAnimation()}/>
                    </div>
                    <div className= 'controlSound'>
                      <input id='voice' className='slider' type="range" min="0" max="100" value={voice} onChange={this.voice}/>
                      <img src={sound} className='soundImg' alt="logo" ></img>
                    </div>
                  </div>
                  <div className='controlmusicBlock'>
                    <div style={{marginLeft: '5px', fontWeight:'bolder'}}>{currentTimeText}</div>
                    <input id='music' className='musicSlider' type="range" min='0' max={duration} value={currentTime} onChange={this.currentTime}/>
                    <div style={{marginRight: '5px', fontWeight:'bolder'}}>{durationText}</div>
                  </div>
                </div>
              </div>
        </div>
    );
  }
}
export default CDPlayer;