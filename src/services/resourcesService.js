import http from './httpService';
import {apiEndpoint} from '../config.json';







// get news from uplb news website
function getNews(){
    return http.post(`${apiEndpoint}/books/get-news`)
}





// put here your newly made functions to export, then "exportFunctions" itself will be the one to be exported
const exportFunctions = {
    getNews
}

export default exportFunctions;
