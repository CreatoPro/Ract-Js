import { combineReducers } from 'redux';
import messagesReducer from './MessagesReducer';
import usersReducer from './UsersReducer';
import dashboardReducer from './DashboardReducer';
import attendanceReducer from './AttendanceReducer';
import biometricAttendanceReducer from './BiometricAttendanceReducer';
import resourceReducer from './ResourceReducer';
import productReducer from './ProductReducer';
import analysisReducer from './AnalysisReducer';
import examUploadReducer from './ExamUploadReducer';

const rootReducer = combineReducers({
  messages : messagesReducer,
  user : usersReducer,
  dashboard : dashboardReducer,
  attendance : attendanceReducer,
  biometricattendance : biometricAttendanceReducer,
  resource : resourceReducer,
  product : productReducer, 
  analysis : analysisReducer, 
  examupload : examUploadReducer, 
});

export default rootReducer;