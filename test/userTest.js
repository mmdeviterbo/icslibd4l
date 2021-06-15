let chai = require("chai");
let chaiHttp = require("chai-http");
const axios = require("axios");
const sinon = require("sinon");
const expect = chai.expect;
const userRoute = "http://localhost:3001/users";
var app;
var agent;
//Assertion style
chai.use(chaiHttp);
let token;
describe("User Router API", () => {
    /**********************
     ReadStudents route
     ***********************/
    describe("GET /readStudents ", () => {
        it("It should get all users with usertype 4(student)", () => {
            // let { auth } = require("../server/middleware/authFaculty");
            // var stub = sinon.stub(auth).callsFake((req, res, next) => next());

            // app = require("../server/routes/userRouter");
            // chai.request(app)
            //     .get("/readStudents")
            //     .set(
            //         "Set-Cookie",
            //         "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTYwNmQ2MDJlYWRmNjcxYjg2NDI0M2M2OWVjMTQ5ZGQ5NzY0ZWMyYWI0NDdhNGFlN2NjZTIxNzFmMWU3N2FhMDMifSwiaWF0IjoxNjIzNzIxMTI5LCJleHAiOjE2MjM4MDc1Mjl9.Kg0xXVOKyKWwF37amvZP_RbTONWc9cB8s_zD2uXrrJk; Max-Age=31536000; Path=/; Expires=Wed, 15 Jun 2022 01:38:49 GMT"
            //     )
            //     .then((res) => {
            //         console.log(res);
            //         // auth.restore();
            //     })
            //     .catch((err) => {
            //         throw err;
            //     });
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
     CREATE route
     ***********************/
    describe("POST /create ", () => {
        it("should Register/login user, add entry to user logs, and encrypt token", (done) => {
            let userInfo = {
                googleId: "test1234",
                email: "test1234@up.edu.ph",
                fullName: "Test1234",
            };
            // app = require("../server/routes/userRouter");
            // chai.request(app)
            //     .post("/create")
            //     .send(userInfo)
            //     .then((res) => {
            //         expect(res).to.have.cookie("token");
            //         return agent.get("/readStudents").then(function (res) {
            //             expect(res.data).to.be.an("array");
            //             expect(res).to.have.status(200);
            //             done();
            //         });
            //     });
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
});
