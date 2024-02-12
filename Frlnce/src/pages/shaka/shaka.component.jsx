import React from "react";
import ShakaPlayer from "shaka-player-react";
import muxjs from "mux.js";
import "shaka-player/dist/controls.css";
import "./shaka.styles.css";
import { ReactComponent as Angle } from "./images/angle-up-solid.svg";
import { ReactComponent as DownloadButton } from "./images/download-solid.svg";
import { ReactComponent as DeleteIcon } from "./images/trash-solid.svg";
const shaka = require("shaka-player/dist/shaka-player.ui.js");
// console.log(shaka.offline); //<---use for offline purpose

class MyShakaPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      video: null,
      src: null,
      description: false,
      content: [],
      videoId: null,
      offlineAvail: false,
      isDownloading: false,
    };
    window.muxjs = muxjs;
    this.shakaRef = React.createRef();
    this.progressBar = React.createRef();
  }

  componentDidMount() {
    window.getShakaInst = () => this.shakRef.current;
    this.setState(
      {
        video: this.props.location.state.selectedVideo,
        src: this.props.location.state.selectedVideo.url,
        videoId: this.props.location.state.selectedVideo.id,
      },
      () => {
        let video = shaka.videoElement;
        let player = new shaka.Player(video);
        window.player = player;
        this.initStorage(player);
        this.showPlayer();
      }
    );
  }

  selectTracks = (tracks) => {
    // This example stores the highest bandwidth variant.
    //
    // Note that this is just an example of an arbitrary algorithm, and not a best
    // practice for storing content offline.  Decide what your app needs, or keep
    // the default (user-pref-matching audio, best SD video, all text).
    const found = tracks
      .filter(function (track) {
        return track.type == "variant";
      })
      .sort(function (a, b) {
        return a.bandwidth - b.bandwidth;
      })
      .pop();
    console.log("Offline Track bandwidth: " + found.bandwidth);
    return [found];
  };

  initStorage = (player) => {
    window.storage = new shaka.offline.Storage(player);
    window.storage.configure({
      offline: {
        progressCallback: this.setDownloadProgress,
        trackSelectionCallback: this.selectTracks,
      },
    });
  };

  setDownloadProgress = (content, progress) => {
    const progressBar = this.progressBar.current;
    progressBar.value = progress * progressBar.max;
  };

  listContent = async () => {
    let content = await window.storage.list();
    console.log(content);
    this.setState(
      {
        content: content,
      },
      () => {
        this.playContent();
      }
    );
    return content;
  };

  playContent = () => {
    let offlineSRC;
    this.state.content.forEach((content) => {
      if (content.appMetadata.videoId === this.state.videoId) {
        offlineSRC = content.offlineUri;
      }
    });
    if (offlineSRC) {
      this.setState({ src: offlineSRC, offlineAvail: true });
    }
    // window.player.load(content.offlineUri);
  };

  removeContent = () => {
    let offlineSRC;
    this.state.content.forEach((content) => {
      if (content.appMetadata.videoId === this.state.videoId) {
        offlineSRC = content.offlineUri;
      }
    });
    if (offlineSRC) {
      this.setState(
        (prevState) => ({ src: prevState.video.url, offlineAvail: false }),
        () => {
          window.storage.remove(offlineSRC);
        }
      );
    }
  };

  downloadContent = (manifestUri, title, videoId) => {
    const metadata = {
      title: title,
      downloaded: Date(),
      videoId: videoId,
    };
    console.log(metadata);
    console.log(manifestUri);
    return window.storage.store(manifestUri, metadata);
  };

  onDownloadClick = () => {
    let manifestUri = this.state.video.url;
    let title = this.state.video.name;
    let videoId = this.state.videoId;
    this.setState({ isDownloading: true }, () => {
      console.log("1st");
      this.setDownloadProgress(null, 0);
    });
    this.downloadContent(manifestUri, title, videoId)
      .then(() => {
        console.log("downloaded");
        this.setDownloadProgress(null, 1);
        return this.listContent();
      })
      .then((content) => {
        console.log("2");
        console.log(content);
        this.setState({ isDownloading: false });
      })
      .catch((error) => {
        // In the case of an error, re-enable the download button so
        // that the user can try to download another item.
        this.setState({ isDownloading: false });
        console.log(error);
      });
  };

  showPlayer = () => {
    this.setState(
      (prevState) => ({
        show: !prevState.show,
      }),
      () => {
        this.listContent();
      }
    );
  };

  showDescription = () => {
    this.setState((prevState) => ({
      description: !prevState.description,
    }));
  };

  render() {
    return (
      <div className="video-container">
        {this.state.show && (
          <div>
            <ShakaPlayer
              className="shaka-video"
              ref={this.shakaRef}
              autoPlay
              src={this.state.src}
            />
            <div className="video-detail-box">
              <div>
                <h3 className="video-title">{this.state.video.name}</h3>
                <p className="video-date">{this.state.video.creationDate}</p>
              </div>
              <div>
                {this.state.offlineAvail ? (
                  <DeleteIcon
                    onClick={this.removeContent}
                    className="video-icon"
                  />
                ) : (
                  <span>
                    {this.state.isDownloading ? (
                      <progress ref={this.progressBar} value="0" max="100" />
                    ) : (
                      <DownloadButton
                        onClick={this.onDownloadClick}
                        className="video-icon"
                      />
                    )}
                  </span>
                )}
                <Angle
                  onClick={this.showDescription}
                  className={`video-icon ${
                    this.state.description ? "rotate" : null
                  }`}
                />
              </div>
            </div>
            {this.state.description && (
              <div className="video-description-box">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.video.description,
                  }}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MyShakaPlayer;
