import axios from 'axios';
const exportFunctions = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default exportFunctions;