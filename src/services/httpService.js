import axios from 'axios';
const httpRequests = {
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}
export default httpRequests;