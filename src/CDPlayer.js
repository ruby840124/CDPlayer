import React from 'react';
import './CDPlayer.css';
import play from './assets/play.svg';
import stop from './assets/stop.svg';

const initialState = {
  playState: false,
  audio: null
};

class CDPlayer extends React.Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.addAudio();
  }

  componentWillUnmount() {
    const {audio} = this.state;
    audio.pause();
  }

  addAudio = () => {
    const {mp3} = this.props;
    const audio = document.createElement("audio");
    audio.src = mp3;
    this.setState({audio: audio});
  }

  play = () => {
    const {playState, audio} = this.state;
    if (playState) {
      audio.pause();
      this.setState({playState: false});
    } else {
      audio.play();
      this.setState({playState: true});
    }
  }


  render() {
    const {playState} = this.state;
    const {musicName, author} = this.props;
    return (
        <div className='main'>
            <div className='player'> 
                <div className='playerTopBlock'>
                    <div className='CD' style={{animationPlayState: playState? 'running':'paused'}}>
                        <div className='CDCenter'/>
                    </div>
                    <div className='buttons'>
                      <div>
                        <div className='nextButton'/>
                        <div className='lastButton'/>
                      </div>
                        <div className='cycleButton'/>  
                    </div>
                </div>
                <div className='playerBottomBlock'>
                    <div>
                      <div className='adjustBlock'>
                        <div className='musicInfo'>
                          <div style={{fontSize:'24px', fontWeight:'bold'}}>{musicName}</div>
                          <div>{author}</div>
                        </div>
                        <div className='playerComponent' style={{backgroundImage: 'url(' + require('./assets/player.svg') + ')',}}>
                        </div>
                        <div>456</div>
                      </div>
                      <div className='adjustBar'>123</div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default CDPlayer;