import http from './httpService';
import {apiEndpoint} from '../config.json';
import AddItem from '../components/additem/add'

// add a resource (sp/thesis, book)
const addResource = (event) => {
    event.preventDefault()
    console.log("hello")
    return http.post(apiEndpoint+'/add-sp-thesis', {
      title: 'wenkwonk',
      author: 'asdasd',
      year: 'asdasd'
    })
}
// read data of a resource



// edit data of a resource



//delete resource



export default{
    addResource
}



