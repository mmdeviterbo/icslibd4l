let chai = require("chai");
let chaiHttp = require("chai-http");
const axios = require("axios");
const sinon = require("sinon");
const expect = chai.expect;
const userLogRoute = "http://localhost:3001/userLogs";
var app;
var agent;
//Assertion style
chai.use(chaiHttp);
let token;
describe("UserLogs Router API", () => {
    /**********************
     Read route
     ***********************/
    describe("READ /readUserLogs ", () => {
        it("READ all user logs", (done) => {
            axios
                .get(userLogRoute + "/readUserLogs")
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
     Delete route
     ***********************/
    describe("DELETE /deleteAllUserLogs", () => {
        it("Delete all user logs", (done) => {
            axios
                .delete(userLogRoute + "/deleteAllUserLogs")
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.have.string("All Entries Deleted");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
