import http from "./httpService";
import { apiEndpoint } from "../config.json";

// add a resource details (sp/thesis, book)
const addSpThesis = (sptData) => {
    return http.post(`${apiEndpoint}/thesis/create`, sptData, {withCredentials: true})
}

const addBook = (bookData) => {
    return http.post(`${apiEndpoint}/books/create`, bookData, {withCredentials: true})
}

const viewFile = (fileName) => {
    return http.post(`${apiEndpoint}/thesis/download`, fileName, {withCredentials: true})
}
// read data of a resource
const browseResources = (resourceType) => {
    return http.post(`${apiEndpoint}/thesis/browse`, resourceType, {
        withCredentials: true,
    });
};

const searchSpThesis = (filter, query) => {
    return http.get(
        `${apiEndpoint}/thesis${query}`,
        { params: filter },
        { withCredentials: true }
    );
};

const searchBook = (filter) => {
    return http.get(`${apiEndpoint}/book/search`, {body:filter}, {withCredentials: true})
}

const searchByID = (urlRequest, type) => {
    return http.get(`${apiEndpoint}/thesis${urlRequest}`, {params:{type:type}}, {withCredentials: true});
}

const downloadFile = (fileType, query) => {
    return http.get(
        `${apiEndpoint}/thesis${query}`,
        { params: fileType },
        {
            withCredentials: true,
        },
        {
            responseType: "blob",
        }
    );
};

// edit data of a resource
const editSpThesis = (resourceData) => {
    return http.put(`${apiEndpoint}/thesis/update`, resourceData, {
        withCredentials: true,
    });
};

// edit book
const editBook = (resourceData) => {
    return http.put(`${apiEndpoint}/books/update`, resourceData, {
        withCredentials: true,
    });
};

//delete resource
const deleteSpThesis = (deleteId) => {
    return http.delete(`${apiEndpoint}/thesis/delete/${deleteId}`, {withCredentials: true})
}
const deleteBook = (deleteId) => {
    return http.delete(`${apiEndpoint}/books/delete/${deleteId}`, {withCredentials: true})
}

// get news from uplb news website
function getNews() {
    return http.post(`${apiEndpoint}/books/get-news`);
}

// get all books (object of images), sorted by date (latest acquisition feature)
function getBookCovers() {
    return http.get(`${apiEndpoint}/books/display_covers`);
}

function getLatestBooks() {
    return http.get(`${apiEndpoint}/books/display_latest`);
}

function getAllBooks() {
    // return http.get(`${apiEndpoint}/thesis/search?type=book&search=all`);
}

function getBookCover(resourceId) {
    return http.post(`${apiEndpoint}/books/download1`, resourceId, {
        withCredentials: true,
    });
}

// read summary report data
const generateReport = (resourceType) => {
    return http.get(`${apiEndpoint}/reports/report?type=${resourceType}`);
};

// put here your newly made functions to export, then "exportFunctions" itself will be the one to be exported
const exportFunctions = {
    getNews,
    addSpThesis,
    addBook,
    browseResources,
    searchSpThesis,
    deleteSpThesis,
    editSpThesis,
    editBook,
    searchBook,
    searchByID,
    getAllBooks,
    getLatestBooks,
    getBookCover,
    downloadFile,
    deleteBook,
    viewFile,
    getBookCovers,
    generateReport,
};

export default exportFunctions;
