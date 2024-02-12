import React, { Component } from "react";
import VideoPlayer from "../../_components/video-player";
import Button from "react-bootstrap/Button";

class ScratchPad extends Component { 

	constructor(props) {
        super(props);
        //console.log("ScratchPad -> constructor()... ");
    }
    
    componentDidMount() {
        //console.log("ScratchPad -> componentDidMount()... ");
    }
    
    render() {
        //console.log("ScratchPad -> render()... ");  
        //return this.renderVideoPlayer();
        return this.renderOfflineDownload();
    }

    renderOfflineDownload() {
        return (
            <>
            <br></br>
            <Button variant="primary button-full ilearn-blue-btn button-md" id="offlineDownload">
                <span className="button-inner"> Offline Download </span>
            </Button>
            </>
        )
    }

    renderVideoPlayer() {
            //http://www.storiesinflight.com/js_videosub/jellies.srt
            //https://walsh9.github.io/videojs-transcript/captions/captions.en.vtt
        const url = //"https://s3.amazonaws.com/ibleducation-brainlab/BC101/wGumvoH1FxQ.mp4",
                    //"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                    //"http://www.youtube.com/watch?v=nOEw9iiopwI",
                    //"http://player.vimeo.com/video/523181639",
                    "https://player.vimeo.com/video/500726329",
                    //"https://tuningfork-live.s3.amazonaws.com/icegateacademy/uploads/study_resource/transcoder/5/27-8-16/1/5.m3u8",
            transcripts = [
            {"src":"https://walsh9.github.io/videojs-transcript/captions/captions.en.vtt",
                "lang":"en","label":"sub-titles"}
        ]
        ;
        return (  
            <>
                <VideoPlayer
                    url={url}
                    transcripts={transcripts}
                    resourceId="404"
                    resourceName="Dr. Abdul Kalam's Streaming Video"
                />
            </>           
              
        );
    }

}

  
export default ScratchPad;