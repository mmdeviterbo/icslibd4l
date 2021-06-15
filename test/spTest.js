const chai = require("chai");
const chaiHttp = require("chai-http");
const axios = require("axios");
const expect = chai.expect;
const spRoute = "http://localhost:3001/thesis";

//Assertion style
chai.use(chaiHttp);
let sp_thesis_id;
describe("SP Thesis Router API", () => {
    /**********************
     CREATE route
     ***********************/
    before(() => {});

    describe("POST /create SP ", () => {
        it("add a SP to the database without 4 file links", (done) => {
            let spInfo = {
                "type": "Special Problem",
                "title": "Test Title",
                "abstract": "Title Abstract",
                "year": "2020",
                "keywords" : ["keywords1", "keywords2"],
                "authors": [
                    {	"fname" : "First",
                        "lname" : "Last"	
                    }
                ],
                "advisers": [
                    {	"fname" : "First",
                        "lname" : "Last"	
                    }
                ],
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    withCredentials: true,
                })
                .then((res) => {
                    sp_thesis_id = res.data.sp_thesis_id;
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("POST /create Thesis ", () => {
        it("add a Thesis to the database with 4 file links", (done) => {
            let spInfo = {
                "type": "Thesis",
                "title": "La Vie en Rose",
                "abstract": "Panorama",
                "year": "2020",
                "keywords" : ["keywords1", "keywords2"],
                "authors": [
                    {	"fname" : "Kim",
                        "lname" : "Chaewon"	
                    }
                ],
                "advisers": [
                    {	"fname" : "Miyawaki",
                        "lname" : "Sakura"	
                    }
                ],
                "source_code": "wwww",
                "manuscript": "wwww",
                "journal": "www",
                "poster": "www"
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    withCredentials: true,
                })
                .then((res) => {
                    sp_thesis_id = res.data.sp_thesis_id;
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    /**********************
     DOWNLOAD route
    ***********************/

    describe("GET /download", () => {
        it("get poster file link of a SP resource", () => {
            axios
                .get(spRoute + "/download", 
                    {query: {search: "La Vie en Rose", type: "poster"}}, 
                    {withCredentials: true,}
                )
                .then((res) => {
                    expect(res.data).to.be.an("string");
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    /**********************
     BROWSE route
    ***********************/

    describe("GET /browse", () => {
        it("get all books, alphabetically sorted", () => {
            axios
                .get(spRoute + "/browse", 
                    {query: {type: "book"}}, 
                    {withCredentials: true,}
                )
                .then((res) => {
                    expect(res.data).to.be.an("array");
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    /**********************
     SEARCH route
    ***********************/

    describe("GET /search", () => {
        it("search all sp based on query", () => {
            axios
                .get(spRoute + "/search", 
                    {query: {type: "book", search:""}}, 
                    {withCredentials: true,}
                )
                .then((res) => {
                    expect(res.data).to.be.an("array");
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("GET /search-id", () => {
        it("search database based on query", () => {
            axios
                .get(spRoute + "/search", 
                    {query: {type: "book", search:""}}, 
                    {withCredentials: true,}
                )
                .then((res) => {
                    expect(res.data).to.be.an("array");
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
