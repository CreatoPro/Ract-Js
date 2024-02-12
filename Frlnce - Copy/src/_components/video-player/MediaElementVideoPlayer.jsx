import React from "react";
import MediaElement from './MediaElement';

class MediaElementVideoComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    getVideoType(videoUrl) {
        let extension;
        let type = "video/mp4";
        if(videoUrl.includes("youtube")) {
            extension = "youtube";
        }
        else if(videoUrl.includes("vimeo")) {
            extension = "vimeo";
        }
        else {
            extension = videoUrl.split('.').pop();
        }
        console.log("extension: "+extension)
        switch (extension){  
            case 'mp4':
                type = "video/mp4";     
                break;
            case 'm3u8':
                type = "video/hls";   
                break;
            case 'webm':
                type = "video/webm";
                break;
            case 'ogg':
                type= "video/ogg"
            case 'youtube':
                type= "video/youtube"
            case 'vimeo':
                type= "video/vimeo"
            default:
                type= "video/"+extension
        }

        return type;
    }

    render() {
        console.log("MediaElementVideoComponent --> render()...");
        const videoURL = this.props.videoUrl;
        let type = this.getVideoType(videoURL);
        console.log("MediaElementVideoComponent --> type: "+type);
        let transcripts = this.props.transcripts;
        let _tracks=[];
        if(transcripts) {
            for (let transcript of transcripts) {
                let track = {
                    src: transcript.src,
                    kind: 'subtitles', //subtitles|captions|chapters
                    lang: transcript.lang,
                    label: transcript.label 
                }
                _tracks.push(track);
            }
        }

        const
            sources = [
                {src: videoURL, type: type}
            ],
            config = {startLanguage: 'en'},
            tracks = _tracks
            ;
            
        return ( 
            <>
                <MediaElement
                    {...this.props}
                    id='mediaelementvideopalyer1'
                    mediaType="video"
                    preload="none"
                    controls = {type==='video/vimeo'? false : true}
                    width="640"
                    height="360"
                    poster=""
                    sources={JSON.stringify(sources)}
                    options={JSON.stringify(config)}
                    tracks={JSON.stringify(tracks)}
                    onPlayerEvent={this.props.onPlayerEvent}
                />            
            </>
        );
    }

}

export default MediaElementVideoComponent;