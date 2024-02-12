import React, { Component } from "react";
import { Container, Card, Row, Col, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCommentDots,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import CKEditor from "ckeditor4-react";
import ApiService from "../../_services/ApiService";
import UserService from "../../_services/UserService";
import { ILoader } from "./../../_components/iloader/iloader";
import Comment from "./components/Comment";
import Config from "./../../_config/config";
import Question from "./../test-player/components/Question";
import Resource from "./../learning/components/Resource";
import { ReactComponent as CloseButton } from "./images/xmark-solid.svg";
import { ReactComponent as CameraIcon } from "./images/camera-solid.svg";
import "./discussion-board-topic.styles.css";

class DiscussionBoardTopic extends Component {
  constructor(props) {
    super(props);
    //console.log("DiscussionBoardTopic -> constructor()... ");
    this.state = {
      message: null,
      showLoading: false,
      topic: null,
      open: false,
      showCommentReply: false,
      comment: null,
      commentModalHeader: "Post Comment",
    };
    
  }

  componentDidMount() {
    //console.log("DiscussionBoardTopic -> componentDidMount()... ");
    console.log(this.props.location.state);
    if(this.props.location.state?.prevStates){
      this.setState({...this.props.location.state.prevStates})
    }else{

      this.init();
    }
  }

  init() {
    //console.log("DiscussionBoardTopic -> init()... ");
    if (this.props.match.params.topicId) {
      console.log("DiscussionBoardTopic -> init(); IF.....");
      this.getDiscussionBoardTopic(this.props.match.params.topicId);
    } else if (this.props.match.params.resourceId) {
      console.log("DiscussionBoardTopic -> init(); IF ELSE.....");
      this.getDiscussionBoardResourceTopic(this.props.match.params.resourceId);
    } else {
      console.log("DiscussionBoardTopic -> init(); ELSE.....");
      this.getDiscussionBoardQuestionTopic(this.props.match.params.questionId);
    }
  }

  getDiscussionBoardTopic(topicId) {
    this.setState({ showLoading: true }, () => {
      ApiService.getDiscussionBoardTopic(topicId).then(
        (res) => {
          console.log(
            "DiscussionBoardTopic -> init(); res : " + JSON.stringify(res)
          );
          this.setState({
            showLoading: false,
            topic: res.data,
          });
        },
        (error) => {
          //ErrorCB
          this.setState({
            showLoading: false,
            errorMessage: Config.CONNECTION_ERROR_MSG,
          });
          console.log(
            "DiscussionBoardTopic --> init...error =>" + JSON.stringify(error)
          );
        }
      );
    });
  }

  getDiscussionBoardQuestionTopic(questionId) {
    this.setState({ showLoading: true }, () => {
      ApiService.getDiscussionBoardQuestionTopic(questionId).then(
        (res) => {
          console.log(
            "DiscussionBoardTopic -> init(); res : " + JSON.stringify(res)
          );
          this.setState({
            showLoading: false,
            topic: res.data,
          });
        },
        (error) => {
          //ErrorCB
          this.setState({
            showLoading: false,
            errorMessage: Config.CONNECTION_ERROR_MSG,
          });
          console.log(
            "DiscussionBoardTopic --> init...error =>" + JSON.stringify(error)
          );
        }
      );
    });
  }

  getDiscussionBoardResourceTopic(resourceId) {
    this.setState({ showLoading: true }, () => {
      ApiService.getDiscussionBoardResourceTopic(resourceId).then(
        (res) => {
          console.log(
            "getDiscussionBoardResourceTopic -> init(); res : " +
              JSON.stringify(res)
          );
          this.setState({
            showLoading: false,
            topic: res.data,
          });
        },
        (error) => {
          //ErrorCB
          this.setState({
            showLoading: false,
            errorMessage: Config.CONNECTION_ERROR_MSG,
          });
          console.log(
            "DiscussionBoardTopic --> init...error =>" + JSON.stringify(error)
          );
        }
      );
    });
  }

  render() {
    //console.log("DiscussionBoardTopic -> render()... ");
    return (
      <>
        <Container fluid>
          {this.state.topic && (
            <>
              {this.renderHeader()}
              {this.renderBody()}
              {this.renderFooter()}
            </>
          )}
          {this.renderLoader()}
        </Container>
      </>
    );
  }

  renderHeader() {
    //console.log("DiscussionBoardTopic -> renderHeader()... ");
    let CURRENT_PORTLET = JSON.parse(localStorage["portlet"]);
    return (
      <div className={`ilearn-plain-header ${CURRENT_PORTLET.class}`}>
        <div className="back">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={()=>this.props.history.replace(`/discussionBoard/${this.props.match.params.discussionBoardId}/topics`)}
          />
        </div>
        {
          <h4>
            {this.state.topic.title ? this.state.topic.title : "Question"}
          </h4>
        }
      </div>
    );
  }

  renderBody() {
    //console.log("DiscussionBoardTopic -> renderBody()... ");
    let comments = this.state.topic.comments;
    return (
      <>
        {this.renderTopicContent()}
        <Card>
          <Card.Header className="p-2 clear-fix">
            <span className="badge badge-primary">{comments.length}</span>&nbsp;
            Comments
          </Card.Header>
          <Card.Body className="p-1">
            <div className="list-group">
              {comments.map((comment, index) => {
                return (
                  <Comment
                    comment={comment}
                    commentPermission={this.state.topic.commentPermission}
                    moderatorPermission={this.state.topic.moderatorPermission}
                    onCommentReply={this.onCommentReply}
                    onCommentDelete={this.onCommentDelete}
                  />
                );
              })}
            </div>
          </Card.Body>
        </Card>
        <br />
        <br />
        {this.renderCommentReplyModal()}
      </>
    );
  }

  renderTopicContent() {
    let question = this.state.topic.question
      ? JSON.parse(this.state.topic.question)
      : null;
    let resource = this.props.match.params.resourceId || null;
    let topicContent = this.state.topic.content;
    return (
      <>
        {!question && !resource && (
          <div
            className="alert alert-info mb-0 p-2 rounded-0"
            role="alert"
            dangerouslySetInnerHTML={{ __html: topicContent }}
          ></div>
        )}
        {question && (
          <div class="alert alert-info mb-0 p-1 rounded-0" role="alert">
            <Card>
              <Card.Body className="p-1">
                <Question question={question} />
              </Card.Body>
            </Card>
          </div>
        )}
        {resource && (
          <div class="alert alert-info mb-0 p-1 rounded-0" role="alert">
            <Card>
              <Card.Body className="p-1">
                <Resource
                  data={this.props.location.state.resource}
                  stepId={this.props.location.state.stepId}
                />
              </Card.Body>
            </Card>
          </div>
        )}
      </>
    );
  }

  renderFooter() {
    //console.log("DiscussionBoardTopic -> renderFooter()... ");
    return (
      <>
        {this.state.topic && this.state.topic.commentPermission && (
          <div className="ilearn-footer">
            <Row>
              <Col
                className="ilearn-footer-col ilearn-blue-btn"
                onClick={() => this.addComment()}
              >
                <button className="btn ilearn-blue-btn ilearn-footer-btn btn-block text-uppercase">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    size="lg"
                    color="#fff"
                  />{" "}
                  &nbsp;
                  <b style={{ color: "#fff" }}>Leave a comment</b>
                </button>
              </Col>
            </Row>
          </div>
        )}
      </>
    );
  }

  renderLoader() {
    //console.log("DiscussionBoardTopic -> renderLoader()... ");
    const _loadingText = "Please wait...";
    return (
      <ILoader
        loadingText={_loadingText}
        isShow={this.state.showLoading}
      ></ILoader>
    );
  }

  customModelclicked = (e) => {
    if (e.target.className === "custom-modal-outer") {
      this.handleClose();
    }
  };

  openCamera = () => {
    this.props.history.push({
      pathname: "/camera",
      state: { prevStates: this.state, pathParams: this.props.match.params },
    });
  };

  renderCommentReplyModal() {
    //console.log("DiscussionBoardTopic -> renderCommentReplyModal()... ");
    let CURRENT_PORTLET = JSON.parse(localStorage["portlet"]);
    return (
      <div
        className="custom-modal-outer"
        style={{ display: this.state.showCommentReply ? "flex" : "none" }}
        onClick={this.customModelclicked}
      >
        <div className="custom-modal">
          <div
            className={`ilearn-plain-header text-white ${CURRENT_PORTLET.class} custom-modal-header`}
          >
            <h3>{this.state.commentModalHeader} </h3>
            <div className="cusom-modal-icons">
              <CameraIcon
                onClick={this.openCamera}
                className="custom-modal-icon-button"
              />
              <CloseButton
                onClick={this.handleClose}
                className="custom-modal-icon-button"
              />
            </div>
          </div>
          <div className="custom-modal-body">
            <Form>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <CKEditor
                 config={{
                  filebrowserBrowseUrl: `${Config.siteUrl}${Config.siteTitle}/FCKeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=connectors/jsp/connector`,
                  // filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
                }
              }
                  name="message"
                  placeholder="Compose message"
                  data={this.state.message}
                  onChange={this.updateEditor}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="custom-modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger custom-modal-button"
              onClick={() => this.handleClose()}
            >
              <FontAwesomeIcon icon={faTimes} />
              &nbsp; Cancel
            </button>
            <button
              type="button"
              className="btn btn-outline-primary custom-modal-button"
              onClick={() => this.postComment()}
            >
              Post &nbsp;
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
      <script src="/ckfinder/ckfinder.js"></script>
          </div>
        </div>
      </div>
    );
  }

  updateEditor = (e) => {
    console.log("here");
    const v = e.editor.getData();
    // const k = "message";
    // let message = { ...this.state.message };
    let message = v;
    this.setState({ message: message }, () => {
      console.log(this.state.message);
    });
    //console.log(this.state)
  };

  postComment() {
    //console.log("DiscussionBoardTopic --> postComment..."+this.state.message);
    let message = this.state.message;
    let comment = this.state.comment;
    if (message && message.trim().length > 0) {
      if (comment) {
        //Comment Reply
        //console.log("DiscussionBoardTopic --> commentReply...");
        comment.replyContent = message;
        comment.replyUserId = UserService.getUserId();
        this.replyComment(comment);
      } else {
        //create comment
        //console.log("DiscussionBoardTopic --> createComment ...");
        let commentJSON = {
          topicId: this.state.topic.id,
          comment: message,
          userId: UserService.getUserId(),
        };
        this.createComment(commentJSON);
      }
    }
  }

  replyComment(comment) {
    //console.log("DiscussionBoardTopic --> replyComment..."+JSON.stringify(comment));
    this.setState(
      {
        showLoading: true,
        commentModalHeader: "Reply to Comment",
        showCommentReply: !this.state.showCommentReply,
      },
      () => {
        ApiService.replyComment(comment).then(
          (res) => {
            //console.log("DiscussionBoardTopic -> replyComment(); res : "+JSON.stringify(res))
            this.setState(
              {
                showLoading: false,
                message: null,
                comment: null,
              },
              () => {
                this.init();
              }
            );
          },
          (error) => {
            //ErrorCB
            this.setState({
              showLoading: false,
              showCommentReply: !this.state.showCommentReply,
              errorMessage: Config.CONNECTION_ERROR_MSG,
            });
            console.log(
              "DiscussionBoardTopic --> replyComment...error =>" +
                JSON.stringify(error)
            );
          }
        );
      }
    );
  }

  createComment(comment) {
    //console.log("DiscussionBoardTopic --> createComment..."+JSON.stringify(comment));
    this.setState(
      {
        showLoading: true,
        commentModalHeader: "Leave a Comment",
        showCommentReply: !this.state.showCommentReply,
      },
      () => {
        ApiService.createComment(comment).then(
          (res) => {
            //console.log("DiscussionBoardTopic -> createComment(); res : "+JSON.stringify(res))
            this.setState(
              {
                showLoading: false,
                message: null,
                comment: null,
              },
              () => {
                this.init();
              }
            );
          },
          (error) => {
            //ErrorCB
            this.setState({
              showLoading: false,
              showCommentReply: !this.state.showCommentReply,
              errorMessage: Config.CONNECTION_ERROR_MSG,
            });
            console.log(
              "DiscussionBoardTopic --> createComment...error =>" +
                JSON.stringify(error)
            );
          }
        );
      }
    );
  }

  addComment() {
    //console.log("DiscussionBoardTopic --> addComment...");
    this.setState((state) => ({
      showCommentReply: !this.state.showCommentReply,
      comment: null,
      message: null,
    }));
  }

  onCommentDelete = (data) => {
    console.log(
      "DiscussionBoardTopic --> onCommentDelete..." + JSON.stringify(data)
    );
    let _data = {
      id: data.commentId,
      type: data.type,
    };

    this.setState({ showLoading: true }, () => {
      ApiService.deleteCommentOrReply(_data).then(
        (res) => {
          //console.log("DiscussionBoardTopic -> deleteCommentOrReply(); res : "+JSON.stringify(res))
          this.setState(
            {
              showLoading: false,
              message: null,
              comment: null,
            },
            () => {
              this.init();
            }
          );
        },
        (error) => {
          //ErrorCB
          this.setState({
            showLoading: false,
            errorMessage: Config.CONNECTION_ERROR_MSG,
          });
          console.log(
            "DiscussionBoardTopic --> deleteCommentOrReply...error =>" +
              JSON.stringify(error)
          );
        }
      );
    });
  };

  onCommentReply = (comment) => {
    //console.log("DiscussionBoardTopic --> onCommentReply..."+comment.id);
    this.setState((state) => ({
      showCommentReply: !this.state.showCommentReply,
      comment: comment,
      message: null,
    }));
  };

  closeCommentReply() {
    this.setState((state) => ({
      showCommentReply: !this.state.showCommentReply,
      comment: null,
      message: null,
    }));
  }

  handleClose = () => this.closeCommentReply();

  toggleView(view) {
    this.setState((state) => ({ view: view }));
  }

  toggleLoading = () => {
    //console.log("DiscussionBoardTopicList -> toggleLoading()... ");
    this.setState((state) => ({ showLoading: !state.showLoading }));
  };
}

export { DiscussionBoardTopic };

/*
    References:
    Card -> https://getbootstrap.com/docs/4.0/components/card/

*/
