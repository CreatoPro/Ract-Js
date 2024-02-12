import React from "react";
import { Modal } from "react-bootstrap";
import "./modal-box.styles.css";

const ModalBox = ({
  message,
  header,
  showModal,
  handleSubmit,
  handleClose,
  name,
  value,
  modalType,
  handleChange
}) => (
  <Modal show={showModal} close={"true"} onHide={handleClose}>
    <Modal.Header className="text-uppercase" closeButton>
      <Modal.Title>{header}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        {message ? (
          <label>{message}</label>
        ) : (
          <input
            onChange={handleChange}
            value={value}
            name={name}
            type={modalType === "rejectAttestation" ? "text" : "number"}
          />
        )}
      </form>
    </Modal.Body>
    <Modal.Footer>
      {modalType!=="success"&&<button className="btn btn-danger" onClick={handleClose}>{modalType==="error"?"close":"No"}</button>}
      {modalType!=="error"&&<button className="btn btn-success" onClick={handleSubmit}>{modalType==="success" ? "close" : "Yes"}</button>}
    </Modal.Footer>
  </Modal>
);
export default ModalBox;
