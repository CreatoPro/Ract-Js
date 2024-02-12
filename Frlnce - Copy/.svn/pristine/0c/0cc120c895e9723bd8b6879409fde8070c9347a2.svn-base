import React from "react";
import "./camera.styles.css";
import { ReactComponent as CaptureIcon } from "./images/circle-solid.svg";
import { ReactComponent as CloseCameraIcon } from "./images/video-slash-solid.svg";
import { ReactComponent as OpenCameraIcon } from "./images/video-solid.svg";
import { ReactComponent as ChangeCameraIcon } from "./images/rotate-solid.svg";
import { ReactComponent as ShowImageIcon } from "./images/images-solid.svg";
import { ReactComponent as CheckIcon } from "./images/check-solid.svg";
import ImagePreview from "../../_components/image-preview/image-preview.component";

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: false,
      cameraIsOn: false,
      currentImage: null,
      capturedImages: [],
      displayCaptureImage: false,
      displayImagePreview: false,
    };
    this.cameraRef = React.createRef();
    this.cameraStream = null;
    this.canvas = React.createRef();
    console.log(this.props.location.state);
  }
  componentDidMount() {
    this.clearCanvas();
    this.startstream();
  }

  componentWillUnmount() {
    this.stopstream();
  }
  changeCamera = () => {
    if (this.cameraStream) {
      let currentCameraValue = this.state.front;
      this.setState({ front: !currentCameraValue }, () => {
        this.stopstream();
        this.startstream();
      });
    }
  };

  startstream = () => {
    var mediaSupport = "mediaDevices" in navigator;
    if (mediaSupport && null == this.cameraStream) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: this.state.front ? "user" : "environment" },
        })
        .then((mediaStream) => {
          this.cameraStream = mediaStream;
          this.cameraRef.current.srcObject = mediaStream;
          this.cameraRef.current.play();
          this.setState({ cameraIsOn: true });
        })
        .catch(function (err) {
          console.log("Unable to access camera: " + err);
        });
    } else {
      alert("Your browser does not support media devices.");
      return;
    }
  };

  stopstream = () => {
    if (null != this.cameraStream) {
      this.setState({ cameraIsOn: false });

      this.cameraStream.getTracks().forEach((track) => {
        track.stop();
      });
      this.cameraStream = null;
    }
  };

  capture = () => {
    if (null != this.cameraStream) {
      this.setState({ displayCaptureImage: true }, () => {
        console.log(this.cameraRef.current?.clientHeight);

        this.canvas.current.width = this.cameraRef.current.clientWidth;
        this.canvas.current.height = this.cameraRef.current.clientHeight;
        let ctx = this.canvas.current?.getContext("2d");
        ctx?.drawImage(
          this.cameraRef.current,
          0,
          0,
          this.canvas.current.clientWidth,
          this.canvas.current.clientHeight
        );
        this.setState(
          { currentImage: this.canvas.current?.toDataURL("image/png") },
          () => {
            console.log(this.state.currentImage);
            this.clearCanvas();
          }
        );
      });
    }
  };

  cancelImage = () => {
    this.setState({ displayCaptureImage: false, currentImage: null });
  };

  selectImage = () => {
    this.setState(
      (preState) => ({
        capturedImages: [...preState.capturedImages, preState.currentImage],
      }),
      () => {
        this.setState({ displayCaptureImage: false, currentImage: null });
      }
    );
  };

  clearCanvas = () => {
    this.canvas.current.style.display = "block";
    let ctx = this.canvas.current?.getContext("2d");
    ctx?.clearRect(
      0,
      0,
      this.canvas.current.clientWidth,
      this.canvas.current.clientHeight
    );
    this.canvas.current.width = 0;
    this.canvas.current.height = 0;
  };

  continueAttendance = () => {
    console.log(this.props.location.state);
    let prevStates = this.props.location.state.prevStates;
    let pathParams = this.props.location.state.pathParams;
    let photoString = "";
    this.state.capturedImages.map(
      (image, index) =>
        (photoString = photoString + `<p><img src=${image} alt=${index}/></p>`)
    );

    if (prevStates.message) {
      prevStates.message = prevStates.message + photoString;
      console.log(prevStates.message);
    } else {
      prevStates.message = photoString;
      console.log(prevStates.message);
    }

    this.props.history.push({
      pathname: `/discussionBoard/${pathParams.discussionBoardId}/topic/${pathParams.topicId}/comments`,
      state: { prevStates: prevStates },
    });
  };

  deleteCapturedImage = (id) => {
    let holdingArray = this.state.capturedImages;
    holdingArray.splice(id, 1);
    this.setState({ capturedImages: [...holdingArray] });
  };

  openImagePreview = () => {
    this.setState({ displayImagePreview: true });
  };

  closeImagePreview = () => {
    this.setState({ displayImagePreview: false });
  };

  render() {
    return (
      <div className="play-area">
        <div className="play-area-sub">
          <p className="loading-camera">loading camera....</p>
          <div className="nav-bar">
            <CheckIcon
              className="nav-bar-icon"
              onClick={this.continueAttendance}
            />
            <div>
              <ShowImageIcon
                className="nav-bar-icon"
                onClick={this.openImagePreview}
              />
              <div
                className="image-capture-detail"
                onClick={this.openImagePreview}
              >
                <p>{this.state.capturedImages.length}</p>
              </div>
            </div>
          </div>
          <video ref={this.cameraRef} id="stream" autoPlay></video>
          <div className="button-group">
            {this.state.cameraIsOn ? (
              <CloseCameraIcon
                className="camera-icon small-camera-icon"
                onClick={this.stopstream}
              />
            ) : (
              <OpenCameraIcon
                className="camera-icon small-camera-icon"
                onClick={this.startstream}
              />
            )}
            <CaptureIcon className="camera-icon" onClick={this.capture} />
            <ChangeCameraIcon
              className="camera-icon small-camera-icon"
              onClick={this.changeCamera}
            />
          </div>
        </div>
        <canvas ref={this.canvas} id="capture"></canvas>
        {this.state.displayCaptureImage ? (
          <div className="capture-area">
            <img
              className="display-image"
              src={this.state.currentImage}
              alt="imagecaptured"
            />
            <p className="popup-text">Do You want to save this Picture?</p>
            <div>
              <button
                className="btn btn-success m-2"
                onClick={this.selectImage}
              >
                yes
              </button>
              <button className="btn btn-danger m-2" onClick={this.cancelImage}>
                no
              </button>
            </div>
          </div>
        ) : null}
        {this.state.displayImagePreview ? (
          <ImagePreview
            deleteCapturedImage={this.deleteCapturedImage}
            capturedImages={this.state.capturedImages}
            closeImagePreview={this.closeImagePreview}
          />
        ) : null}
      </div>
    );
  }
}

export default Camera;
