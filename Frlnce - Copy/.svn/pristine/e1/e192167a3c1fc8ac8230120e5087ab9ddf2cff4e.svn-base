import React, { Component } from "react";
import discussion_icon from "./images/discussion.png";
import { Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import Utils from "../../_helpers/utils";

class DiscussionBoardTopicList extends Component { 

	constructor(props) {
        super(props);
        //console.log("DiscussionBoardTopicList -> constructor()... ");
        this.state = {
            message: null,
            showLoading: false,
            discussionBoard: null
        };
    }
    
    componentDidMount() {
        //console.log("DiscussionBoardTopicList -> componentDidMount()... ");
        this.init();
    }
    
    init() {
        //console.log("DiscussionBoardTopicList -> init()... ");
        this.setState({ showLoading: true }, () => {
            ApiService.getDiscussionBoardTopics(this.props.match.params.id)
            .then((res) => {
              //console.log("DiscussionBoardTopicList -> init(); res : "+JSON.stringify(res))
              this.setState({
                showLoading: false,
                discussionBoard : res.data
              });
            });
        });
    }
    
    render() {
        //console.log("DiscussionBoardTopicList -> render()... ");        
        return (  
            <>
                <div className="Message">
                    <Container fluid >
                        {this.renderHeader()}
                        {this.renderBody()}
                        {this.renderLoader()}                    
                    </Container>
                </div>
            </>           
              
        );
    }

    renderHeader() {
        //console.log("DiscussionBoardTopicList -> renderHeader()... ");
        let CURRENT_PORTLET = JSON.parse(localStorage['portlet']);
        return (
            <div className="module-header">
                <div className={`module-header-inner ${CURRENT_PORTLET.class}`} >
                    <div className="back">
                        <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                    </div>
                    <img src={discussion_icon} alt="discussion icon" /> 
                </div>
                <div className="arrow-set">
                    {
                        this.state.discussionBoard &&       
                        <h4>{this.state.discussionBoard.name}</h4>  
                    }                         
                </div>
            </div>
        )
    }

    renderBody() {
        //console.log("DiscussionBoardTopicList -> renderBody()... ");
        let discussionBoard = this.state.discussionBoard;
        let isMobile = Utils.isMobileDevice();
        return  (
            <>
            {
                discussionBoard && 
                <>
                {
                    isMobile===true? this.renderMobileView(discussionBoard) : 
                    this.renderDesktopView(discussionBoard)
                }
                </>
            }
            </>
        );
    }
    
    renderMobileView(discussionBoard) {
        return  (
            <>
            <div className="ilearn-padding-top"> 
                {
                    discussionBoard.blogPostBeans.map((topic, index) => {
                        return ( 
                            <div key={index} className="ilearn-padding-both-sides ilearn-padding-top">
                                <Card onClick={() => this.viewTopic(topic)}>
                                <Card.Body>
                                    <div className="ilearn-item-block">
                                        <h4 className="ilearn-item-inner pt-2">{topic.title}</h4>
                                        <p ></p>
                                        <FontAwesomeIcon icon={ faChevronRight }  size = 'lg' color="gray" className="float-right"/>
                                    </div>
                                </Card.Body>
                                </Card>
                            </div>
                        );
                    })
                }
            </div>
            { this.renderAddTopic(discussionBoard) }
            </>
        );
    }

    renderDesktopView(discussionBoard) {
        return ( 
            <>
            <Card>
                <Card.Body className="p-0">
                <div className="list-group-item bg-info list-group-item-action p-3 bg-info border-info active">
                <div className="row font-weight-bold">
                    <div className="col col-1">#</div>
                    <div className="col col-3">Name</div>
                    <div className="col col-6">Description</div>
                    <div className="col col-2">Posted on</div>
                </div>
                </div>
                {
                discussionBoard.blogPostBeans.map((topic, index) => {
                    var description = 'NA';
                    if(topic.content){
                        description = topic.content.replace(/<(.|\n)*?>/g, '');
                        description = description.replace(/&nbsp;/g, '');
                        description = description.replace(/&#39;/g, "'");
                    }
                    //var description = Parser(item.description);
                    return (
                        <div className="list-group-item list-group-item-action p-3"> 
                        <div className="row " key={index} onClick={() => this.viewTopic(topic)}>
                            <div className="col col-1"><b>{index+1}</b></div>
                            <div className="col col-3">{topic.title}</div>
                            <div className="col col-6"> <div dangerouslySetInnerHTML={{ __html:description}} /> </div>
                            <div className="col col-2">{topic.postedon}</div>
                        </div>
                        </div>
                    )
                })
                }
                </Card.Body>
            </Card>
            { this.renderAddTopic(discussionBoard) }
            </>
        );
    }

    renderAddTopic(discussionBoard) {
        return (
            <>
            {
                discussionBoard.acceptStudentPosts===true && 
                <button type="button" className="btn btn-fab btn-success" data-placement="left" title="Add Topic" onClick={() => this.addTopic()}> 
                    <FontAwesomeIcon icon={ faPlus }  size = '2x' color="white" className="float-right"/>
                </button>
            }
            </>
        );
    }

    addTopic() {
        let path = '/discussionBoard/'+this.props.match.params.id+'/topic/create'
        this.props.history.push({
            pathname: path,
            state: { discussionBoardId: this.state.discussionBoard.id }});   
    }
    
    viewTopic(topic) {
        //console.log("DiscussionBoardTopicList -> viewTopic()... ");
        this.props.history.push('/discussionBoard/'+this.props.match.params.id+'/topic/'+topic.id+'/comments');
    }
    
    renderLoader() {
        //console.log("DiscussionBoardTopicList -> renderLoader()... ");
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.showLoading}
                >
            </ILoader>
        )
    }

    toggleView(view) {
        this.setState(state => ({ view: view }));    
    }

    toggleLoading = () => {
        //console.log("DiscussionBoardTopicList -> toggleLoading()... ");
        this.setState(state => ({ showLoading: !state.showLoading }));
    };

}

  
export {DiscussionBoardTopicList};