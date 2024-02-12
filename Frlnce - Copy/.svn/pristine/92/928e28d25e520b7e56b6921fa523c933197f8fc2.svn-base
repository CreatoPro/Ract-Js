import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ApiService from "../../_services/ApiService";
import Loader from "./../../_components/loader/loader";
import Chart from "chart.js";
import { ReactComponent as PdfIcon } from "./images/file-lines-solid.svg";
import { ReactComponent as TickMark } from "./images/circle-check-solid.svg";
import { ReactComponent as Xmark } from "./images/circle-xmark-solid.svg";
import UserService from "../../_services/UserService";
import Config from "../../_config/config";
import { Modal, Button } from "react-bootstrap";
import "./testResult.styles.css";
import { config } from "mediaelement";

class TestResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
      studentPdfResponse: false,
      pdfUploadStatus: false,
      result: 0,
      displaying: "barGraphData",
      showModal: false,
      solutionData: null,
      topRankers: {},
      showTopRankers: false,
      solutionCorrectString: "",
      resultUrl: {},
      usingS3: false,
    };
    this.reloadTestResult = this.reloadTestResult.bind(this);
    //this.checkPaperUpload = this.checkPaperUpload.bind(this);
  }
  chartRef = React.createRef();

  async componentDidMount() {
    console.log("top rankers");
    console.log(this.props.match.params.id, "top rankers");

    const { resultUrl } = this.props.location.state || {};

    if (this.props.location.state?.showQuestionWiseAnalysis) {
      console.log("Hello");
      this.requestDataNew();
      // this.getTopRankers();
    } else {
      if (resultUrl) {
        this.setState({ resultUrl });
        const { res } = await this.getResultFromSigned(resultUrl);
        if (res) return;
      }
      this.reloadTestResult();
    }
    localStorage.removeItem("test_id");

    /** compare date validation */
    /*if(this.props.location.state != undefined){
      var testEndDate = this.props.location.state.testEndDate;
      if(testEndDate != "--" && testEndDate !=""){
        testEndDate = testEndDate.substring(0, testEndDate.length - 9);
        console.log(testEndDate);
        var to = this.changeDateFormat(testEndDate,'dd/MM/yy','MM/dd/yy');
        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        var today = month + "/" + day + "/" + year;
        var from = to + ' 00:00';
        to = today + ' 00:00';
        if(this.isFromBiggerThanTo(from, to)){
          this.setState({
            studentPdfResponse:true
          });
          this.checkPaperUpload();
        }
      }
    }*/
    /** compare date validation */
  }

  getResultFromSigned = async (resultUrl) => {
    const { viewResult } = resultUrl;
    console.log(resultUrl, "result");
    try {
      const res = await ApiService.fetchGetUrl(viewResult);
      console.log(res);
      if (res.data?.message === "Success") {
        this.setState({
          loading: false,
          list: res.data.data,
          result: res.data.result,
          message: res.data.message,
          usingS3: true,
        });

        return { res: true, err: false };
      }

      return { res: false, err: true };
    } catch (err) {
      console.log(err);
      return { res: false, err: true };
    }
  };

  getTopRankers = () => {
    const { list } = this.state;

    if (!list?.summary?.toprankers?.enableStatus) return;

    ApiService.getTopRankers(this.props.match.params.id)
      .then((res) => {
        console.log(res.data, "top rankers");
        this.setState({ topRankers: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate() {
    let testResult = this.state.list;
    if (
      (!testResult?.resultViewerMode || testResult?.resultViewerMode == 1) &&
      this.state.displaying === "barGraphData"
    ) {
      if (Config.siteTitle === "unsat" || Config.siteTitle === "unsat2") return;
      this.buildChart();
    }
  }

  reloadTestResult() {
    var id = this.props.match.params.id;
    this.setState({ loading: true }, () => {
      ApiService.fetchTestResult(id).then((res) => {
        console.log(res);
        if (res.data.data.resultViewerMode === 2) {
          console.log("top rankers here");
          this.getTopRankers();
        }
        this.setState({
          loading: false,
          list: res.data.data,
          result: res.data.result,
          message: res.data.message,
        });
      });
    });
  }

  checkPaperUpload() {
    var id = this.props.match.params.id;
    this.setState({ loading: true }, () => {
      ApiService.fetchTestPaperUploadStatus(id).then((res) => {
        if (res.data.status == 1) {
          this.setState({
            loading: false,
            url: res.data.url,
            pdfUploadStatus: false,
          });
        } else {
          if (this.state.studentPdfResponse == true) {
            this.setState({
              pdfUploadStatus: true,
            });
          } else {
            this.setState({
              pdfUploadStatus: false,
            });
          }
        }
      });
    });
  }

  routeChange(pathname, state) {
    console.log(pathname, state);
    if (state) {
      console.log("here");
      return this.props.history.push({
        pathname,
        state,
      });
    }
    this.props.history.push(pathname);
  }

  changeDateFormat(value, inputFormat, outputFormat) {
    let outputSplitter = "/";
    let strOutputFormat = outputFormat
      .split(outputSplitter)
      .map((i) => i.toUpperCase());
    if (strOutputFormat.length != 3) {
      strOutputFormat = outputFormat.split("-");
      outputSplitter = "-";
    }

    if (strOutputFormat.length != 3)
      throw new Error("wrong output format splitter :(");

    let date = null;

    if (value instanceof Date) {
      date = {
        ["YYYY"]: value.getUTCFullYear(),
        ["MM"]: value.getMonth() + 1,
        ["DD"]: value.getDate(),
      };
    }

    if (typeof value == "string") {
      let inputSplitter = "/";

      var strInputFormat = inputFormat
        .split(inputSplitter)
        .map((i) => i.toUpperCase());
      if (strInputFormat.length != 3) {
        strInputFormat = inputFormat.split("-");
        inputSplitter = "-";
      }

      if (strInputFormat.length != 3)
        throw new Error("wrong input format splitter :(");

      let dateElements = value.split(inputSplitter);
      if (dateElements.length != 3) throw new Error("wrong value :(");

      date = {
        [strInputFormat[0]]: dateElements[0],
        [strInputFormat[1]]: dateElements[1],
        [strInputFormat[2]]: dateElements[2],
      };
    }

    if (!date) throw new Error("unsupported value type:(");

    let result =
      date[strOutputFormat[0]] +
      outputSplitter +
      date[strOutputFormat[1]] +
      outputSplitter +
      date[strOutputFormat[2]];

    return result;
  }

  isFromBiggerThanTo(dtmfrom, dtmto) {
    return new Date(dtmfrom).getTime() >= new Date(dtmto).getTime();
  }

  closeWindow() {
    window.opener?.location?.reload();
    window.close();
  }

  logout = () => {
    this.props.history.push({
      pathname: "/logout",
      state: { redirectRoute: "/loginwithmobile" },
    });
  };

  render() {
    let portlet = JSON.parse(localStorage.getItem("portlet")) || [];
    var pid = this.props.match.params.pid;
    const { loading } = this.state;
    if (this.state.result == 1) {
      return (
        <div className="testlist">
          {
            <Container fluid>
              <div
                className={`module-header-step2 ${
                  portlet.class ? portlet.class : "orange-card"
                }`}
              >
                <div className="">
                  <div className="back">
                    {Config.siteTitle === "unsat" ||
                    Config.siteTitle === "unsat2" ? (
                      this.state.displaying === "questionWiseAnalysis" ? (
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          onClick={() =>
                            this.props.history.replace("/testdetails")
                          }
                        />
                      ) : (
                        <div className="logout-wrapper">
                          <span
                            className="test-result-logout"
                            onClick={this.logout}
                          >
                            Logout
                          </span>
                        </div>
                      )
                    ) : pid == 1 || pid === "null" ? (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        onClick={() => this.closeWindow()}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={this.props.history.goBack}
                      />
                    )}
                  </div>
                  <h4>Test Result {this.state.usingS3 && "*"}</h4>
                </div>
              </div>
              {loading ? <Loader /> : this.renderTestResult()}
            </Container>
          }
        </div>
      );
    } else {
      let msg = (
        <div dangerouslySetInnerHTML={{ __html: this.state.message }} />
      );
      return (
        <div className="testlist">
          {
            <Container fluid>
              <div
                className={`module-header-step2 ${
                  portlet.class ? portlet.class : "orange-card"
                }`}
              >
                <div className="AnalysisReport">
                  <div className="back">
                    {/* <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} /> */}
                    {(Config.siteTitle === "unsat" ||
                      Config.siteTitle === "unsat2") &&
                    this.state.resultUrl.detailedProfiling ? (
                      <div className="logout-wrapper">
                        <span
                          className="test-result-logout"
                          onClick={this.logout}
                        >
                          Logout
                        </span>
                      </div>
                    ) : pid == 1 || pid === "null" ? (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        onClick={() => this.closeWindow()}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={this.props.history.goBack}
                      />
                    )}
                  </div>
                  <h4>Online Tests Result</h4>
                </div>
              </div>
              <div className="testResult">
                {this.state.loading ? <Loader /> : msg}
                {this.state.pdfUploadStatus == true && (
                  <button
                    className={`resultbtn ${
                      portlet.class ? portlet.class : "orange-card"
                    }`}
                    onClick={() =>
                      this.routeChange(
                        "/test/upload/" + this.props.match.params.id
                      )
                    }
                  >
                    Upload PDF
                  </button>
                )}
              </div>
              <div className="testgraph" style={{ display: "none" }}>
                <canvas id="myChart" ref={this.chartRef} />
              </div>
            </Container>
          }
        </div>
      );
    }
  }

  renderTestResult() {
    let testResult = this.state.list;
    if (
      (testResult?.resultViewerMode && testResult?.resultViewerMode == 2) ||
      this.state.displaying === "questionWiseAnalysis"
    ) {
      return this.renderTestResultView2();
    } else {
      return this.renderTestResultView1();
    }
  }

  sortQuestionWiseAnalysis = (sections) => {
    if (!sections) return [];
    const newSections = sections.map((section) => {
      section.questions = section?.questions?.sort((questOne, questTwo) => {
        if (
          (parseInt(questOne.questionOrder) || 0) >=
          (parseInt(questTwo.questionOrder) || 0)
        )
          return 1;
        else return -1;
      });
      console.log(section.questions);
      return section;
    });
    console.log(newSections);
    return newSections;
  };

  requestDataNew = async () => {
    this.setState({ usingS3: false });
    const { resultUrl } = this.state;
    const { detailedProfiling } = resultUrl || {};
    const id = this.props.match.params.id;

    this.setState({ loading: true, list: [], message: null, result: 0 });
    if (detailedProfiling) {
      try {
        console.log("here success");

        const res = await ApiService.fetchGetUrl(detailedProfiling);
        if (res.data?.message === "Success") {
          let { data } = res.data;
          console.log(data);
          if (data?.summary?.setId > 0) {
            data.sections = this.sortQuestionWiseAnalysis(data?.sections);
          }
          return this.setState(
            {
              loading: false,
              list: data,
              result: res.data.result,
              message: res.data.message,
              displaying: "questionWiseAnalysis",
              usingS3: true,
            },
            () => {
              this.getTopRankers();
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    try {
      console.log("here success");
      const res = await ApiService.questionWiseAnalysis(id);
      console.log(res);
      let { data } = res.data;
      console.log(data);
      if (data?.summary?.setId > 0) {
        data.sections = this.sortQuestionWiseAnalysis(data?.sections);
      }
      this.setState(
        {
          loading: false,
          list: data,
          result: res.data.result,
          message: res.data.message,
          displaying: "questionWiseAnalysis",
        },
        () => {
          this.getTopRankers();
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  openResultPdf = () => {
    let enquiryId = UserService.getEnquiryId();
    let token = UserService.getToken();
    let id = this.props.match.params.id;
    // window.open();
    // https://triangles.edusquares.com/triangles/offlineTestPaper.do?reqCode=viewPaper&testId=178&enquiryId=35076
    window.open(
      `${Config.siteUrl}${Config.siteTitle}/offlineTestPaper.do?reqCode=viewPaper&testId=${id}&enquiryId=${enquiryId}&token=${token}`
    );
  };

  downloadSolution = (type) => {
    console.log(type);
    window.open(this.state.list?.summary[type]);
  };

  openSolution = (question) => {
    console.log(question);
    ApiService.viewSolution(question?.testId, question?.index, question?.id)
      .then((res) => {
        this.setState(
          {
            solutionData: res.data,
            solutionCorrectString: question?.correctString || "",
          },
          () => {
            this.setState({
              showModal: true,
            });
          }
        );
      })
      .catch((err) => {
        this.setState({
          showModal: true,
        });
        console.log(err);
      });
  };

  closeSolution = () => {
    this.setState({
      showModal: false,
      solutionCorrectString: "",
    });
  };

  renderRanks = () => {
    const { testRank, schoolRank, batchRank, studentGrade, externalResult } =
      this.state.list?.barGraphData[0] || {};

    let externResultArr = [];

    if (externalResult) externResultArr = externalResult.split(",");

    const [onlineCode, onlineDisc, offlineCode, offlineDisc] = externResultArr;

    return (
      <>
        <div className="test-result-ranks">
          {testRank && (
            <div className="test-result-rank-wrapper">
              <span className="test-result-rank-heading">All India Rank</span>
              <span className="test-details-fancy test-details-rank-value">
                {testRank}
              </span>
            </div>
          )}
          {schoolRank && (
            <div className="test-result-rank-wrapper">
              <span className="test-result-rank-heading">State Rank</span>
              <span className="test-details-fancy test-details-rank-value">
                {schoolRank}
              </span>
            </div>
          )}
          {batchRank && (
            <div className="test-result-rank-wrapper">
              <span className="test-result-rank-heading">City Rank</span>
              <span className="test-details-fancy test-details-rank-value">
                {batchRank}
              </span>
            </div>
          )}
          {studentGrade && (
            <div className="test-result-rank-wrapper">
              <span className="test-result-rank-heading">Scholarship Code</span>
              <span className="test-details-fancy test-details-rank-value">
                {studentGrade}
              </span>
            </div>
          )}
        </div>
        {externalResult && (
          <div className="test-result-rank-wrapper">
            <span className="test-rank-scholarship">
              <span className="test-rank-bold">Congratulations! 🎉</span>
              <br />
              <span
                className="test-reult-clickable"
                onClick={() => (window.location = "https://www.unacademy.com")}
              >
                You have won{" "}
                <span className="test-rank-bold">
                  {onlineDisc}% scholarship
                </span>{" "}
                on Unacademy Plus subscription. Use code:{" "}
                <span className="test-result-fancy test-rank-bold">
                  {onlineCode}
                </span>{" "}
                to claim it.
              </span>
              {offlineCode && (
                <span
                  className="test-reult-clickable"
                  onClick={() =>
                    (window.location = "https://unacademy.com/offline/centres")
                  }
                >
                  <br /> You have won{" "}
                  <span className="test-rank-bold">
                    {offlineDisc}% scholarship
                  </span>{" "}
                  on Unacademy Centre subscription. Use code:{" "}
                  <span className="test-result-fancy test-rank-bold">
                    {offlineCode}
                  </span>{" "}
                  to claim it.
                </span>
              )}
            </span>
            {/* <span className="test-result-rank-heading">Scholarship Code</span> */}
            {/* <span className="test-details-fancy test-details-rank-value"> */}
          </div>
        )}
      </>
    );
  };

  renderTestResultView1() {
    let data = this.state.list;
    let portlet = JSON.parse(localStorage.getItem("portlet")) || [];
    const RenderRanks = this.renderRanks;
    return (
      <>
        <div className="test-result-logo-container">
          <img
            className="test-result-logo"
            src={`https://webfront.edusquares.com/${Config.siteTitle}/files/logos/logo.png`}
            alt="logo"
          />
        </div>
        {<RenderRanks />}
        {this.renderCard()}
        <div className="testResult">
          {/* {data.showAnalysisButtons==1 && <button className={`resultbtn ${portlet.class ? portlet.class : 'orange-card'}`}  onClick={() => this.routeChange('/test-result-detail/'+this.props.match.params.id)} >Detailed Profiling</button>} */}
          {data.showAnalysisButtons == 1 && (
            <button
              className={`resultbtn ${
                portlet.class ? portlet.class : "orange-card"
              }`}
              onClick={() =>
                this.routeChange(
                  "/detailed-profiling/" + this.props.match.params.id,
                  this.state.resultUrl.detailedProfiling
                    ? { resultUrl: this.state.resultUrl }
                    : null
                )
              }
            >
              Detailed Profiling
            </button>
          )}
          {/* {data.showAnalysisButtons==1 && <button className={`resultbtn ${portlet.class ? portlet.class : 'orange-card'}`}  onClick={() => this.routeChange('/test-result-question-wise/'+this.props.match.params.id)} >Question Wise Analysis</button>} */}
          {data.showAnalysisButtons == 1 && (
            <button
              className={`resultbtn ${
                portlet.class ? portlet.class : "orange-card"
              }`}
              onClick={this.requestDataNew}
            >
              Question Wise Analysis
            </button>
          )}
        </div>
        {/* <h4>Your Performance in Test</h4> */}
        {Config.siteTitle === "unsat" ||
        Config.siteTitle === "unsat2" ? null : (
          <div className="testResult">
            <div className="result_card_list">
              <div className="testgraph">
                <canvas id="myChart" ref={this.chartRef} height="230vh" />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  displayRank = () => {
    this.setState({ showTopRankers: true });
  };

  closeRanks = () => {
    this.setState({ showTopRankers: false });
  };

  renderTestResultView2() {
    let result = this.state.list;
    let user = JSON.parse(localStorage.getItem("user"));
    let portlet = JSON.parse(localStorage.getItem("portlet")) || [];
    return (
      <>
        <div className="testResult">
          <div className="result_card_list">
            <div className="test-name-div">
              <h4>{result.testName}</h4>
              {this.state.topRankers.rankers?.map((data) => {
                if (user.studentCode === data.studentCode) {
                  return (
                    <h6 className="rank-info">
                      {" "}
                      Your Rank is{" "}
                      {`${data.schoolRank}/${this.state.topRankers.rankers?.length}`}
                    </h6>
                  );
                }
                return null;
              })}
            </div>
            {this.state.list?.summary?.toprankers?.enableStatus && (
              <Button onClick={this.displayRank}>Top Rankers</Button>
            )}
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-5">
              <div className="test_summary_card blue-card test-result-mg">
                <h4>Summary</h4>
                <table>
                  <tr>
                    <th className="text-center summary-box">Total Questions</th>
                    <th className="text-center summary-box">Total Marks</th>
                    <th className="text-center summary-box">Your Score</th>
                  </tr>
                  <tr>
                    <td className="text-center">
                      {result.summary.numberOfQuestions}
                    </td>
                    <td className="text-center">{result.summary.totalMarks}</td>
                    <td className="text-center">
                      <span style={{ fontWeight: "bolder" }}>
                        {result.summary.marksObtained}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="col-md-5">
              <div className="test_summary_card blue-card test-result-mg">
                <h4>Attempt Summary</h4>
                <table>
                  <tr>
                    <th className="text-center summary-box">Correct</th>
                    <th className="text-center summary-box">Wrong</th>
                    <th className="text-center summary-box">Unattempted</th>
                  </tr>
                  <tr>
                    <td className="text-center">
                      {result.summary.correctQuestions}
                    </td>
                    <td className="text-center">
                      {result.summary.wrongQuestions}
                    </td>
                    <td className="text-center">
                      {result.summary.unattemptedQuestions}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <br />
          <br />
          {result.sections &&
            result.sections.map((section, index) => {
              return (
                <>
                  {this.state.list?.summary?.solutions && (
                    <span
                      className="view-solution"
                      onClick={() => this.downloadSolution("solutions")}
                    >
                      Download - Solutions{" "}
                    </span>
                  )}
                  {this.state.list?.summary?.testPaper && (
                    <span
                      className="view-solution"
                      onClick={() => this.downloadSolution("testPaper")}
                    >
                      {" "}
                      || Download - Test Paper{" "}
                    </span>
                  )}
                  {this.state.list?.summary?.testPaperWithSolutions && (
                    <span
                      className="view-solution"
                      onClick={() =>
                        this.downloadSolution("testPaperWithSolutions")
                      }
                    >
                      {" "}
                      || Download - Test Paper With Solution{" "}
                    </span>
                  )}
                  {this.state.list.needsManualEvaluation && (
                    <span
                      className="view-solution"
                      onClick={this.openResultPdf}
                    >
                      {" "}
                      || Your Answer Script
                    </span>
                  )}
                  <div className="row">
                    <div className="col">
                      <div
                        style={{ overflowY: "scroll" }}
                        className="test_summary_card blue-card"
                      >
                        <h4>
                          {section.sectionName} /{" "}
                          {this.state.list?.summary?.setName}
                        </h4>
                        <table>
                          <tr>
                            <th className="text-center">#</th>
                            {result.tagTypes &&
                              result.tagTypes.map((tagType, tagTypeIndex) => {
                                return (
                                  <>
                                    <th className="text-center">
                                      {tagType.name}
                                    </th>
                                  </>
                                );
                              })}
                            {/* <th className="text-center">Set</th> */}
                            <th className="text-center">Your Response</th>
                            <th className="text-center">Correct Answer</th>
                            <th className="text-center">Score</th>
                            <th className="text-center">
                              View{" "}
                              {this.state.list.needsManualEvaluation && (
                                <PdfIcon
                                  onClick={this.openResultPdf}
                                  className="pdf-icon"
                                />
                              )}
                            </th>
                          </tr>
                          {section.questions &&
                            section.questions.map((question, questionIndex) => {
                              return (
                                <>
                                  <tr>
                                    <td className="text-center">
                                      {question.questionOrder || question.index}
                                    </td>
                                    {question.tags &&
                                      question.tags.map(
                                        (
                                          questioTagType,
                                          questioTagTypesIndex
                                        ) => {
                                          return (
                                            <>
                                              <td className="text-center">
                                                {questioTagType.tags &&
                                                  questioTagType.tags.map(
                                                    (
                                                      questionTag,
                                                      questionTagsIndex
                                                    ) => {
                                                      return (
                                                        <>
                                                          <span className="text-center">
                                                            {questionTag.name}
                                                          </span>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                              </td>
                                            </>
                                          );
                                        }
                                      )}
                                    {/* <td className="text-center">
                                      {this.state.list?.summary?.setName}
                                    </td> */}
                                    <td className="text-center">
                                      {question.attemptedString || "--"}
                                    </td>
                                    <td className="text-center">
                                      {question.correctString}
                                    </td>
                                    <td className="text-center">
                                      {question.marks}/
                                      {parseFloat(question.actualMarks)}
                                    </td>
                                    <td className="text-center">
                                      <button
                                        onClick={() =>
                                          this.openSolution(question)
                                        }
                                        className={
                                          "download " +
                                          (question.attemptStatus == 1
                                            ? " green-card"
                                            : question.attemptStatus == -1
                                            ? " blue-card"
                                            : " orange-card")
                                        }
                                      >
                                        Solution
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </table>
                      </div>
                    </div>
                  </div>
                  <br />
                </>
              );
            })}
          <button
            className={`resultbtn ${
              portlet.class ? portlet.class : "orange-card"
            }`}
            onClick={() =>
              this.routeChange(
                "/detailed-profiling/" + this.props.match.params.id,
                this.state.resultUrl.detailedProfiling
                  ? { resultUrl: this.state.resultUrl }
                  : null
              )
            }
          >
            Detailed Profiling
          </button>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeSolution}>
          <Modal.Header className="text-uppercase" closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.solutionData ? (
              <>
                <h4>Question: </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.solutionData?.questionStatement,
                  }}
                ></div>
                {this.state.solutionData?.choiceGroup1.map((choice, i) => (
                  <div>
                    <span className="solution-choice-string">
                      {choice.choiceString}
                    </span>
                    <div
                      className="solution-choice"
                      key={i}
                      dangerouslySetInnerHTML={{ __html: choice.choiceValue }}
                    ></div>
                    {this.state.solutionCorrectString ===
                    this.state.solutionData?.studentResponse ? (
                      choice.choiceString ===
                        this.state.solutionData?.studentResponse && (
                        <TickMark className="success-option" />
                      )
                    ) : (
                      <>
                        {choice.choiceString ===
                          this.state.solutionCorrectString && (
                          <TickMark className="correct-option" />
                        )}
                        {choice.choiceString ===
                          this.state.solutionData?.studentResponse && (
                          <Xmark className="wrong-option" />
                        )}
                      </>
                    )}
                  </div>
                ))}
                <div
                  className="answer-box"
                  style={{
                    color: `var(${
                      this.state.solutionCorrectString ===
                      this.state.solutionData?.studentResponse
                        ? "--success"
                        : "--danger"
                    })`,
                  }}
                >
                  <span>Correct Answer : </span>{" "}
                  <span>{this.state.solutionCorrectString}</span> |{" "}
                  <span>My Answer : </span>{" "}
                  <span>{this.state.solutionData?.studentResponse}</span>
                </div>
                <h4>Solution: </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.solutionData?.solution,
                  }}
                ></div>
              </>
            ) : (
              <h5>Data is not uploaded</h5>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              className="text-uppercase"
              onClick={this.closeSolution}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="xl"
          show={this.state.showTopRankers}
          onHide={this.closeRanks}
        >
          <Modal.Header className="text-uppercase" closeButton>
            <Modal.Title>
              <h3>Top Ranks</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.topRankers.rankers?.length ? (
              <div className="rank-wrapper">
                <div className="rank-div rank-heading">
                  {this.state.list?.summary?.toprankers?.columns?.map(
                    (column) => (
                      <div className="rank-details">
                        <h5>{column?.DisplayLabel}</h5>
                      </div>
                    )
                  )}
                </div>
                {this.state.topRankers?.rankers.map((data) => (
                  <div className="rank-div">
                    {this.state.list?.summary?.toprankers?.columns?.map(
                      (column) => (
                        <div className="rank-details">
                          <h6>{data[column.property]}</h6>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <h1>No data Found</h1>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              className="text-uppercase"
              onClick={this.closeRanks}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  renderCard() {
    let data = this.state.list;
    if (typeof data !== "undefined" || data != null) {
      return (
        <div className="testResult">
          <div className="result_card_list">
            {/* <h4>Your Performance in Test</h4> */}
            <table>
              <tr className="blue-card">
                <th>Section</th>
                <th>Marks</th>
                <th>Max</th>
                <th>%</th>
                {Config.siteTitle === "unsat" ||
                this.siteTitle === "unsat2" ? null : (
                  <>
                    <th>
                      CH{" "}
                      <i className="test-result-info">
                        i{" "}
                        <span className="test-result-legend test-result-right-legend">
                          Course Highest
                        </span>
                      </i>
                    </th>
                    <th>
                      CA{" "}
                      <i className="test-result-info">
                        i{" "}
                        <span className="test-result-legend test-result-left-legend">
                          Course Average
                        </span>
                      </i>
                    </th>
                  </>
                )}
              </tr>
              {data.testTableData &&
                data.testTableData
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((item, index) => {
                    if (item.sortOrder == 100) {
                      item.sectionName = "Test Total";
                    }
                    return (
                      <tr>
                        <td>
                          <b>{item.sectionName}</b>
                        </td>
                        <td>{item.marks}</td>
                        <td>{item.totalMarks}</td>
                        <td>{item.percentage.toFixed(2)}</td>
                        {Config.siteTitle === "unsat" ||
                        this.siteTitle === "unsat2" ? null : (
                          <>
                            {" "}
                            <td>{item.testHighestPercentage}</td>
                            <td>{item.testAveragePercentage}</td>{" "}
                          </>
                        )}
                      </tr>
                    );
                  })}
            </table>
          </div>
          <br />
          {/* {this.renderLegends()} */}
        </div>
      );
    }
  }

  renderLegends() {
    return (
      <div className="result_card_list">
        {/* <h4>Legends</h4> */}
        <table>
          {/* <tr>
            <td>
              <b>Sec</b>
            </td>
            <td>Section</td>
          </tr> */}
          {/* <tr>
            <td>
              <b>Max</b>
            </td>
            <td>Maximum Marks</td>
          </tr> */}
          {/* <tr>
            <td>
              <b>%</b>
            </td>
            <td>Percentage</td>
          </tr> */}
          <tr>
            <td>
              <b>CH</b>
            </td>
            <td>Course Highest</td>
          </tr>
          <tr>
            <td>
              <b>CA</b>
            </td>
            <td>Course Average</td>
          </tr>
        </table>
      </div>
    );
  }

  buildChart = () => {
    let t1 = {};
    t1.label = "Marks";
    t1.data = [];
    t1.backgroundColor = [];
    t1.borderColor = [];
    t1.borderWidth = 1;

    let t2 = {};
    t2.label = "Topper";
    t2.data = [];
    t2.backgroundColor = [];
    t2.borderColor = [];
    t2.borderWidth = 1;

    let t3 = {};
    t3.label = "Total";
    t3.data = [];
    t3.backgroundColor = [];
    t3.borderColor = [];
    t3.borderWidth = 1;
    let labels = [];
    let barChartData = {};
    let data = this.state.list;
    if (typeof data !== "undefined" || data != null) {
      data.barGraphData &&
        data.barGraphData.map((item, index) => {
          if (index == 0) {
            item.name = "Test";
          }
          labels.push(item.name);

          t1.data.push(item.marks);
          t1.backgroundColor.push("rgba(0, 128 ,0, 0.8)");
          t1.borderColor.push("rgba(0, 128 ,0, 1)");

          t2.data.push(item.toppermarks);
          t2.backgroundColor.push("rgba(255, 0, 0, 0.8)");
          t2.borderColor.push("rgba(255, 0, 0, 1)");

          t3.data.push(item.totalmarks);
          t3.backgroundColor.push("rgba(31, 119, 180, 0.8)");
          t3.borderColor.push("rgba(31, 119, 180, 1)");
        });

      barChartData = {
        labels: labels,
        datasets: [t1, t2, t3],
      };

      const myChartRef = this.chartRef.current.getContext("2d");
      myChartRef.height = 700;
      new Chart(myChartRef, {
        type: "bar",
        data: barChartData,
        options: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontColor: "#000080",
            },
          },
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  min: 0,
                },
              },
            ],
          },
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    }
  };
}

export default TestResult;
