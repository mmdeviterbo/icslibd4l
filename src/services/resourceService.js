import http from "./httpService";
import { apiEndpoint } from "../config.json";

// add a resource details (sp/thesis, book)
const addSpThesis = (formData) => {
    for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
    }
    return http.post(
        `${apiEndpoint}/thesis/create`,
        formData,
        { withCredentials: true },
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
};

const addBook = (formData) => {
    for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
    }
    return http.post(
        `${apiEndpoint}/books/create`,
        formData,
        { withCredentials: true },
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
};

// read data of a resource
const browseResources = (resourceType) => {
    console.log(resourceType);
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
    return http.get(
        `${apiEndpoint}/book/search`,
        { body: filter },
        { withCredentials: true }
    );
};

const downloadFile = (fileType, query) => {
    console.log(fileType);
    console.log(query);
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
    return http.put(`${apiEndpoint}/thesis/update-sp-thesis`, resourceData, {
        withCredentials: true,
    });
};

// edit book
const editBook = (resourceData) => {
    return http.put(`${apiEndpoint}/book/update-book`, resourceData, {
        withCredentials: true,
    });
};

// delete book
// const deleteBook = (deleteId) => {
//     return http.delete(`${apiEndpoint}/book/delete/$(deleteId)`,
//     {withCredentials: true})

// }

//delete resource
const deleteSpThesis = (deleteId) => {
    return http.delete(`${apiEndpoint}/thesis/remove-sp-thesis/${deleteId}`, {
        withCredentials: true,
    });
};

// get news from uplb news website
function getNews() {
    return http.post(`${apiEndpoint}/books/get-news`);
}

// get all books (object of information only, not images), sorted by date (latest acquisition feature)
function getBooks() {
    return http.get(`${apiEndpoint}/books/display_infos`);
}

// get all books (object of images), sorted by date (latest acquisition feature)
function getBookCovers() {
    return http.get(`${apiEndpoint}/books/display_covers`);
}

function getAllResources() {
    return http.get(`${apiEndpoint}/thesis/search`);
}

function getLatestBooks() {
    return http.get(`${apiEndpoint}/books/display_latest`);
}

function getAllBooks() {
    // return http.get(`${apiEndpoint}/thesis/search?type=book&search=all`);
}

function getSPTFiles({ title, fileType }) {
    return http.post(
        `${apiEndpoint}/thesis/download`,
        { title, fileType },
        { withCredentials: true },
        {
            responseType: "stream",
        }
    );
}

function getBookCover(resourceId) {
    console.log(resourceId);
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
    getAllBooks,
    getLatestBooks,
    getSPTFiles,
    getBookCover,
    downloadFile,
    getBookCovers,
    generateReport,
};

export default exportFunctions;
