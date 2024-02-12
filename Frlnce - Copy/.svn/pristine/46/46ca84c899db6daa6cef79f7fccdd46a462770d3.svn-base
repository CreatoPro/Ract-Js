import React, { Component } from "react";

class Vdocipher extends Component { 

	constructor(props) {
        super(props);        
    }
    
    componentDidMount() {
        var video = new window.VdoPlayer({
            otp: "20160313versASE323bAJBVwkHZadw1VbLVIVSFAVD4skYOkEzRkHu7RMwx7WQDP",
            playbackInfo: btoa(JSON.stringify({
              videoId: "45830519a97e346e0f01d46f8bbcc54c"
            })),
            theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
            // the container can be any DOM element on website
            container: document.querySelector( "#embedBox" ),
          });
          
          // you can directly call any methods of VdoPlayer class from here. e.g:
          // video.addEventListener(`load`, () => {
          //   video.play(); // this will auto-start the video
          //   console.log('loaded');
          // });
    }
    
    render() {
        return ( 
            <div id="embedBox" style={{height: '360px',width:'640px',maxWidth:'100%'}}></div>              
        );
    }
}

  
export default Vdocipher;