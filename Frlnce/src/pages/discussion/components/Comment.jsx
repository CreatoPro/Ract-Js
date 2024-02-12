import React, { Component } from "react";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faReply, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CommentReply from './CommentReply';
import ConfirmDialog from './../../../_components/ConfirmDialog';

export default class Comment extends Component {
    constructor(props) {
		super(props);
		this.state = {
            showReplies: false,
            confirmDialog: { show:false, 
                            title:'Confirm', 
                            message:'Are you sure you want to Delete?', 
                            cancelButtonLabel:'No', 
                            okButtonLabel: 'Yes'
                            },
            commentDeletionData: null
		}
	}
	
	/*componentDidMount() {
        console.log("Comment --> componentDidMount...");
    }
    
    shouldComponentUpdate(newProps, newState) {
        console.log("Comment --> shouldComponentUpdate...");
        return newState.showReplies != this.state.showReplies
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data.show !== this.props.data.show) {
          this.setState({
            data: newProps.data
          });
        }
    }*/

    render() {
        //console.log("Comment --> render...");
        const comment = this.props.comment;
        return (
			<>
            <div key={comment.id} className="list-group-item list-group-item-action flex-column align-items-start p-2">
                <div className="d-flex w-100 justify-content-between">
                    <div>
                        <img src={comment.userImagePath} className="ilearn-avatar" alt="Profile" />
                        <h5 className="mb-1 mt-2 float-left">{comment.createdBy}</h5>
                    </div>
                    <div>
                        <small>{comment.createdOn}</small>
                        { this.props.moderatorPermission &&
                            <button className="btn btn-outline-danger ilearn-icon-button" 
                                onClick={() => this.deleteComment(comment.id,'comment')} >
                                <FontAwesomeIcon icon={ faTrashAlt }/> 
                            </button>
                         
                        }
                    </div>
                    
                </div>
                <p className="mb-1"  dangerouslySetInnerHTML={{__html: comment.content}}>                                
                </p>
                <div className="d-flex w-100 justify-content-between text-primary">
                    { this.props.commentPermission && 
                        <button type="button" className="btn btn-outline-primary" 
                            onClick={() => this.commentReply(comment)} >
                            <FontAwesomeIcon icon={ faReply }/> 
                            &nbsp; Reply
                        </button>
                    }
                    { comment.replies.length>0 && 
                        <button type="button" className="btn btn-outline-success" 
                            onClick={() => this.toggleShowReplies()} 
                            aria-controls="comment-reply-collapse"
                            aria-expanded={this.state.showReplies} 
                        >
                            <FontAwesomeIcon icon={ faCommentDots }/>
                            &nbsp; Replies &nbsp;
                            <span className="badge badge-success badge-pill">{comment.replies.length}</span>
                        </button>
                    }                                    
                </div>
                { 
                    comment.replies.length>0 &&                                 
                    <Collapse in={this.state.showReplies}>
                        <div id="comment-reply-collapse" className="alert alert-success p-1 mt-1">
                        {
                            comment.replies.map((commentReply, rIndex) => {
                                return (
                                    <CommentReply key={`reply_`+rIndex} 
                                    comment={commentReply} 
                                    moderatorPermission={this.props.moderatorPermission} 
                                    onCommentReplyDelete={this.onCommentReplyDelete}/>
                                )
                            })
                        }
                    </div>
                    </Collapse>    
                }                              
            </div>
            <ConfirmDialog data={this.state.confirmDialog} 
                onConfirmDialogClose={this.onConfirmDialogClose} />
			</>
        );
    }    

    toggleShowReplies() {
        //console.log("Comment --> toggleShowReplies...");
        this.setState(state => ({ showReplies: !this.state.showReplies }));
    }

    commentReply(comment) {
        //console.log("Comment --> commentReply..."+comment.id);
        const { onCommentReply = f => f } = this.props;
        onCommentReply(comment);
    }

    deleteComment(commentId, type) {
        //console.log("Comment --> deleteComment..."+commentId);
        let _confirmDialog = this.state.confirmDialog;
        _confirmDialog.show = !_confirmDialog.show;
        this.setState(state => ({
            commentDeletionData : {commentId: commentId, type: type},
            confirmDialog : _confirmDialog
        }));
            
    }

    onConfirmDialogClose = value => {
        //console.log("Comment --> onConfirmDialogClose..."+value);
        let _confirmDialog = this.state.confirmDialog;
        _confirmDialog.show = !_confirmDialog.show;
        this.setState({ confirmDialog: _confirmDialog },
            () => {
                if(value) {
                    const { onCommentDelete = f => f } = this.props;
                    onCommentDelete(this.state.commentDeletionData);
                } 
            }
        );   
    }

    onCommentReplyDelete = data =>  {
        //console.log("Comment --> onCommentReplyDelete..."+JSON.stringify(data));
        let _confirmDialog = this.state.confirmDialog;
        _confirmDialog.show = !_confirmDialog.show;
        this.setState(state => ({
            commentDeletionData : data,
            confirmDialog : _confirmDialog
        }));
    }

}

/*
    References:
    list-group -> https://getbootstrap.com/docs/4.0/components/list-group/
    Collapse -> https://react-bootstrap.github.io/utilities/transitions/
    padding/margin utilities -> https://getbootstrap.com/docs/4.0/utilities/spacing/

*/