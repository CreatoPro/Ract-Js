import ApiService from './../_services/ApiService';

export {
    getExamUpload
};

function getExamUpload(testCategoryIds,secondsActiveAfterExamSubmit) {
    return dispatch => {	  
        ApiService.fetchExams(testCategoryIds,secondsActiveAfterExamSubmit)
            .then(res => {
                dispatch({
                    type : "examupload",
                    data : res.data
                })
            }
        );
	};
}