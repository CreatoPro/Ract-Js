import ApiService from './../_services/ApiService';

/*const messagesActions = {
    getMessages
};*/

const  getProducts = () => {
    return (dispatch) => {
        ApiService.fetchProduct()
            .then(res => {
                dispatch({
                    type : "product",
                    data : res.data
                })
            }
        );
    };
}

export default getProducts;