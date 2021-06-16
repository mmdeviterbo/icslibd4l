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
                "title": "Test Title1",
                "abstract": "Title Abstract1",
                "year": 2020,
                "keywords" : ["keywords01", "keywords02"],
                "authors": [
                    {	"fname" : "First1",
                        "lname" : "Last1"	
                    }
                ],
                "advisers": [
                    {	"fname" : "First1",
                        "lname" : "Last1"	
                    }
                ],
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
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
                "title": "Test Title2",
                "abstract": "Title Abstract2",
                "year": 2020,
                "keywords" : ["keywords11", "keywords12"],
                "authors": [
                    {	"fname" : "First2",
                        "lname" : "Last2"	
                    }
                ],
                "advisers": [
                    {	"fname" : "First2",
                        "lname" : "Last2"	
                    }
                ],
                "source_code": "www",
                "manuscript": "www",
                "journal": "www",
                "poster": "www"
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
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
