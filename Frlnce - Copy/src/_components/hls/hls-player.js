import React, { Component } from "react";
import Hls from "hls.js";

class Player extends Component {
state = {};

componentDidMount() {
    if (Hls.isSupported() && this.player) {
        const video = this.player;
        const hls = new Hls();
        hls.loadSource(this.props.url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
           video.play();
        });
    }
}

 render() {
  return (
        <video controls={true} ref={(player) => this.player = player} />
  );
 }

}

export default Player;