import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: parseInt(props.startTimeInSeconds, 10) || 60*60
    };
  }

  tick() {
	  if(this.state.seconds!=0){
      this.setState(state => ({ seconds: state.seconds - 1 }));
      localStorage.setItem('time_left', this.state.seconds);
      this.props.currentTime(this.state.seconds);
	  }else{
        console.log("timer end");
        //document.getElementById("endExam").click();
        clearInterval(this.interval);
        this.props.EndExam();
	  }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime(secs) {
    let hours   = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    return [hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v,i) => v !== '00' || i > 0)
        .join(':');
  }

  render() {
    return (
      <>
      {
        this.props.type==="mobile" ?
        <div>
          <FontAwesomeIcon icon={ faClock }/>  {this.formatTime(this.state.seconds)}
        </div>
        :
        <div class="timer_block">
          <div class="timer_div">
              Time Left : <span class="icon-time"><FontAwesomeIcon icon={faClock} /></span>
              <span id="timerspan" class=""> {this.formatTime(this.state.seconds)}</span>
          </div>
        </div>
      }
      </>
    );
  }
}

export default Timer