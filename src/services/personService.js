import http from './httpService';
import {apiEndpoint} from '../config.json';


// login/register a person (guess, student, admin, faculty)
const loginRegisterUser=()=>{
    return http.post(apiEndpoint+'/authentication/create');
}


// read data of a person 



// edit data of a person



//delete person



export default{
    loginRegisterUser
}