import ApiService from './../_services/ApiService';
export {
    login,
    logout,
	register,
	forgetpwd,
	resetpwd,
	changepwd
};

function login(username, password) {
    return dispatch => {
        
        ApiService.fetchLogin(username, password)
            .then(
                user => { 
                    dispatch({
                        type : "user",
                        data : user.data
                    })
                },
                error => {
                    dispatch({
                        type : "user",
                        data : error
                    })
                }
            );
    };
}

function register(data) {
    return dispatch => {
        
        ApiService.fetchRegister(data)
            .then(
                user => { 
                    dispatch({
                        type : "register",
                        data : user.data
                    })
                },
                error => {
                    dispatch({
                        type : "register",
                        data : error
                    })
                }
            );
    };
}

function forgetpwd(data) {
    return dispatch => {
        
        ApiService.fetchForgetpwd(data)
            .then(
                user => { 
                    dispatch({
                        type : "forgetpwd",
                        data : user.data
                    })
                },
                error => {
                    dispatch({
                        type : "forgetpwd",
                        data : error
                    })
                }
            );
    };
}

function resetpwd(username, newPassword, confirmPassword) {
    return dispatch => {
        
        ApiService.fetchResetpwd(username, newPassword, confirmPassword)
            .then(
                user => { 
                    dispatch({
                        type : "resetpwd",
                        data : user.data
                    })
                },
                error => {
                    dispatch({
                        type : "resetpwd",
                        data : error
                    })
                }
            );
    };
}

function changepwd(username, currentPassword, newPassword, confirmPassword) {
    return dispatch => {
        
        ApiService.fetchChangePwd(username, currentPassword, newPassword, confirmPassword)
            .then(
                user => { 
                    dispatch({
                        type : "changepwd",
                        data : user.data
                    })
                },
                error => {
                    dispatch({
                        type : "changepwd",
                        data : error
                    })
                }
            );
    };
}

function logout() {
    ApiService.logout();
}