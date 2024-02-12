import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import "./main.css";
import Home from "./home";
import Login from "./login/Login";
import InstituteCardDetail from "./institute-card-detail/InstituteCardDetail";
import Register from "./login/Register";
import Forgetpwd from "./login/Forgetpwd";
import Resetpwd from "./login/Resetpwd";
import Profile from "./profile/Profile";
import ChangePassword from "./profile/ChangePassword";
import Logout from "./profile/Logout";
import Dashboard from "./dashboard/Dashboard";
import { Notification } from "./notification/Notification";
import Attendance from "./attendance/Attendance";
import BiometricAttendance from "./biometric-attendance/BiometricAttendance";
import BiometricAttendanceSemester from "./biometric-attendance/BiometricAttendanceSemester";
import Product from "./product/Product";
import ProductList from "./product/ProductList";
import { ProductDetails } from "./product/ProductDetails";
import Refer from "./refer/Refer";
import ReferDetails from "./refer/ReferDetails";
import Learning from "./learning/Learning";
import LearningSteps from "./learning/LearningSteps";
import LearningStepAttachments from "./learning/LearningStepAttachments";
// import LearningStepAttachmentDetails from "./learning/LearningStepAttachmentDetails";
import LearningStepAttachmentDetailsWrapper from "./learning/learningStepAttacmentDetails.wrapper";
import LearningPDFDetails from "./learning/LearningPDFDetails";
import TestList from "./test/TestList";
import TestListDetails from "./test/TestListDetails";
import TestInstructions from "./test/TestInstructions";
import TestTaking from "./test/TestTaking";
import TestSubmit from "./test/TestSubmit";
import TestResult from "./test/TestResult";
import TestResultDetail from "./test/TestResultDetail";
import TestResultQuestion from "./test/TestResultQuestion";
import TestUploadDetails from "./test/TestUploadDetails";
import TestPDFDetails from "./test/TestPDFDetails";
import { QuizZone } from "./quiz/QuizZone";
import { QuizList } from "./quiz/QuizList";
import { QuizPlayer } from "./quiz/QuizPlayer";
import { QuizResult } from "./quiz/QuizResult";
import { LeaderBoard } from "./quiz/LeaderBoard";
import { Wallet } from "./quiz/Wallet";
import Analysis from "./analysis/Analysis";
import AnalysisList from "./analysis/AnalysisList";
import AnalysisReportDetails from "./analysis/AnalysisReportDetails";
import ExamUpload from "./exam-upload/ExamUpload";
import ExamUploadDetails from "./exam-upload/ExamUploadDetails";
import ExamPDFDetails from "./exam-upload/ExamPDFDetails";
import Resource from "./resource/Resource";
import ResourceDetails from "./resource/ResourceDetails";
import ResourcePDFDetails from "./resource/ResourcePDFDetails";
import { Payments } from "./payments/payments";
import { PaymentDetail } from "./payments/paymentDetail";
import { MakePayment } from "./payments/makePayment";
import { PaymentHistory } from "./payments/paymentHistory";
import { TimeTable } from "./timetable/TimeTable";
import { DiscussionBoard } from "./discussion/DiscussionBoard";
import { DiscussionBoardTopicList } from "./discussion/DiscussionBoardTopicList";
import { AddTopic } from "./discussion/AddTopic";
import { DiscussionBoardTopic } from "./discussion/DiscussionBoardTopic";
import TestInstructions2 from "./test-player/TestInstructions";
import TestPlayer from "./test-player/TestPlayer";
import MyPrograms from "./my-programs/MyPrograms";
import VideoPlayer from "./video-player";
import Games from "./lecode-games/Games";
import Plays from "./lecode-games/Components/Plays";
import ScratchPad from "./scratch-pad";
import PlayGround from "./play-ground/PlayGround";
import { TodayTests } from "./today-tests/TodayTests";
import { FeedbackForm } from "./feedback-form/FeedbackForm";
import XapiMain from "./xapi";
import RecommendationEngine from "./recommendation-engine/RecommendationEngine";
import { InstructorFeedback } from "./feedback-form/InstructorFeedback";
import { ExamTimeTable } from "./exam-time-table/ExamTimeTable";
import Dossier from "./dossier/dossier.component";
import { ExamList } from "./exam-time-table/ExamList";
import MentorTranscript from "./mentor-transcripts/mentor-transcripts.component";
import Discipline from "./discipline/discipline.component";
import Camera from "./camera/camera.component";
import Convocation from "./convocation/convocation.component";
import chatbot from "./chatbot/chatbot";
import MyShakaPlayer from "./shaka/shaka.component";
import StudentFeedback from "./feedback-form/studentfedback.component";
import ReceiptSeries from "./payments/receipt-series.component";
import DetailedProfiling from "./detailed-profiling/detailed-profiling.component";
import VerifyMobile from "./verify-mobile/verify-mobile.component";
import TestDetails from "./test/test-details.component";
import AdmitCard from "./admit-card/admit-card.component";
import DocumentUpload from "./document-upload/document-upload.component";

