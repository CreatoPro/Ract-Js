import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import { Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import UserService from "../../../_services/UserService";
import Loader from './../../../_components/loader/loader';
import ApiService from "../../../_services/ApiService";

export default class Model extends Component{

    constructor(props) {
        super(props);
        this.state = {
            message: null,
            loading: false,
        };
        this.timeout =  0;
        this.reloadNotes = this.reloadNotes.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.show !== prevProps.show) {
            this.setState({
                message : null
            });
            this.props.show && this.reloadNotes()
        }
    }
    
    modeShow(show){
        this.props.modeShow(show);
    }

    updateEditor = (e) => {
        const v = e.editor.getData();
        const k = "message";
        let message = {...this.state.message}
        message = v;
        this.setState({message: message});
    }

    reloadNotes() {
        this.setState({ loading: true }, () => {
          ApiService.loadStudyResourcesNotes(this.props.resourceId, this.props.type)
          .then((res) => {
              console.log(res.data);
              if(this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.setState({
                        loading: false,
                        message : res.data.note
                    }); 
              }, 100);
          });
        });	
    }

    postNotes() {
        let message = this.state.message;
        if(message && message.trim().length>0) {
            let commentJSON={
                resourceId : this.props.resourceId,
                note	: message,
                userId  : UserService.getUserId()
            }

            this.setState({ loading: true }, () => {
                ApiService.saveStudyResourcesNotes(commentJSON, this.props.type)
                .then((res) => {
                    this.setState({
                      loading: false,
                      data: res.data,
                    });
                    this.props.modeShow(false);
                });
            });	
                
        }  
    }


    render(){
        let CURRENT_PORTLET = JSON.parse(localStorage['portlet']);
        const { loading } = this.state;
        return (
            <>
            <Modal show={this.props.show} size="lg">
            <Modal.Header className={`ilearn-plain-header text-white ${CURRENT_PORTLET.class}`}>
            <Modal.Title> {this.props.title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>                
                <Form>                    
                    <Form.Group controlId="message">
                        <Form.Label></Form.Label>
                        <CKEditor
                            name="message"
                            placeholder="Compose message"
                            data={this.state.message}
                            onChange={this.updateEditor}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
               <button type="button" className="btn btn-outline-danger" 
                    onClick={() => this.modeShow(false)}
                >
                    <FontAwesomeIcon icon={ faTimes }/>
                    &nbsp; Cancel 
                </button>
                <button type="button" className="btn btn-outline-primary" 
                    onClick={() => this.postNotes(false)}
                >
                    Save &nbsp;
                    <FontAwesomeIcon icon={ faPaperPlane }/>
                </button>
            </Modal.Footer>
            </Modal>
            {loading ?  <Loader />: ''}
            </>
        );
    }
}