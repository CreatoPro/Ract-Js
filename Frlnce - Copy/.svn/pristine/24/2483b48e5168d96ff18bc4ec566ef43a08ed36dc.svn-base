import React from "react";
import ApiService from "../../_services/ApiService";
import Loader from "./../../_components/loader/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import { Modal, Button } from "react-bootstrap";
import { ReactComponent as TickMark } from "./images/circle-check-solid.svg";
import { ReactComponent as Xmark } from "./images/circle-xmark-solid.svg";
import utils from "../../_helpers/utils";
import "./detailed-profiling.styles.css";

class DetailedProfiling extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      profilingData: {},
      showSolution: false,
      solutionCorrectString: "",
      usingS3: false,
    };
  }

  componentDidMount() {
    this.questionWiseAnalysis();
  }

  questionWiseAnalysis = async () => {
    const { resultUrl } = this.props.location.state || {};
    const { detailedProfiling } = resultUrl || {};
    let id = this.props.match.params.id;

    this.setState({ loading: true });
    if (detailedProfiling) {
      console.log("here");
      try {
        const res = await ApiService.fetchGetUrl(detailedProfiling);
        if (res.data?.message === "Success") {
          console.log(res.data.data);
          this.setState({ usingS3: true });
          return this.processData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await ApiService.questionWiseAnalysis(id);
      console.log("here");
      if (res.data?.message === "Success") {
        console.log(res.data.data);
        this.processData(res.data);
      }
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  processData = (data) => {
    const profilingData = {
      summary: data.data.summary,
      testName: data.data.testName,
    };
    const tagSections = [];

    data.data?.sections?.forEach((oldSection) => {
      oldSection.questions.forEach((question) => {
        question.tags.forEach((oldTagSection) => {
          oldTagSection.tags.forEach((tag) => {
            // creating tag section
            let tagSecIndex = null;
            tagSections.forEach((tagSection, index) => {
              if (tagSection.majorTagName === oldTagSection.name) {
                tagSecIndex = index;
              }
            });

            if (tagSecIndex === null) {
              tagSecIndex = tagSections.length;
              tagSections.push({
                majorTagName: oldTagSection.name,
                sections: [],
              });
            }

            // creating sections
            let secIndex = null;
            tagSections[tagSecIndex].sections.forEach((section, index) => {
              if (section.sectionId === oldSection.sectionId) {
                secIndex = index;
              }
            });

            if (secIndex === null) {
              secIndex = tagSections[tagSecIndex].sections.length;
              tagSections[tagSecIndex].sections.push({
                sectionName: oldSection.sectionName,
                sectionId: oldSection.sectionId,
                tags: [],
              });
            }

            // creating tags
            let tagIndex = null;
            tagSections[tagSecIndex].sections[secIndex].tags.forEach(
              (newTag, index) => {
                if (newTag.id === tag.id) {
                  tagIndex = index;
                }
              }
            );
            if (tagIndex === null) {
              tagIndex =
                tagSections[tagSecIndex].sections[secIndex].tags.length;
              tagSections[tagSecIndex].sections[secIndex].tags.push({
                name: tag.name,
                id: tag.id,
                questions: [],
              });
            }
            tagSections[tagSecIndex].sections[secIndex].tags[
              tagIndex
            ].questions.push({
              questionId: question.questionId,
              id: question.id,
              index: question.index,
              correctString: question.correctString,
              attemptStatus: question.attemptStatus,
              attemptId: question.attemptId,
              testId: question.testId,
            });

            // calculating no of attempts and correct
            if (question.attemptStatus === -1) {
              tagSections[tagSecIndex].sections[secIndex].tags[
                tagIndex
              ].notAttempt =
                (tagSections[tagSecIndex].sections[secIndex].tags[tagIndex]
                  .notAttempt || 0) + 1;
            } else if (question.attemptStatus === 0) {
              tagSections[tagSecIndex].sections[secIndex].tags[tagIndex].wrong =
                (tagSections[tagSecIndex].sections[secIndex].tags[tagIndex]
                  .wrong || 0) + 1;
            } else if (question.attemptStatus === 1) {
              tagSections[tagSecIndex].sections[secIndex].tags[tagIndex].right =
                (tagSections[tagSecIndex].sections[secIndex].tags[tagIndex]
                  .right || 0) + 1;
            }

            // calculating marks
            tagSections[tagSecIndex].sections[secIndex].tags[
              tagIndex
            ].totalMarks =
              (tagSections[tagSecIndex].sections[secIndex].tags[tagIndex]
                .totalMarks || 0) + parseFloat(question.actualMarks);
            tagSections[tagSecIndex].sections[secIndex].tags[
              tagIndex
            ].marksObtain =
              (tagSections[tagSecIndex].sections[secIndex].tags[tagIndex]
                .marksObtain || 0) + parseFloat(question.marks);
          });
        });
      });
    });

    profilingData.tagSections = tagSections;

    this.setState({
      loading: false,
      profilingData,
    });
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
              showSolution: true,
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
      showSolution: false,
      solutionCorrectString: "",
    });
  };

  goBack = () => {
    const { resultUrl } = this.props.location.state || {};
    if (resultUrl) return this.props.history.push("/testdetails");
    this.props.history.goBack();
  };

  QuestionGem = ({ question }) => {
    const gemColor = {
      1: "question-success",
      0: "question-fail",
      "-1": "question-neutral",
    };
    return (
      <div
        onClick={() => this.openSolution(question)}
        className={`${
          gemColor[question?.attemptStatus]
        } profiling-question-block`}
      >
        {question.index}
      </div>
    );
  };

  AttemptsBar = ({ tag }) => (
    <div className="profiling-full-width">
      <div
        style={{
          gridTemplateColumns: `${tag?.right || 0}fr ${tag?.wrong || 0}fr ${
            tag?.notAttempt || 0
          }fr`,
        }}
        className="profiling-progress-bar question-neutral"
      >
        <div className="question-success"></div>
        <div className="question-fail"></div>
        <div className="question-neutral"></div>
      </div>
      <div className="profiling-heading profiling-center-text">
        <span className="question-success-text">{tag?.right || 0}</span>/
        <span className="question-fail-text">{tag?.wrong || 0}</span>/
        <span className="question-neutral-text">{tag?.notAttempt || 0}</span>
      </div>
    </div>
  );

  AccuracyBar = ({ tag }) => (
    <div className="profiling-full-width">
      <div
        style={{
          gridTemplateColumns: `${tag?.right || 0}fr 
                          ${tag?.wrong || 0}fr`,
        }}
        className="profiling-progress-bar question-neutral"
      >
        <div className="question-success animate-progress"></div>
        <div className="question-neutral"></div>
      </div>
      <div className="profiling-heading profiling-center-text">
        {(
          ((tag?.right || 0) / ((tag?.wrong || 0) + (tag?.right || 0))) * 100 ||
          0
        )?.toFixed(1)}
        %
      </div>
    </div>
  );

  RenderOnPc = () => {
    const {AttemptsBar, AccuracyBar, QuestionGem} = this;
    return (
      <>
        {this.state.profilingData?.tagSections?.map((tagSection, index) => (
          <div key={index}>
            <div className="profiling-section-name profiling-heading">
              {tagSection.majorTagName}
            </div>
            <div className="profiling-tag-block">
              <div className="profiling-row profiling-heading profiling-tag-header">
                <div className="profiling-column">Sections</div>
                <div className="profiling-column">Topics</div>
                <div className="profiling-column">Questions</div>
                <div className="profiling-column">Questions Attempted</div>
                <div className="profiling-column">Marks</div>
                <div className="profiling-column">Attempts</div>
                <div className="profiling-column">Accuracy</div>
              </div>
              {tagSection?.sections?.map((section, index2) => (
                <div key={index2} className="profiling-row">
                  <div
                    style={{ gridRow: `span ${section.tags.length}` }}
                    className="profiling-column profiling-center profiling-heading"
                  >
                    {section.sectionName}
                  </div>
                  {section?.tags?.map((tag, index3) => (
                    <React.Fragment key={index3}>
                      <div className="profiling-column">{tag.name}</div>
                      <div className="profiling-column profiling-question-container">
                        {tag?.questions?.map((question, index4) => (
                          <QuestionGem key={index4} question={question} />
                        ))}
                      </div>
                      <div className="profiling-column">
                        {(tag?.right || 0) + (tag?.wrong || 0)}/
                        {(tag?.right || 0) +
                          (tag?.wrong || 0) +
                          (tag?.notAttempt || 0)}
                      </div>
                      <div className="profiling-column">
                        <div>
                          {tag?.marksObtain}/{tag?.totalMarks}
                        </div>
                        <div>
                          [{" "}
                          {((tag?.marksObtain / tag?.totalMarks) * 100).toFixed(
                            2
                          )}
                          % ]
                        </div>
                      </div>
                      <div className="profiling-column profiling-center">
                        <AttemptsBar tag={tag} />
                      </div>
                      <div className="profiling-column profiling-center">
                        <AccuracyBar tag={tag} />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  RenderOnMobile = () => {
    const { profilingData } = this.state;
    const {AttemptsBar, AccuracyBar, QuestionGem} = this;
    return (
      <div className="detailed-profiling-mobile-wrapper">
        {profilingData?.tagSections?.map((tagSection, index) =>
          tagSection?.sections?.map((section, index2) =>
            section?.tags?.map((tag, index3) => (
              <div className="detailed-profiling-mobile-box" key={index3}>
                <span className="detailed-profiling-mobile-section-name">
                  {section.sectionName}
                </span>
                <div className="detailed-profiling-mobile-tag-name">
                  {tagSection.majorTagName} - {tag.name}
                </div>
                <span className="profiling-mobile-marks-wrapper">
                  <span className="profiling-mobile-heading">Marks:-</span>

                  <div>
                    {tag?.marksObtain}/{tag?.totalMarks}
                  </div>
                  <div>
                    [ {((tag?.marksObtain / tag?.totalMarks) * 100).toFixed(2)}%
                    ]
                  </div>
                </span>
                <span className="profiling-mobile-heading profiling-heading-mg">Questions:-</span>
                <div className="profiling-question-container">
                  {tag?.questions?.map((question, index4) => (
                    <QuestionGem key={index4} question={question} />
                  ))}
                </div>
                <span className="profiling-mobile-heading profiling-heading-mg">
                  Question Attempts:-
                </span>
                <AttemptsBar tag={tag} />
                <span className="profiling-mobile-heading profiling-heading-mg">Accuracy:-</span>
                <AccuracyBar tag={tag} />
              </div>
            ))
          )
        )}
      </div>
    );
  };

  render() {
    let portlet = JSON.parse(localStorage.getItem("portlet")) || {};
    const{RenderOnPc, RenderOnMobile} = this;

    return (
      <>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            <Container fluid>
              <div
                className={`module-header-step2 ${
                  portlet?.class ? portlet?.class : "orange-card"
                }`}
              >
                <div className="">
                  <div className="back">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={this.goBack} />
                  </div>
                  <h4>Detailed Profiling {this.state.usingS3 && "*"}</h4>
                </div>
              </div>
            </Container>
            <div className="profiling-container">
              <div className="profiling-header">
                <div>
                  <span className="profiling-heading">Test Name : </span>
                  <span className="profiling-details">
                    {this.state.profilingData.testName}
                  </span>
                </div>
                <div>
                  <span className="profiling-heading">Marks Scored : </span>
                  <span className="profiling-details">
                    {`${this.state.profilingData?.summary?.marksObtained}/${this.state.profilingData?.summary?.totalMarks}`}
                  </span>
                </div>
                <button
                  className="detailed-profiling-download-test"
                  onClick={window.print}
                >
                  Download Page
                </button>
              </div>
              <div className="profiling-body-wrapper">
                <div className="profiling-legend profiling-heading">
                  <span>Legend: </span>
                  <span className="profiling-gem-width question-success profiling-question-block"></span>
                  <span className="profiling-legend-text">Correct </span>
                  <span className="profiling-gem-width question-fail profiling-question-block"></span>
                  <span className="profiling-legend-text">Wrong </span>
                  <span className="profiling-gem-width question-neutral profiling-question-block"></span>
                  <span>Unattempted </span>
                </div>
                {utils.isMobileDevice() ? (
                  <RenderOnMobile />
                ) : (
                  <RenderOnPc />
                )}
                <Modal
                  show={this.state.showSolution}
                  onHide={this.closeSolution}
                >
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
                        {this.state.solutionData?.choiceGroup1.map(
                          (choice, i) => (
                            <div key={i}>
                              <span className="solution-choice-string">
                                {choice.choiceString}
                              </span>
                              <div
                                className="solution-choice"
                                key={i}
                                dangerouslySetInnerHTML={{
                                  __html: choice.choiceValue,
                                }}
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
                                    this.state.solutionData
                                      ?.studentResponse && (
                                    <Xmark className="wrong-option" />
                                  )}
                                </>
                              )}
                            </div>
                          )
                        )}
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
                          <span>
                            {this.state.solutionData?.studentResponse}
                          </span>
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
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default DetailedProfiling;
