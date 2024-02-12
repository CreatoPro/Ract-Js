class UserService {
    getUserId() {
        if(localStorage['user']){
            let user = JSON.parse(localStorage['user']);
            return user.userId;
        }
    }

    getEnquiryId() {
       // let enquiryId = localStorage.getItem('enquiryId');
        let user = JSON.parse(localStorage['user']);
        return user.enquiryId;
    }

    getToken() {
        // let enquiryId = localStorage.getItem('enquiryId');
         let user = JSON.parse(localStorage['user']);
         return user.token;
     }
}

export default new UserService();