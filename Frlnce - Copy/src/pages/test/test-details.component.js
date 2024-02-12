import React from "react";
import ApiService from "../../_services/ApiService";
import Config from "../../_config/config";
import Loader from "./../../_components/loader/loader";
import { ReactComponent as UnsatLogo } from "./images/unsat.svg";
import { ReactComponent as UnacademyLogo } from "./images/unacademy.svg";
import "./test-details.styles.css";

class TestDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      testDetails: {},
      showLoading: false,
      error: "",
    };
  }
  async componentDidMount() {
    await this.fetchTestResult();
    console.log("here");
    const { testDetails } = this.props.location?.state || {};
    if (testDetails) {
      console.log(testDetails, "here");
      if (testDetails.status === "View Result") {
        console.log("here");
        this.props.history.push(
          `/test-result/null/${testDetails.launchTestId}`
        );
      }
      sessionStorage.setItem(
        "testDate",
        JSON.stringify(testDetails?.TestDateString)
      );
      sessionStorage.setItem(
        "testTime",
        JSON.stringify(testDetails?.TestTimeString)
      );
      this.setState({ testDetails, showLoading: false });
    } else {
      this.fetchtestData();
    }
  }

  fetchTestResult = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { mobileNumber } = user;
    console.log(mobileNumber);
    try {
      this.setState({ showLoading: true });
      const res = await ApiService.testResultsUrls(mobileNumber);
      console.log(res);
      // const {status} = res.data;
      const { launchTestId } = res.data?.data || {};
      if (launchTestId) {
        this.props.history.push({
          pathname: `/test-result/null/${launchTestId}`,
          state: {
            resultUrl: res.data.data,
          },
        });
      } else if (res.data?.data.status === "View Result") {
        this.props.history.push(
          `/test-result/null/${res.data?.data?.launchTestId}`
        );
      }
    } catch (err) {
      this.setState({ error: "No Result Found" });
      console.log(err);
    }
  };

  fetchtestData = async () => {
    try {
      this.setState({ showLoading: true });
      const res = await ApiService.fetchTestDetails();
      console.log(res);
      if (res.data?.data.status === "View Result") {
        this.props.history.push(
          `/test-result/null/${res.data?.data?.launchTestId}`
        );
      }
      sessionStorage.setItem(
        "testDate",
        JSON.stringify(res.data?.data?.TestDateString)
      );
      sessionStorage.setItem(
        "testTime",
        JSON.stringify(res.data?.data?.TestTimeString)
      );
      this.setState({ testDetails: res.data.data || {}, showLoading: false });
    } catch (err) {
      console.log(err);
    }
  };

  openTest = (testId) => {
    window.open(
      `/TestInstructions/${testId}`,
      "Start Test",
      "height=" + window.screen.height + ",width=" + window.screen.width
    );
  };

  printAmitCard = (url) => {
    const Userdata = JSON.parse(localStorage.getItem("user"));
    const { token } = Userdata;
    window.open(`${Config.siteUrl}${url.substring(1)}&token=${token}`);
  };

  logout = () => {
    this.props.history.push({
      pathname: "/logout",
      state: { redirectRoute: "/loginwithmobile" },
    });
  };

  render() {
    // const Userdata = JSON.parse(localStorage.getItem("user"));
    // const { enquiryName,username } = Userdata;
    const { testDetails, error } = this.state;
    return this.state.showLoading ? (
      <Loader />
    ) : (
      <div className="test-details-container">
        <div className="test-details-nav">
          <span className="test-details-nav-item">
            <span>Not you? </span>
            <span className="test-details-logout" onClick={this.logout}>
              Logout
            </span>
          </span>
        </div>
        <div className="test-details-logo-container">
          <UnacademyLogo className="test-details-logo" />
          <UnsatLogo className="test-details-logo" />
        </div>
        {/* <h1 className="test-details-heading-1">
          Welcome to {Config.siteTitle.toUpperCase()}, <span className="test-details-fancy">{enquiryName||username}</span>
        </h1> */}
        {this.state.error ? (
          <div className="test-details-div">
            <h3 className="test-details-heading-2 test-details-center-text">
              {error}
            </h3>
          </div>
        ) : !testDetails.admissionDetails ? (
          <div className="test-details-div">
            <h3 className="test-details-heading-2 test-details-center-text">
              {testDetails.admissionDetailsMsg}{" "}
            </h3>
          </div>
        ) : (
          <>
            <h3 className="test-details-heading-2">Your test details: </h3>
            <div className="test-details-div-wrapper">
              <div className="test-details-div">
                <span className="test-details-heading-3">Test: </span>
                <span className="test-details-description">
                  {testDetails.TestName}
                </span>
              </div>
              <div className="test-details-div">
                <span className="test-details-heading-3">Format: </span>
                <span className="test-details-description">
                  {testDetails.Format}
                </span>
              </div>
              <div className="test-details-div">
                <span className="test-details-heading-3">Date: </span>
                <span className="test-details-description">
                  {testDetails.TestDateString}
                </span>
              </div>
              <div className="test-details-div">
                <span className="test-details-heading-3">Time: </span>
                <span className="test-details-description">
                  {testDetails.TestTimeString}
                </span>
              </div>
              {testDetails.AdmitCardEnabled ? (
                <div className="test-details-div">
                  <span className="test-details-heading-3">
                    Admit Card No:{" "}
                  </span>
                  <span className="test-details-description">
                    {testDetails.AdmitCardNumber}
                  </span>
                </div>
              ) : null}
              {/* <div className="test-details-div">
                <span className="test-details-heading-3">School Name: </span>
                <span className="test-details-description">
                  {testDetails.SchoolName}
                </span>
              </div> */}
              {testDetails.AdmitCardEnabled ? (
                <div className="test-details-div">
                  <span className="test-details-heading-3">Venue: </span>
                  <span className="test-details-description">
                    {testDetails.Venue}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="test-details-button-wrapper">
              {testDetails.AdmitCardEnabled ? (
                <button
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/admitcard",
                      state: { testDetails },
                    })
                  }
                  className="btn btn-success btn-lg test-details-button"
                >
                  Print Admit Card
                </button>
              ) : null}
              {testDetails.Format === "Online" ? (
                <button
                  onClick={() =>
                    testDetails.buttonEnableStatus
                      ? this.openTest(testDetails.launchTestId)
                      : null
                  }
                  className="btn btn-primary btn-lg test-details-button"
                >
                  {testDetails.status}
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default TestDetails;
