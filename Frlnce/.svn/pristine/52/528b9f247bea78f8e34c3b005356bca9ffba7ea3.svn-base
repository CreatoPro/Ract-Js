import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default class CommentReply extends Component {
    constructor(props) {
		super(props);
	}
	
	/*componentDidMount() {
        console.log("CommentReply --> componentDidMount...");
    }
    
    shouldComponentUpdate(newProps, newState) {
        console.log("CommentReply --> shouldComponentUpdate...");
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
        //console.log("CommentReply --> render...");
        const comment = this.props.comment;
        //const commentPermission = this.props.commentPermission;
        return (
			<>
            <div key={comment.id} 
                className="list-group-item list-group-item-action flex-column align-items-start p-1 mt-1">
                <div className="d-flex w-100 justify-content-between">
                    <div>
                        <img src={comment.userImagePath} className="ilearn-avatar" alt="Profile" />
                        <h5 className="mb-1 mt-1 float-left">{comment.createdBy}</h5>
                    </div>
                    <div>
                        <small>{comment.createdOn}</small>
                        { this.props.moderatorPermission &&
                            <button className="btn btn-outline-danger ilearn-icon-button" 
                                onClick={() => this.deleteComment(comment.id,'reply')} >
                                <FontAwesomeIcon icon={ faTrashAlt }/> 
                            </button>
                         
                        }
                    </div>
                    
                </div>
                <p className="mb-1"  dangerouslySetInnerHTML={{__html: comment.content}}>                                
                </p>                 
            </div>
			</>
        );
    }

    deleteComment(commentReplyId, type) {
        //console.log("CommentReply --> deleteComment..."+commentReplyId);
        const { onCommentReplyDelete = f => f } = this.props;
        let deleteData={commentId: commentReplyId, type: type}
        onCommentReplyDelete(deleteData);    
    }

}