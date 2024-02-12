import React, { Component } from 'react';
import axios from 'axios'
import myAxios from './axiosilearnWrapper'
import Config from '../_config/config'
import UserService from './UserService'

class ApiService extends Component {

    fetchHome() {		
        return axios.get(Config.apiUrl + 'init/institute/home');
    }

    getActiveTheme() {
        return axios.get(Config.apiUrl + 'init/theme');
    }

    getData(url){
        return axios.get(url,{
            "access-control-allow-origin" : "*"
        })
    }
    getDeviceId() {
        let deviceId = localStorage.getItem('ilearn-pwa-deviceId');
        if(!deviceId) {
            console.log("DeviceId Not found generating new");
            let sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
            deviceId = "PWA-"+sixdigitsrandom;
            localStorage.setItem('ilearn-pwa-deviceId', deviceId);
        }
        return deviceId;
    }

    generateEndPoint(postJSON) {
        let url = Config.apiUrl+'student/generate/push/endpoint';
        console.log(url);     
        return axios.post(url, postJSON);
    }

    fetchLogin(username, password) {
        var dataString = {
            "userName":username,
            "password":password,
            "deviceId": this.getDeviceId()
          };
        return axios.post(Config.baseUrl + 'authenticate/user',dataString,{
             "access-control-allow-origin" : "*"
        });
    }

    fetchLoginToken(token) {
        var dataString = {
            "token":token,
            "deviceId": this.getDeviceId()
          };
        return axios.post(Config.baseUrl + 'authenticate/user',dataString,{
            "access-control-allow-origin" : "*"
        });
    }

    verifyOTP(userId, otp) {
        var dataString = {
            "userId": userId,
            "otp": otp,
            "deviceId": this.getDeviceId()
          };
        return axios.post(Config.baseUrl + 'verify/otp',dataString);    
    }

    openIdLogin(credentials) {
        let url =  Config.siteUrl +"rest/mobile/authenticate/user/openid";
        console.log(url); 
        return axios.post(url, credentials) ;
    } 

    fetchRegisterList() {
        return axios.get(Config.siteUrl + 'api/common/quickEnquiry/form/3');
    }

    fetchRegister(data) {
        var dataString = data;
		//console.log("Register JSON : "+JSON.stringify(dataString));
        console.log(Config.siteUrl + 'api/common/quickEnquiry/save/3');
        console.log(data);
        return axios.post(Config.siteUrl + 'api/common/quickEnquiry/save/3',dataString);
    }

    fetchForgetpwd(username) {
        var dataString = {
            "userName":username,
          };
        return axios.post(Config.apiUrl + 'password/recover',dataString);
    }
	
	fetchResetpwd(username, newPassword, confirmPassword) {
        var dataString = {
            "userName":username,
            "newPassword":newPassword,
            "confirmPassword":confirmPassword
          };
        return axios.post(Config.apiUrl + 'password/reset',dataString);
    }

    fetchChangePwd(username, currentPassword, newPassword, confirmPassword) {
        var dataString = {
            "userName":username,
            "currentPassword":currentPassword,
            "newPassword":newPassword,
            "confirmPassword":confirmPassword
          };
        return axios.post(Config.apiUrl + 'password/edit',dataString);
    }

    fetchDashboard() {
		var d = new Date();
        var rand = d.getTime();
        var enquiryId = localStorage.getItem('enquiryId');
        var url = Config.apiUrl + 'init/' + enquiryId + '/123456?var='+rand;
        console.log(url);
        return axios.get(url);
    }

    fetchTestList(url){
        var enquiryId = localStorage.getItem('enquiryId');
        const fetchUrl = url || Config.apiUrl + 'student/' + enquiryId + '/tests/category/0'
        return axios.get(fetchUrl);
    }
    
