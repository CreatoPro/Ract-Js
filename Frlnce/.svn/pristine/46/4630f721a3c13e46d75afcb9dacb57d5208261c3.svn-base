import React, { Component } from "react";
import MediaElementVideoComponent from "./MediaElementVideoPlayer";

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
        
    }

    render() {
        return (
                <MediaElementVideoComponent 
                    videoUrl={this.props.url}
                    transcripts={this.props.transcripts}
                    onPlayerEvent={this.onPlayerEvent}
                />
        );
    }

    onPlayerEvent(eventData) {
        console.log("onPlayerEvent>>> "+JSON.stringify(eventData));
    }

}

export default VideoPlayer;