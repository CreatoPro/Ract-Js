import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'

export default class Model extends Component{
    constructor(props) {
        super(props);
    }
    
    modeShow(show){
        this.props.modeShow(show);
    }

    finishTest(){
        this.props.EndExam(1);
    }
	
    render(){

        return(
            <div >
                <Modal className="submiteTestModel" show={this.props.show}  animation={true} >
                <Modal.Header className="bg-danger text-white text-center py-1">
                    <Modal.Title className="text-center">
                    <h5>Confirm ?</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-0 border">
                <p>Are you sure you want to <br/>finish the Test ?</p>   
                </Modal.Body>
                    <Modal.Footer className="py-1 d-flex justify-content-center">
                    <div>
                        <button variant="outline-danger" className="mx-2 px-3 btn btn-success" onClick={() => this.finishTest()}>Submit</button>
                    </div>
                    <div>
                        <button variant="outline-dark" className="btn btn-danger" onClick={() => this.modeShow(false)}>Cancel</button>
                    </div>
                    
                    </Modal.Footer>
                </Modal>
            </div>
		);
    }
}