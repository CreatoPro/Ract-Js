import ApiService from './../_services/ApiService';

export {
    getResource
};

function getResource(rid, rsid) {
    return dispatch => {	  
        ApiService.fetchResources(rid, rsid)
            .then(res => {
                dispatch({
                    type : "resource",
                    data : res.data
                })
            }
        );
	};
}