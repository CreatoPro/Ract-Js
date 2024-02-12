import ApiService from './../_services/ApiService';

function getPortlets(){
    return (dispatch) => {
        ApiService.fetchDashboard()
            .then(res => {
                dispatch({
                    type : "dashboard",
                    data : res.data
                })
            }
        );
    };
}

export default getPortlets;