import registerEvent from "../_services/google-analytics/register-event.service";
import ApiService from "../_services/ApiService";
import Config from "../_config/config";

const Main = ({ loginRoute, homeRoute, suppressLogs }) => {
  let history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(user, "storage");

  useEffect(() => {
	const checkUserUpdate = ()=>{
		console.log("storage1");
		const newUser = JSON.parse(localStorage.getItem("user"));
		if (user?.userId === newUser?.userId) return;
		setUser(newUser);
	}
	checkUserUpdate();
  });

  const sendTrackingData = async(page)=>{
	let trackingData = {
        page
      };
      let res = await ApiService.trackPage(trackingData);
      console.log(res, "<-----res");
  }

  useEffect(()=>{
	if (suppressLogs === null || suppressLogs === true) return;
	console.log('storage2');
	sendTrackingData('login');
	// eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  useEffect(() => {
    const trackPage = async () => {
      const path = location.pathname;
      const pathArray = path.split("/");
      console.log(pathArray, "<--pathArray");
      sendTrackingData(pathArray[1]);
    };
    if (suppressLogs === null || suppressLogs === true) return;
    console.log(suppressLogs, "<---log");
    trackPage();
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suppressLogs]);

  useEffect(() => {
    // console.log(homeRoute,'<---history');
    if (loginRoute && location.pathname === "/dashboard") {
      // console.log('working');
      history.replace(homeRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeRoute, history]);
  useEffect(() => {
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    const token = params.get("token");
    if (token) return;
    // console.log(loginRoute,'<---history');
    if (loginRoute && location.pathname === "/") {
      // console.log('working');
      history.replace(loginRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginRoute]);

  const location = useLocation();
  useEffect(() => {
    registerEvent("screen_view", Config.siteTitle, location?.pathname);
  }, [location]);

  return (
    <div className="Main">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route
          path="/instituteCardDetail"
          exact
          component={InstituteCardDetail}
        />
        <Route path="/register" exact component={Register} />
        <Route path="/forgetpwd" exact component={Forgetpwd} />
        <Route path="/resetPwd" exact component={Resetpwd} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/changepassword" exact component={ChangePassword} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/notification" exact component={Notification} />
        <Route path="/Products" exact component={Product} />
        <Route path="/Products/:id/:title" exact component={ProductList} />
        <Route path="/ProductDetails" exact component={ProductDetails} />
        <Route path="/refer" exact component={Refer} />
        <Route path="/refer/details" exact component={ReferDetails} />
        <Route path="/quizZone" exact component={QuizZone} />
        <Route path="/quizList" exact component={QuizList} />
        <Route path="/quizPlayer" exact component={QuizPlayer} />
        <Route path="/quizResult" exact component={QuizResult} />
        <Route path="/leaderboard" exact component={LeaderBoard} />
        <Route path="/wallet" exact component={Wallet} />
        <Route
          path="/instructorFeedback"
          exact
          component={InstructorFeedback}
        />
        <Route
          path="/studyResource/:typeId/:subTypeId/:type"
          exact
          component={Resource}
        />
        <Route
          path="/studyResource/:typeId/:subTypeId/details/:id"
          exact
          component={ResourceDetails}
        />
        <Route
          path="/studyResource/:typeId/:subTypeId/pdf/:id"
          exact
          component={ResourcePDFDetails}
        />
        <Route path="/attendanceSummary" exact component={Attendance} />
        <Route
          path="/bioMetricAttendance"
          exact
          component={BiometricAttendance}
        />
        <Route
          path="/bioMetricAttendance/semester"
          exact
          component={BiometricAttendanceSemester}
        />
        <Route
          path="/lessonPlan/:typeId/:subTypeId/:title"
          exact
          component={Learning}
        />
        <Route
          path="/lesson/steps/:id/:title"
          exact
          component={LearningSteps}
        />
        <Route
          path="/lesson/steps/attachments/:id/:title"
          exact
          component={LearningStepAttachments}
        />
        <Route
          path="/lesson/steps/attachments/:id/details/:resourceId"
          exact
          component={LearningStepAttachmentDetailsWrapper}
        />
        {/* <Route path="/lesson/steps/attachments/:id/details/:resourceId" exact component={LearningStepAttachmentDetails} /> */}
        <Route
          path="/lesson/steps/attachments/pdf/:id/details/:resourceId"
          exact
          component={LearningPDFDetails}
        />
        <Route path="/TestList" exact component={TestList} />
        <Route path="/TestList/:id" exact component={TestListDetails} />
        <Route
          path="/test-instructions/:pid/:id"
          exact
          component={TestInstructions}
        />
        <Route path="/test-taking/:pid/:id" component={TestTaking} />
        <Route path="/test-submit/:pid/:id" component={TestSubmit} />
        <Route path="/test-result/:pid/:id" component={TestResult} />
        <Route path="/detailed-profiling/:id" component={DetailedProfiling} />
        <Route path="/test-result-detail/:id" component={TestResultDetail} />
        <Route
          path="/test-result-question-wise/:id"
          component={TestResultQuestion}
        />
        <Route path="/testPerformance" component={Analysis} />
        <Route path="/test/list" component={AnalysisList} />
        <Route path="/test/reports/:id" component={AnalysisReportDetails} />
        <Route path="/test/upload/:id" component={TestUploadDetails} />
        <Route path="/test/pdfview/:id" component={TestPDFDetails} />
        <Route path="/examUpload" component={ExamUpload} />
        <Route path="/exam/upload/:id" component={ExamUploadDetails} />
        <Route path="/exam/pdfview/:id" component={ExamPDFDetails} />
        <Route path="/payment" component={Payments} />
        <Route path="/paymentReceipts" component={ReceiptSeries} />
        <Route path="/paymentDetail" component={PaymentDetail} />
        <Route path="/makePayment" component={MakePayment} />
        <Route path="/paymentHistory" component={PaymentHistory} />
        <Route path="/timetable" component={TimeTable} />
        <Route
          path="/discussionBoard/:id/topics"
          exact
          component={DiscussionBoardTopicList}
        />
        <Route
          path="/discussionBoard/:id/topic/create"
          exact
          component={AddTopic}
        />
        <Route
          path="/discussionBoard/:discussionBoardId/topic/:topicId/comments"
          exact
          component={DiscussionBoardTopic}
        />
        <Route
          path="/discussion/question/:questionId"
          exact
          component={DiscussionBoardTopic}
        />
        <Route
          path="/discussion/resource/:resourceId"
          exact
          component={DiscussionBoardTopic}
        />
        <Route path="/discussionBoard" exact component={DiscussionBoard} />
        <Route
          path="/TestInstructions/:id"
          exact
          component={TestInstructions2}
        />
        <Route path="/TestPlayer/:id" exact component={TestPlayer} />
        <Route path="/MyPrograms" exact component={MyPrograms} />
        <Route path="/videoplayer" exact component={VideoPlayer} />
        <Route path="/gamePlaysInvitations" exact component={Games} />
        <Route path="/gamePlaysAll" exact component={Plays} />
        <Route path="/gamePlaysCompleted" exact component={Games} />
        <Route path="/gamePlaysOpen" exact component={Games} />
        <Route path="/gamePlaysUpcoming" exact component={Games} />
        <Route path="/gamePlaysRegistration" exact component={Games} />
        <Route path="/scratchpad" exact component={ScratchPad} />
        <Route path="/PlayGround" exact component={PlayGround} />
        <Route path="/todayTests" exact component={TodayTests} />
        <Route path="/feedback/form/:id" exact component={FeedbackForm} />
        <Route
          path="/feedback/form/:id/instructor/:instructorId/course/:courseId"
          exact
          component={FeedbackForm}
        />
        <Route
          path="/studentfeedback/form/:id"
          exact
          component={StudentFeedback}
        />
        <Route path="/xapi/v1" exact component={XapiMain} />
        <Route
          path="/recommendation-engine"
          exact
          component={RecommendationEngine}
        />
        <Route path="/examtimetable" component={ExamTimeTable} />
        <Route path="/dossier" component={Dossier} />
        <Route path="/examlist" component={ExamList} />
        <Route path="/mentortranscripts" component={MentorTranscript} />
        <Route path="/discipline" component={Discipline} />
        <Route path="/camera" component={Camera} />
        <Route path="/convocation" component={Convocation} />
        <Route path="/chatbot" component={chatbot} />
        <Route path="/shaka" exact component={MyShakaPlayer} />
        <Route path="/loginwithmobile" exact component={VerifyMobile} />
        <Route path="/testdetails" exact component={TestDetails} />
        <Route path="/admitcard" exact component={AdmitCard} />
        <Route path="/documentUpload" exact component={DocumentUpload} />
      </Switch>
    </div>
  );
};

export default Main;
