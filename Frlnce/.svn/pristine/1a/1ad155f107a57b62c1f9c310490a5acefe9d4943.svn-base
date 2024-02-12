import React, { Component } from 'react';
import flvjs from 'flv.js';
import hlsjs from 'hls.js';
import 'mediaelement';
import 'mediaelement/build/renderers/vimeo';

// Import stylesheet and shims
import 'mediaelement/build/mediaelementplayer.min.css';
import 'mediaelement/build/mediaelement-flash-video.swf';

export default class MediaElement extends Component {

    state = {}
    
    constructor(props) {
		console.log("MediaElement --> constructor()...");
        super(props);
        this.state = {currentTime: 0.0, hlsPlayer: null};
        
        // This binding is necessary to make `this` work in the callback
       // this.handlePlayer = this.handlePlayer.bind(this);
		//this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
		this.doOnOrientationChange = this.doOnOrientationChange.bind(this);
		window.addEventListener('orientationchange', this.doOnOrientationChange);
    }

	success(media, node, instance) {
		// Your action when media was successfully loaded
		//console.log("MediaElement --> success()...");
		this.doOnOrientationChange();
	}

	error(media) {
		// Your action when media had an error loading
	}

	render() {
		console.log("MediaElement --> constructor()...controls"+this.props.controls);
		const
			props = this.props,
			sources = JSON.parse(props.sources),
			tracks = JSON.parse(props.tracks),
			sourceTags = [],
			tracksTags = []
		;

		for (let i = 0, total = sources.length; i < total; i++) {
			const source = sources[i];
			sourceTags.push(`<source src="${source.src}" type="${source.type}">`);
		}

		for (let i = 0, total = tracks.length; i < total; i++) {
			const track = tracks[i];
			//tracksTags.push(`<track src="${track.src}" kind="${track.kind}" srclang="${track.lang}"${(track.label ? ` label=${track.label}` : '')}>`);
			tracksTags.push(`<track src="${track.src}" kind="${track.kind}" 
			srclang="${track.lang}" 
			${(track.label ? ` label=${track.label}` : '' )} 
			${(track.label && track.label==='en')? 'default' :''} 
			>`);
		}

		const
			mediaBody = `${sourceTags.join("\n")}
				${tracksTags.join("\n")}`,
			mediaHtml = props.mediaType === 'video' ?
				`<video id="${props.id}" style="width:100%;height:100%;"  width="${props.width}" height="${props.height}"${(props.poster ? ` poster=${props.poster}` : '')}
					${(props.controls ? ' controls' : '')}
					${(props.preload ? ` preload="${props.preload}"` : '')}>
					${mediaBody}
				</video>` :
				`<audio id="${props.id}" width="${props.width}" controls>
					${mediaBody}
				</audio>`
		;

		return (<div dangerouslySetInnerHTML={{__html: mediaHtml}}></div>);

	}

	componentDidMount() {
		const {MediaElementPlayer} = global;		
		if (!MediaElementPlayer) {
			return;
		}
		const options = Object.assign({}, JSON.parse(this.props.options), {
			// Read the Notes below for more explanation about how to set up the path for shims
			pluginPath: './static/media/',
			success: (media, node, instance) => this.success(media, node, instance),
			error: (media, node) => this.error(media, node)
		});		
		window.flvjs = flvjs;
		window.Hls = hlsjs;
		//this.setState({player: new MediaElementPlayer(this.props.id, options)});
        /*
            //Setting resume time/play start time.
            this.setState({player: new MediaElementPlayer(this.props.id, options).setCurrentTime(30)});
        */
       
        //Adding Event listeners
        this.setState({player: new MediaElementPlayer(this.props.id, options)}, 
            () => {
                this.state.player.media.addEventListener('timeupdate', this.handlePlayerEvent.bind(this,'timeupdate'));
                this.state.player.media.addEventListener('loadeddata', this.handlePlayerEvent.bind(this,'loadeddata'));
                this.state.player.media.addEventListener('play', this.handlePlayerEvent.bind(this,'play'));
                this.state.player.media.addEventListener('pause', this.handlePlayerEvent.bind(this,'pause'));
                this.state.player.media.addEventListener('ended', this.handlePlayerEvent.bind(this,'ended'));
                this.state.player.media.addEventListener('seeked', this.handlePlayerEvent.bind(this,'seeked'));
                this.state.player.media.addEventListener('volumechange', this.handlePlayerEvent.bind(this,'volumechange'));
                var hlsPlayer = document.getElementById('mediaelementvideopalyer1_native_hls');
                if(hlsPlayer) {
                    hlsPlayer.addEventListener('timeupdate',this.handlePlayerEvent.bind(this,'timeupdate'))
                    hlsPlayer.addEventListener('loadeddata',this.handlePlayerEvent.bind(this,'loadeddata'));
                    hlsPlayer.addEventListener('play',this.handlePlayerEvent.bind(this,'play'));
                    hlsPlayer.addEventListener('pause',this.handlePlayerEvent.bind(this,'pause'));
                    hlsPlayer.addEventListener('ended',this.handlePlayerEvent.bind(this,'ended'));
                    hlsPlayer.addEventListener('seeked',this.handlePlayerEvent.bind(this,'seeked'));
                    hlsPlayer.addEventListener('volumechange', this.handlePlayerEvent.bind(this,'volumechange'));
                }
            }
        );
    }
    
    handleTimeUpdate() {
        console.log("MediaElement --> handleTimeUpdate()... Current time "+this.state.player.media.getCurrentTime());
       /* this.setState(state => ({
            currentTime: this.state.player.media.getCurrentTime()
        }));*/
    }

    handlePlayerEvent(playerState) {
        //console.log("MediaElement --> handlePlayerEvent()... Current time "+this.state.player.media.getCurrentTime());
		let eventData={event: playerState, currenTime: this.state.player.media.getCurrentTime()}
        const { onPlayerEvent = f => f } = this.props;
        onPlayerEvent(eventData);  
	}

	doOnOrientationChange() {
		let orientation = window.screen.orientation;
		//console.log("doOnOrientationChange()..."+orientation);
		try {
			switch(orientation.angle) { 
				case -90:
				case 90:
				//console.log("landscape");
				{
				if(this.state && this.state.player) {
					this.state.player.enterFullScreen();
					}
				}

				break;
				default:
				//console.log("portrait");
				{
					if(this.state && this.state.player) {
						this.state.player.exitFullScreen();
					}
				}
				break;
			}
		}
		catch(err) {
			console.log(err.message);	
		}
	}

	componentWillUnmount() {
		if (this.state.player) {
            try {
                this.state.player.remove();
			    this.setState({player: null});
            }
            catch(err) {
                console.log(err.message);
            }			
		}
	}
}