const chai = require("chai");
const chaiHttp = require("chai-http");
const axios = require("axios");
const expect = chai.expect;
const userRoute = "http://localhost:3001/users";

//Assertion style
chai.use(chaiHttp);
let token;
describe("User Router API", () => {
    /**********************
     CREATE route
     ***********************/
    before(() => {});

    describe("POST /create ", () => {
        it("should Register user, login user, and encrypt token", (done) => {
            let userInfo = {
                googleId: "test1234",
                email: "test1234@up.edu.ph",
                fullName: "Test1234",
            };
            axios
                .post(userRoute + "/create", userInfo, {
                    withCredentials: true,
                })
                .then((res) => {
                    token = res.data;
                    expect(res.status).to.equal(200);
                    expect(res).to.have.cookie("token");
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
                googleId: "test1234",
                newNickname: "Test Updated",
            };
            const headers = {
                headers: {
                    Cookie: `${token}`,
                },
                withCredentials: true,
            };
            axios
                .put(userRoute + "/update", userInfo, headers)
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.data[0].nickname).to.have.string("Test Updated");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    /**********************
     ReadStudents route
     ***********************/
    describe("GET /readStudents ", () => {
        it("It should get all users with usertype 4(student)", () => {
            axios
                .get(userRoute + "/readStudents")
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
    describe("DELETE /delete ", () => {
        it("Delete user information", (done) => {
            let userInfo = {
                googleId: "test1234",
            };
            axios
                .delete(userRoute + "/delete", userInfo, {
                    headers: { Cookie: token },
                    withCredentials: true,
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
    /**********************
     logout route
     ***********************/
    /**********************
     findperson route
     ***********************/
    describe("POST /findperson ", () => {
        it("finds a specific user", (done) => {
            let userInfo = {
                googleId: "test1234",
            };
            axios
                .post(userRoute + "/findperson", userInfo, {
                    withCredentials: true,
                })
                .then((res) => {
                    token = res.data;
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
