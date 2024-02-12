import ApiService from './../_services/ApiService';

const  getAttendance = () => {
    return (dispatch) => {
        ApiService.fetchAttendance()
            .then(res => {
                dispatch({
                    type : "attendance",
                    data : res.data
                })
            }
        );
    };
}

export default getAttendance;