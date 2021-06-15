let chai = require("chai");
let chaiHttp = require("chai-http");
const axios = require("axios");
const sinon = require("sinon");
const expect = chai.expect;
const icsFacultyStaffRoute = "http://localhost:3001/facultystaff";
var app;
var agent;
//Assertion style
chai.use(chaiHttp);
let token;

describe("ICS Staff and Faculty Router API", () => {
    /**********************
     Read Faculty route
     ***********************/
    describe("READ /readFaculty ", () => {
        it("Get all ICS faculty account information", (done) => {
            axios
                .get(icsFacultyStaffRoute + "/readFaculty")
                .then((res) => {
                    expect(res.data).to.be.an("array");
                    if (res.data.length) {
                        expect(res.data[0].userType).to.equal(2);
                    }
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
    /**********************
     Read Staff route
     ***********************/
    describe("READ /readStaff ", () => {
        it("Get all ICS Staff account information", (done) => {
            axios
                .get(icsFacultyStaffRoute + "/readStaff")
                .then((res) => {
                    expect(res.data).to.be.an("array");
                    if (res.data) {
                        expect(res.data[0].userType).to.equal(3);
                    }
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
