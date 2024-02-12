import React, { Component } from 'react'
import './discussion.css'
import discussion_icon from './images/discussion.png'
import { Container, Card, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import tile from './images/tile.svg'
import list from './images/list.svg'
import ApiService from '../../_services/ApiService'
import { ILoader } from './../../_components/iloader/iloader'
import Config from './../../_config/config'
import Utils from '../../_helpers/utils'

class DiscussionBoard extends Component {
  constructor(props) {
    super(props)
    //console.log("DiscussionBoard -> constructor()... ");
    this.state = {
      message: null,
      showLoading: false,
      portlet: this.props.location.state.portlet,
      discussionBoards: [],
      view: 'grid',
      disclaimer: {},
      showModal: false,
    }
  }

  componentDidMount() {
    //console.log("DiscussionBoard -> componentDidMount()... ");
    this.init()
  }

  init() {
    //console.log("DiscussionBoard -> init()... ");
    Config.CURRENT_PORTLET = this.state.portlet
    this.setState({ showLoading: true }, () => {
      ApiService.getDiscussionBoards().then((res) => {
        //console.log("DiscussionBoard -> init(); res : "+JSON.stringify(res));
        let view = Utils.isMobileDevice() === true ? 'grid' : 'list'
        console.log(res)
        this.setState({
          showLoading: false,
          discussionBoards: res.data.discussionBoardBeans,
          view: view,
          disclaimer: res.data.disclaimer,
          showModal: res.data.disclaimer.enabled,
        })
      })
    })
  }

  render() {
    //console.log("DiscussionBoard -> render()... ");
    return (
      <>
        <div className='Learning'>
          <Container fluid>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderLoader()}
          </Container>
        </div>
        {this.viewDisclaimer()}
      </>
    )
  }

  renderHeader() {
    //console.log("DiscussionBoard -> renderHeader()... ");
    let isMobile = Utils.isMobileDevice()
    return (
      <div className='module-header'>
        <div
          className={`module-header-inner ${this.props.location.state.portlet.class}`}
        >
          <div className='back'>
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={this.props.history.goBack}
            />
          </div>
          <img src={discussion_icon} alt='discussion icon' />
        </div>
        <div className='arrow-set'>
          {isMobile === true ? (
            <div className='row'>
              <div className='col-10'>
                <h3>{this.state.portlet.name}</h3>
              </div>
              <div className='col-2'>
                {this.state.view === 'list' ? (
                  <img
                    alt='list'
                    src={tile}
                    className='border'
                    onClick={() => this.toggleView('grid')}
                  />
                ) : (
                  <img
                    alt='grid'
                    src={list}
                    className='border'
                    onClick={() => this.toggleView('list')}
                  />
                )}
              </div>
            </div>
          ) : (
            <h4>{this.state.portlet.name}</h4>
          )}
        </div>
      </div>
    )
  }

  renderBody() {
    //console.log("DiscussionBoard -> renderBody()... ");
    return (
      <>
        <div className='ilearn-padding-top'>
          {this.state.view === 'list' ? this.renderList() : this.renderGrid()}
        </div>
      </>
    )
  }

  renderList() {
    return (
      <div className='card_list'>
        {this.state.discussionBoards.map((discussionBoard, index) => {
          if (!discussionBoard.icon) {
            discussionBoard.icon = discussion_icon
          }
          return (
            <Card
              key={index}
              onClick={() => this.showDiscussionBoardTopics(discussionBoard.id)}
            >
              <Card.Body>
                <div className='cardbody align-center'>
                  <img src={discussionBoard.icon} alt={discussionBoard.name} />
                  <h4 className='head'>{discussionBoard.name}</h4>
                </div>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    )
  }

  renderGrid() {
    return (
      <div className='mobile_course_list'>
        {this.state.discussionBoards.map((discussionBoard, index) => {
          if (!discussionBoard.icon) {
            discussionBoard.icon = discussion_icon
          }
          return (
            <div
              key={index}
              onClick={() => this.showDiscussionBoardTopics(discussionBoard.id)}
            >
              <div className='row'>
                <div className='col-12'>
                  <div className='course_box'>
                    <div className='card'>
                      <img
                        alt={discussionBoard.name}
                        src={discussionBoard.icon}
                        className='resposive-image'
                      />
                      <div className='head'>
                        <p className='title'>
                          <strong>{discussionBoard.name}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  handleClose = (value) => {
    console.log(value)
    this.setState({ showModal: value })
  }

  renderLoader() {
    //console.log("DiscussionBoard -> renderLoader()... ");
    const _loadingText = 'Please wait...'
    return (
      <ILoader
        loadingText={_loadingText}
        isShow={this.state.showLoading}
      ></ILoader>
    )
  }

  showDiscussionBoardTopics(discussionBoardId) {
    this.props.history.push('/discussionBoard/' + discussionBoardId + '/topics')
  }

  toggleView(view) {
    this.setState((state) => ({ view: view }))
  }

  viewDisclaimer() {
    return (
      <>
        <Modal show={this.state.showModal} size='lg'>
          <Modal.Header closeButton onClick={() => this.handleClose(false)}>
            <Modal.Title>{this.state.disclaimer.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimer.text }}
            ></div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={() => this.handleClose(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
              &nbsp; Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export { DiscussionBoard }
