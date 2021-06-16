const chai = require("chai");
const chaiHttp = require("chai-http");
const axios = require("axios");
const expect = chai.expect;
const spThesisRoute = "http://localhost:3001/thesis";

chai.use(chaiHttp);

describe("Sp/Thesis Router API", ()=> {

    /************************
    UPDATE Route
    *************************/
    describe("PUT /update", () => {
        it("should update SP/Thesis entry", (done) => {
            let updatedEntry = {
                old_sp_thesis_id: "SP_79fcracowkpzl7pi1",
                sp_thesis_id: "SP_79fcracowkpzl7pi1",
                type: "Special Problem",
                title: "SPT test case",
                abstract: "abstract",
                year: 1999,
                source_code: "example.com",
                manuscript: "example.com",
                poster: "example.com",
                journal: "example.com",
                authors: [{ 
                    "fname" : "Alex", "lname" : "Gaskarth" }, { "fname" : "Ted", "lname": "Bundy"}],
                advisers: [{ 
                    "fname" : "Jack", "lname" : "Barackat"}, { "fname" : "Zack", "lname" : "Merrick"}],
                keywords: [{ 
                    "sp_thesis_keyword" : "pop punk"}, {"sp_thesis_keyword" : "alternative"}]
            };
            axios
                .put(spThesisRoute + "/update", updatedEntry, {
                    withCredentials: true,
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.have.string("Entry Updated");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    /**********************
    DELETE Route
    *********************/    
    describe("DELETE /delete/:sp_thesis_id", () => {
        it("Delete SP/Thesis Entry", (done) => {
            let sp_thesis_info = {
                "sp_thesis_id": "SP_79fcracowkpzl7pi1",
            };
        
            axios
                .delete(spThesisRoute + "/delete/" + sp_thesis_info.sp_thesis_id, {
                    withCredentials: true,
                    headers: {
                        data: sp_thesis_info,
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.have.string("Entry Deleted");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});