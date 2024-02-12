import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ConfirmDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
		}
	}
	
	/*componentDidMount() {
        console.log("Comment --> componentDidMount...");
    }*/
    
    /*shouldComponentUpdate(newProps, newState) {
        console.log("ConfirmDialog --> shouldComponentUpdate()...);
        return newState.data.show != this.state.data.show
    }*/

    componentWillReceiveProps(newProps) {
        //console.log("ConfirmDialog --> componentWillReceiveProps()...");
        if (newProps.data.show !== this.props.data.show) {
          this.setState({
            data: newProps.data
          });
        }
    }

    render() {
        //console.log("ConfirmDialog --> render()...");
        let dialog = this.state.data;
        return (
			<>
            <Modal show={dialog.show} onHide={()=> this.handleClose(false)}>
                <Modal.Header className="text-uppercase" closeButton>
                <Modal.Title>{dialog.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{dialog.message}</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" className="text-uppercase" onClick={()=> this.handleClose(false)}>
                    {dialog.cancelButtonLabel}
                </Button>
                <Button variant="success" className="text-uppercase" onClick={()=> this.handleClose(true)}>
                    {dialog.okButtonLabel}
                </Button>
                </Modal.Footer>
            </Modal>
			</>
        );
    }

    handleClose = value =>  {
        //console.log("ConfirmDialog --> handleClose()..."+value);
        const { onConfirmDialogClose = f => f } = this.props;
        onConfirmDialogClose(value);  
    }

}

/*
    References:
    Modal -> https://react-bootstrap.github.io/components/modal/

*/