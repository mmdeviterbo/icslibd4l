let chai = require("chai");
let chaiHttp = require("chai-http");
const axios = require("axios");
const sinon = require("sinon");
const expect = chai.expect;
const adminRoute = "http://localhost:3001/admin";
var app;
var agent;
//Assertion style
chai.use(chaiHttp);
let token;
describe("Admin Router API", () => {
    /**********************
     Read Admins route
     ***********************/
    describe("READ /readAdmins ", () => {
        it("Get all admin account information", (done) => {
            axios
                .get(adminRoute + "/readAdmins")
                .then((res) => {
                    expect(res.data).to.be.an("array");
                    if (res.data) {
                        expect(res.data[0].userType).to.equal(1);
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
     Read All USers route
     ***********************/
    describe("READ /readAllUsers", () => {
        it("Get all user account information", (done) => {
            axios
                .get(adminRoute + "/readAllUsers")
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
     Update route
     ***********************/
    describe("PUT /update ", () => {
        it("update Registered user and updates token information", (done) => {
            let userInfo = {
                googleId: "testid1234",
                userType: "3",
            };
            const headers = {
                headers: {
                    Cookie: `${token}`,
                },
                withCredentials: true,
            };
            axios
                .put(adminRoute + "/updateOtherUser", userInfo, headers)
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.data[0].userType).to.equal(3);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
