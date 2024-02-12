import React, { useState } from "react";
import ApiService from "../../_services/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { ILoader } from "../../_components/iloader/iloader";
import "./document-upload.styles.css";

const DocumentUpload = (props) => {
  const [file, setFile] = useState(null);
  console.log(file);
  const [postData, setPostData] = useState({});
  console.log(postData);
  const [checkBoxchecked, setCheckBox] = useState(false);

  const [showLoading, setLoading] = useState(false);


  const onUploadDocument = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePostData = (e) => {
    const { value, name } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckBox = (e) => {
    const { checked } = e.target;
    setCheckBox(checked);
  };

  const showPopup = (msg, isWarning)=>{
    return swal({
        text: msg,
        icon: isWarning?"warning": "success",
        button: "Ok",
        allowOutsideClick: false,
              closeOnClickOutside: false,
              closeOnEsc: false
      });
  }

  const uploadDocument = async (body) => {
    console.log(body);
    setLoading(true);
    try {
        const res = await ApiService.uploadDocument(body);
        if (res.status === 200) {
            console.log(res);
            setLoading(false);
            setLoading(false);
            return showPopup('Document Submitted successfully',false).then(()=>window.location.reload());
        }
        setLoading(false);
        return showPopup('Sorry some Error accured',true);
    } catch (err) {
        console.log(err.message);
        setLoading(false);
        return showPopup('Sorry some Error accured',true);
    }
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    if(file === null) return showPopup('No Document Uploaded', true);
    
    const postDataJson = {
      ...postData,
      isVerifiedCheckBox: checkBoxchecked,
      targetDate: new Date().toLocaleDateString("en-US"),
      documentId: 1
    };
    console.log(postDataJson);
    const formData = new FormData();
    formData.append("file", file, file?.name);
    formData.append("postData", JSON.stringify(postDataJson));

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    await uploadDocument(formData);
  };


  return (
    <div>
      <div className="module-header">
        <div
          className={`module-header-inner ${
            props.location.state
              ? props.location.state.portlet.class
              : "orange-card"
          }`}
        >
          <div className="back">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={props.history.goBack}
            />
          </div>
          <img src="" alt={props.match.params.type} />
        </div>
        <div className="arrow-set">
          <h4>Upload Documents</h4>
        </div>
      </div>
      <form onSubmit={submitFormData}>
        <div className="upload-form-wrapper">
          <div className="form-group">
            <label className="upload-form-label">Remarks</label>
            <input
              className="form-control"
              type="text"
              placeholder="Remark"
              onChange={handlePostData}
              name="remarks"
            />
          </div>
          {/* <div className="form-group"> ! comment out becuase api is giving error in document id above 4
            <label className="upload-form-label">Id</label>
            <input
              className="form-control"
              type="text"
              placeholder="Id"
              onChange={handlePostData}
              name="documentId"
            />
          </div> */}
          <div className="form-group">
            <label className="upload-form-label">Document Number</label>
            <input
              className="form-control"
              type="text"
              placeholder="Document Number"
              onChange={handlePostData}
              name="documentNumber"
            />
          </div>
          <div className=" form-group form-check">
            <input
              id="document verified"
              className="form-check-input"
              type="checkbox"
              name="isVerifiedCheckBox"
              onChange={handleCheckBox}
            />
            <label
              className="form-check-label upload-form-label"
              for="document verified"
            >
              Is Document varified?
            </label>
          </div>
          <input type="file" onChange={onUploadDocument} />
          <div className="upload-field-wrapper">
            <button className="btn btn-primary" type="submit">
              Upload document
            </button>
          </div>
        </div>
      </form>
      <ILoader
        loadingText="Uploading Document"
        isShow={showLoading}
      ></ILoader>
    </div>
  );
};

export default DocumentUpload;
