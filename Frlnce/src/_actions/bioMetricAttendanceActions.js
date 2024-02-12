import ApiService from './../_services/ApiService';

const  getBiometricAttendance = () => {
    return (dispatch) => {
        ApiService.fetchBiometricAttendance()
            .then(res => {
                dispatch({
                    type : "biometricattendance",
                    data : res.data
                })
            }
        );
    };
}

export default getBiometricAttendance;