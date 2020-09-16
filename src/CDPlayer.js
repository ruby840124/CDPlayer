import React from 'react';
import './CDPlayer.css';
import sound from './assets/sound.svg';
import play from './assets/play.svg';
import pause from './assets/stop.svg';
import rightLine from './assets/line.svg';
import leftLine from './assets/line3.svg';
import left2Line from './assets/line2.svg';

const initialState = {
  voice: 50,
  init: true,
  cycleState: false,
  playState: false,
  audio: null
};

class CDPlayer extends React.Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.addAudioComponent();
  }

  componentWillUnmount() {
    const {audio} = this.state;
    audio.pause();
  }

  //加入音訊
  addAudioComponent = () => {
    const {mp3} = this.props;
    const audio = document.createElement("audio");
    audio.src = mp3;
    audio.volume = 0.5;
    this.setState({audio: audio});
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

  //控制聲音
  voice = () =>{
    const {audio} = this.state;
    const voiceValue = document.getElementById("voice");
    audio.volume = voiceValue.value/100;
    this.setState({voice: voiceValue.value});
  }


  render() {
    const {playState, cycleState, voice} = this.state;
    const {musicName, author} = this.props;
    return (
        <div className='main'>
            <div className='player'> 
                <div className='CDBlock'>
                    <div><img className='rightLine' src={rightLine} alt="logo" style={{animationPlayState: playState? 'running':'paused'}} /></div>
                    <div className='CD' style={{animationPlayState: playState? 'running':'paused'}}>
                        <div className='CDCenter'/>
                    </div>
                    <div><img className='leftLine' src={leftLine} alt="logo" style={{animationPlayState: playState? 'running':'paused'}} /></div>
                    <div><img className='leftLine' src={left2Line} alt="logo" style={{animationPlayState: playState? 'running':'paused'}} /></div>
                    <div className='buttons'>
                      <div>
                        <div className='nextButton'/>
                        <div className='lastButton'/>
                      </div>
                      <div className='cycleBlock'>
                        <div className='cycleButton' 
                          onClick={this.cycle} style={this.getCycleState()} />  
                         <div style={{width:'10px', height:'10px', backgroundColor:'black', borderRadius: '100%', visibility: cycleState? 'visible': 'hidden'}} />  
                      </div>
                    </div>
                </div>
                <div className='controlBlock'>
                    <div>
                      <div className='controlVoiceBlock'>
                        <div className='musicInfo'>
                          <div style={{fontSize:'24px', fontWeight:'bolder'}}>{musicName}</div>
                          <div>{author}</div>
                        </div>
                        <div  className='playerComponentBlock'>
                          <div className='playButton' onClick={this.play}>
                            <img src={playState ? play: pause} className='playButtonImg' alt="logo" />
                          </div>
                          <div className='playerComponent' 
                            style={this.getPlayAnimation()}/>
                        </div>
                        <div className= 'controlSound'>
                          <input id='voice' className='slider' type="range" min="0" max="100" value={voice} onChange={this.voice}/>
                          <img src={sound} style={{width:'25px', height: '25px', marginLeft: '5px'}}></img>
                        </div>
                      </div>
                      <div className='controlmusicBlock'>
                        <input className='musicSlider' type="range" min="0" max="100" value='50'/>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default CDPlayer;