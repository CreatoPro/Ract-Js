import ApiService from './../_services/ApiService';

export {
    getAnalysis
};

function getAnalysis() {
    return dispatch => {	  
        ApiService.fetchAnalysis()
            .then(res => {
                dispatch({
                    type : "analysis",
                    data : res.data.data
                })
            }
        );
	};
}