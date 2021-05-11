import http from './httpService';
import {apiEndpoint} from '../config.json';

// add a resource details (sp/thesis, book)
const addResource = (resourceData) => {
    console.log("hello")
    return http.post(apiEndpoint+'/thesis/create', resourceData)
}

const addAuthor = (authorFullName) => {
  console.log("hello, " + authorFullName.author_fname)
  return http.post(apiEndpoint+'/thesis-author/create', authorFullName)
}

const addAdviser = (adviserFullName) => {
  console.log("hello, " + adviserFullName.adviser_fname)
  return http.post(apiEndpoint+'/thesis-adviser/create', adviserFullName)
}

const addKeyword = (resourceKeyword) => {
  console.log(resourceKeyword)
  return http.post(apiEndpoint+'/thesis-key/create', resourceKeyword)
}

// read data of a resource



// edit data of a resource



//delete resource



export default {
    addResource,
    addAuthor,
    addAdviser,
    addKeyword
}



