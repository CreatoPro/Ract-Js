import React, { Component } from 'react';

class Proctored extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: props.tenant,
      testId : props.testId,
      userId : props.userId,
      bucketName : props.bucketName,
    };
  }

  render() {
    let tenant = this.state.tenant;
    let testId = this.state.testId;
    let userId = this.state.userId;
    let bucketName = this.state.bucketName;
    let url = "https://proctoring-webcam.edusquares.com/index.html?tenant="+tenant+"&testId="+testId+"&userId="+userId+"&bucketName="+bucketName+"&version=13";
    //return (<iframe title="pdf" class="iframe100" width="100%" src={this.state.url}></iframe>);
    return (<iframe src={url} allow="camera *;microphone *"  frameborder="0" class="proctoring"></iframe>);
  }
}

export default Proctored