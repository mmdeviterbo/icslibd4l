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
    before(() => {});

    describe("PUT /update", () => {
        it("should update SP/Thesis entry", (done) => {
            let updatedEntry = {
                old_sp_thesis_id: "Thesis_1fa05b5pkppbt08z",
                sp_thesis_id: "Thesis_1fa05b5pkppbt08z",
                type: "Thesis",
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
                .put(spThesisRoute + "/update", updatedEntry)
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
            let sp_thesis_id = "Thesis_1fa05b5pkppbt08z";

            axios
                .delete(spThesisRoute + "/delete/:sp_thesis_id")
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