    fetchTest(testid) {
		var enquiryId = localStorage.getItem('enquiryId');
		var dataString = {
            "deviceId":this.getDeviceId(),
            "enquiryId":enquiryId,
            "testId":testid
         };
        return axios.post(Config.apiUrl + 'test/download/init',dataString);
        //return axios.get(Config.testJSON + testid + '/' + testid +'.json');
    }
	
	testisActive(testid) {
        return axios.get(Config.siteUrl + 'api/tm/' + testid + '/isActive');
        //return axios.get(Config.testJSON + testid + '/' + testid +'.json');
    }
	
	fetchTestJson(url) {
		var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(url);
    }

    endExam(json_data) {
        return axios.post(Config.apiUrl + 'test/submit',json_data);
    }

    fetchTestPaperUploadStatus(testid) {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.siteUrl + 'api/common/student/'+ enquiryId + '/test/' + testid + '/view/dvs/paper');
    }

    fetchTestResult(testid) {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.baseUrl + 'analysis/' + testid + '/' + enquiryId);
    }

    getTestCategoryWiseTestList(testCategoryId) {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.apiUrl + 'student/' + enquiryId + '/tests/category/'+ testCategoryId);
    }

    getOnlineTestData(testId) {
        var enquiryId = localStorage.getItem('enquiryId');
        var enrollmentId = 0;//localStorage.getItem('enrollmentId');
        var url = Config.apiUrl+'student/'+enquiryId+'/enrollment/'+enrollmentId+'/test/'+testId;
        console.log(url);
        return axios.get(url);
    }

    submitTestData(testData) {
        var url = Config.apiUrl+'student/test/submit';
        console.log(url);
        return axios.post(url,testData);
    }

    syncTime(testData) {
        var url = Config.apiUrl+'student/test/sync/time';
        console.log(url);
        return axios.post(url,testData);
    }

    checkServer(enquiryId) {
        var url = Config.apiUrl+'student/'+enquiryId+'/test/server/status';
        console.log(url);
        return axios.get(url);
    }

    getTestAnalysis(testId) {
        var enquiryId = localStorage.getItem('enquiryId');
        var url = Config.apiUrl+'student/'+enquiryId+'/test/'+testId+'/analysis';
        console.log(url);
        return axios.get(url);
    }

    getQuizLeaderBoard() {
        var enquiryId = localStorage.getItem('enquiryId');
        var url = Config.siteUrl+'api/mobile/leaderboard/'+enquiryId;
        console.log(url);
        return axios.get(url);
    }

    getWalletTransactions(pageNumber) {
        var enquiryId = localStorage.getItem('enquiryId');
        var url = Config.siteUrl+'api/mobile/student/'+enquiryId+'/wallet/transactions/page/'+pageNumber;
        console.log(url);
        return axios.get(url);
    }

    fetchLearning(rid, rsid) {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.apiUrl + 'study/resource/type/' + rid + '/subtype/' + rsid + '/page/0/enquiry/'+ enquiryId);
    }

    fetchLearningSteps(learnId) {
        return axios.get(Config.apiUrl + 'lessonplan/' + learnId + '/steps');
    }

    fetchLearningStepsDesktop(learnId) {
        return axios.get(Config.desktopApi + 'studyresources/lp/' + learnId);
    }

    fetchLearningStepAttachments(learnId) {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.apiUrl + 'lessonplan/step/'  + learnId + '/attachments/enquiry/'+ enquiryId);
    }
	
	fetchResources(rid, rsid) {
        var enquiryId = localStorage.getItem('enquiryId');
        let ran = Math.floor(100000 + Math.random() * 900000);
        let url = Config.apiUrl + 'study/resource/type/' + rid + '/subtype/' + rsid + '/page/0/enquiry/'+ enquiryId + '?var='+ ran;
        console.log(url);
        return axios.get(url) ;
    }

    fetchAttendance() {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.apiUrl + 'attendance/summary/student/'+ enquiryId) ;
    }
	
	fetchBiometricAttendance() {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.apiUrl + 'biometric/attendance/student/'+ enquiryId + '/source/2') ;
    }
	
	fetchProduct() {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.siteUrl + 'api/common/student/'+ enquiryId +'/products') ;
    }

    getProduct(productId) {
        return axios.get(Config.siteUrl + 'api/common/product/'+productId) ;
    }

    preOrderProduct(productId) {
        let enquiryId = localStorage.getItem('enquiryId');
        let url = Config.siteUrl +'rest/mobile/ilearn/student/'+ enquiryId +'/product/'+productId+'/pre/order';
        console.log(url); 
        return axios.get(url) ;
    }    

    fetchReferrals() {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.apiUrl + 'student/'+ enquiryId + '/referrals') ;
    }

    fetchRefer(data) {
        var dataString = data;
        return axios.post(Config.apiUrl + 'student/refer',dataString);
    }
	
	fetchCountries() {
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.apiUrl + 'countries/') ;
    }
	
	fetchAnalysis() {
		var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.baseUrl + 'analysis/tests/'+ enquiryId);
    }

    getNotificationMessages() {
        var enquiryId = localStorage.getItem('enquiryId');
        let url = Config.siteUrl +'rest/mobile/ilearn/student/'+ enquiryId +'/notification/messages';
        console.log(url); 
        return axios.get(url) ;
    }

    getPayments() {
        var enquiryId = localStorage.getItem('enquiryId');
        let url =  Config.siteUrl +"rest/mobile/payments/"+enquiryId;
        console.log(url); 
        return axios.get(url) ;
    }  

    // getPaymentDetails(enrollmentId) {
    //     let url = Config.siteUrl +"rest/mobile/payments/enrollment/"+enrollmentId;
    //     console.log(url);     
    //     return axios.get(url);  
    // }
    getPaymentDetails(enrollmentId,receiptSeriesId){
        const url = `${Config.siteUrl}api/common/paymentinfo/enrollment/${enrollmentId}/receiptseriesid/${receiptSeriesId}`;
        return axios.get(url);
    }

    getReceiptSeries(enrollmentId){
        const url = `${Config.siteUrl}api/common/receiptseries?enrollmentId=${enrollmentId}`;
        return axios.get(url);
    }

    getPaymentHistory(enrollmentId){
        let url = Config.siteUrl +"rest/mobile/payments/history/"+enrollmentId;
        console.log(url);     
        return axios.get(url);
    }

    getTimeTables(data) {
        return axios.post(Config.siteUrl + 'api/common/timetable/student', data);
    }

    getRecordedVideos(data) {
        return axios.post(Config.siteUrl + 'api/common/timetable/student/viewVideos', data);
    }

    uploadFile(formData,testId){
        var enquiryId = localStorage.getItem('enquiryId');
        return axios.post(Config.siteUrl+'api/common/student/'+enquiryId+'/test/'+testId+'/upload/dvs/paper', formData);
    }

    fetchExams(testCategoryIds,secondsActiveAfterExamSubmit) {
		var enquiryId = localStorage.getItem('enquiryId');
        return axios.get(Config.siteUrl + 'api/tm/lists/category/'+ testCategoryIds +'/enquiry/'+ enquiryId +'/since/'+secondsActiveAfterExamSubmit);
    }

    getDiscussionBoards() {
        let url = Config.siteUrl +'rest/topics/discussionboards/mobile/user/'+UserService.getUserId();
        console.log(url);     
        return axios.get(url);
    }

    getDiscussionBoardTopics(discussionBoardId) {
        let url = Config.siteUrl +'rest/topics/discussionboards/'+UserService.getUserId()+'/'+discussionBoardId
        console.log(url);     
        return axios.get(url);
    }

    getDiscussionBoardTopic(topicId) {
        let url = Config.siteUrl +'rest/topics/mobile/topic/'+UserService.getUserId()+'/'+topicId
        console.log(url);     
        return axios.get(url);
    }

    getDiscussionBoardQuestionTopic(questionId) {
        let url = Config.siteUrl +'rest/topics/mobile/topic/question/'+questionId+'/user/'+UserService.getUserId()
        console.log(url);     
        return axios.get(url);
    }

    getDiscussionBoardResourceTopic(resourceId) {
        let url = Config.siteUrl +'rest/topics/mobile/topic/resource/'+resourceId+'/user/'+UserService.getUserId()
        console.log(url);     
        return axios.get(url);
    }

    addTopic(topic) {
        let url = Config.siteUrl +"rest/topics/mobile/add";
        console.log(url);  
        return axios.post(url,topic);
    }

    createComment(comment) {
        let url = Config.siteUrl+'rest/topics/comment';
        console.log(url);   
        return axios.post(url, comment);
    }
      
    replyComment(comment) {
        let url = Config.siteUrl+'rest/topics/reply';
        console.log(url);   
        return axios.post(url, comment);
    }

    deleteCommentOrReply(data) {
        let url = Config.siteUrl+'rest/topics/delete';
        console.log(url);   
        return axios.post(url, data);
    }

    submitTest(testId,userId){
        return axios.post(Config.siteUrl + 'api/tm/'+testId+'/user/'+userId+'/submitAndPopulate');
    }

    checkTestStatus(testId) {
        var enquiryId = localStorage.getItem('enquiryId');
        let url = Config.desktopApi +'tm/'+testId+'/enquiry/'+enquiryId+'/status';
        return axios.get(url);
    }

    resumeStudyResourcesLearningActivity(Id) {
        let user = JSON.parse(localStorage.getItem('user')) || [];
        let url = Config.desktopApi +'studyresources/learningactivity/'+Id+'/track/last?token='+ user.token;
        return axios.get(url);
    }

    trackStudyResourcesLearningActivity(Id,data) {
        let user = JSON.parse(localStorage.getItem('user')) || [];
        let url = Config.desktopApi +'studyresources/learningactivity/'+Id+'/track?token='+ user.token;
        return axios.post(url, data);
    }

    saveStudyResourcesNotes(data, type) {
        let url = Config.desktopApi +'studyresources/'+data.resourceId+'/'+type+'/save';
        return axios.post(url, data);
    }

    loadStudyResourcesNotes(resourceId, type) {
        let user = JSON.parse(localStorage.getItem('user')) || [];
        let url = Config.desktopApi +'studyresources/'+resourceId+'/user/'+UserService.getUserId()+'/'+type;
        return axios.get(url);
    }

    fetchStudyResourcesNotes(id) {
        let user = JSON.parse(localStorage.getItem('user')) || [];
        let url = Config.desktopApi + 'studyresources/lp/'+id+'/user/'+UserService.getUserId()+'/notes';
        return axios.get(url);
    }

    studentPayCheck(data) {
        let user = JSON.parse(localStorage.getItem('user')) || [];
        let url = Config.siteUrl +'api/common/student/access/paycheck?token='+ user.token;
        return axios.post(url, data);
    }

    studentTickerMessages() {
        let user = JSON.parse(localStorage.getItem('user')) || [];
        let url = Config.desktopApi +'common/student/ticker/messages?token='+ user.token;
        return axios.post(url);
    }

    initTestTaking(testId) {
        let url = Config.desktopApi + 'tm/'+testId+'/user/'+UserService.getUserId()+'/initTestTaking';
        var ip = require("ip");
        let data = {
            "userAgent":navigator.userAgent,
            "webCam": false,
            "ipAddress": ip.address(),
        }
        return axios.post(url, data);
    }

    fetchTodayTests(todayTestsConfig) {
        let enquiryId = localStorage.getItem('enquiryId');
        let url = Config.siteUrl +'rest/mobile/ilearn/student/'+ enquiryId +'/today/tests';
        console.log(url); 
        return axios.post(url, todayTestsConfig) ;    
    }

    getFeedbackForm(formId, testId, employeeId, courseId, applicationUserId) {
        
        let enquiryId = localStorage.getItem('enquiryId');
        let userId = applicationUserId || 0
        let url = Config.siteUrl + "api/studyresources/feedback/form/"+formId+"/enquiry/"+enquiryId+"/test/"+testId+"/instructor/"+employeeId+"/course/"+courseId+"?applicableToUserId="+userId;        
        console.log(url);
        return axios.get(url);
    }

    saveFeedbackForm(feedbackFormBean, testId) {
        let enquiryId = localStorage.getItem('enquiryId');
        let url = Config.siteUrl + "api/studyresources/feedback/form/save/"+enquiryId+"/test/"+testId;
        console.log(url);     
        return axios.post(url, feedbackFormBean); 
    }

    getInstructorFeedbackForms() {
        let enquiryId = localStorage.getItem('enquiryId');
        let url = Config.apiUrl + "instructor/feedback/enquiry/"+enquiryId;
        console.log(url);
        return axios.get(url);
    }

    studentLevelPasswordCheck(testId, password) {
        let enquiryId = localStorage.getItem('enquiryId');
        var dataString = {
            "testId":testId,
            "enquiryId":enquiryId,
            "password":password,
          };
        return axios.post(Config.desktopApi + 'common/test/password/check/studentLevel',dataString);
    }

    examTimetable(id) {
        return myAxios.get(Config.desktopApi +"common/timetable/"+id);
    }

    examList() {
        return myAxios.post(Config.desktopApi +"common/program/student/timetables");
    }
    dossierSection(){
        let enquiryId = UserService.getEnquiryId();
        return myAxios.get(Config.siteUrl + "api/common/gradecard/enquiry/"+enquiryId);
    }

    mentorTranscripts(){
        let enquiryId = UserService.getEnquiryId();
        return myAxios.get(Config.siteUrl + "api/common/mentees/studentdetails/"+enquiryId);
    }
    discipline(){
        let enquiryId = UserService.getEnquiryId();
        return myAxios.get(Config.siteUrl + "api/common/discipline/studentdetails/"+enquiryId);
    }

    convocationDetails(){
        let enquiryId = UserService.getEnquiryId();
        let url = Config.siteUrl + "api/common/convocation/student/details?enquiryId="+enquiryId;
        return myAxios.get(url);
    }

    submitConvocationDetails(data){
        let url = Config.siteUrl + "api/common/convocation/studentAttestation";
        return myAxios.post(url, data);
    }

    convocationStudentRegistration(data){
        let url = Config.siteUrl + "api/common/convocation/studentRegistration";
        return myAxios.post(url,data);
    }

    questionWiseAnalysis(testid){
        let enquiryId = UserService.getEnquiryId();
        let url = Config.baseUrl + 'questionwiseanalysis/' + testid + '/' + enquiryId;
        return myAxios.get(url);
    }

    viewSolution(testId,currentIndex,attemptId){
        let enquiryId = UserService.getEnquiryId();
        let url = Config.baseUrl + 'viewsolution/test/' +testId+ '/enquiry/'+ enquiryId +'/enrollment/0/currentIndex/' +currentIndex+ '/attempt/'+attemptId;
        console.log(url);
        return myAxios.get(url);
    }

    
    getTopRankers(testId){
        let url = `${Config.siteUrl}api/common/test/${testId}/toprankers`;
        // https://triangles.studentdetails.com/api/common/test/250/toprankers
        return myAxios.get(url);
    }

    getStudentEnrollements(){
        const enquiryId = UserService.getEnquiryId();
        const url = `${Config.siteUrl}api/common/student/information?enquiryId=${enquiryId}`;
        return myAxios.get(url);
    }

    verifyMobile(mobile){
        // const url = `${Config.siteUrl}api/mobile/user/otp/channel/mobile/identifier/${mobile}`;
        const url = `https://4lkooqi5fbwptop7hgsas5hdnu0wyrig.lambda-url.ap-southeast-1.on.aws/?mobileNumber=91${mobile}&action=sendOTP&tenant=${Config.siteTitle}`;

        console.log(url)
        // http://triangles.edusquares.com/api/mobile/user/otp/channel/mobile/identifier/8168224633
        return axios.get(url);
    }
    
    loginWithOtp(mobile,otp){
        // const url = `${Config.siteUrl}api/mobile/user/otp/verify`;
        // http://triangles.edusquares.com/api/mobile/user/otp/verify
        // return axios.post(url,payload);
        const url = `https://4lkooqi5fbwptop7hgsas5hdnu0wyrig.lambda-url.ap-southeast-1.on.aws/?mobileNumber=91${mobile}&action=verifyOTP&otp=${otp}&tenant=${Config.siteTitle}`;
        console.log(url);
        return axios.get(url);
    }

    fetchTestDetails(){
        const url = `${Config.siteUrl}${Config.siteTitle}/rest/mobile/user/admission/testdetails`;
        // https://unsat.edusquares.com/unsat/rest/mobile/user/admission/testdetails
        return myAxios.get(url)
    }

    fetchGoogleAnalytics(){
        const url = `https://tuningfork-live.s3.ap-southeast-1.amazonaws.com/${Config.siteTitle}/files/app-properties.json`;
        console.log(url);
        return axios.get(url);
    }
    
    resendTextOtp = (mobile)=>{
        const url = `https://4lkooqi5fbwptop7hgsas5hdnu0wyrig.lambda-url.ap-southeast-1.on.aws/?mobileNumber=91${mobile}&action=retryText&tenant=${Config.siteTitle}`;
        console.log(url);
        return axios.get(url);
    }
    
    resendCallOtp = (mobile)=>{
        const url = `https://4lkooqi5fbwptop7hgsas5hdnu0wyrig.lambda-url.ap-southeast-1.on.aws/?mobileNumber=91${mobile}&action=retryVoice&tenant=${Config.siteTitle}`;
        console.log(url);
        return axios.get(url);

    }

    testResumes = (body)=>{
        const url = `https://5or2in4w2avvenkbbm2fpetjle0fijue.lambda-url.ap-southeast-1.on.aws/`;
        console.log(url);
        return fetch(url,{
				method:'POST',
				body
			})
    }

    testResponses = (body)=>{
        const url = `https://soaz3ulallctn6szdu3wwmgmaa0lkepj.lambda-url.ap-southeast-1.on.aws/`;
        console.log(url);
        return fetch(url,{
            method:'POST',
            body
        })
    }

    testResultsUrls = (mobileNumber)=>{
        const url = `${Config.siteUrl}api/mobile/user/admission/testresults?mobileNumber=${mobileNumber}`;
        console.log(url);
        return axios.get(url);
    }

    fetchGetUrl = (url)=>{
        console.log(url);
        return axios.get(url);
    }

    updateProctoredProfile=(body)=>{
        const url = `https://yazgub22cf6v3ry2cms3gvkhra0xmevx.lambda-url.ap-southeast-1.on.aws/`;
        console.log(url);
        return fetch(url,{
            method:'POST',
            body
        });
    }

    uploadDocument = (body)=>{
        const enquiryId = UserService.getEnquiryId();
        const url = `${Config.siteUrl}api/mobile/ilearn/enquiry/${enquiryId}/document/upload`;
        console.log(url);
        return myAxios.post(url,body);
    }

    trackPage(data){
        let url = `${Config.siteUrl}api/common/log/page`;
        console.log(url);
        return myAxios.post(url,data);
    }

    uploadDoucment = (body,testId,questionId)=>{
        const userId = UserService.getUserId();
        const url = `${Config.siteUrl}api/common/student/${userId}/test/${testId}/question/${questionId}/upload`;
        console.log(url);
        return myAxios.post(url,body);
    }

}

export default new ApiService();