import React, { Component } from 'react';
import { ILoader } from '../iloader/iloader';

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      showLoading: true,
    };
  }

  render() {
    return (
      <>
        <iframe title="pdf" class="iframe100" width="100%" 
          onLoad={this.toggleLoading}
          src={this.state.url}></iframe>
          {
            this.renderLoader()
          }
      </>
    );
  }

  toggleLoading = () => {
    //console.log("FeedbackForm -> toggleLoading()... ");
    this.setState(state => ({ showLoading: !state.showLoading }));
  };

  renderLoader() {
    //console.log("FeedbackForm -> renderLoader()... ");
    const _loadingText = 'Please wait...';
    return (
        <ILoader
          loadingText={_loadingText}
          isShow={this.state.showLoading}
        >
        </ILoader>
    )
}
}

export default Iframe