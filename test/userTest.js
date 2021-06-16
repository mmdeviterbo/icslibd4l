let chai = require("chai");
let chaiHttp = require("chai-http");
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
    describe("POST /create ", () => {
        it("should Register/login user, add entry to user logs, and encrypt token", (done) => {
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
     ReadStudents route
     ***********************/
    describe("GET /readStudents ", () => {
        it("It should get all users with usertype 4(student)", () => {
            axios
                .get(userRoute + "/readStudents", {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
                .then((res) => {
                    expect(res.data).to.be.an("array");
                    expect(res.status).to.equal(200);
                    if (res.data) {
                        expect(res.data[0].userType).to.equal(4);
                    }
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
            axios
                .put(userRoute + "/update", userInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
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
     findperson route
     ***********************/
    describe("POST /findperson ", () => {
        it("finds a specific user", (done) => {
            let userInfo = {
                googleId: "test1234",
            };
            axios
                .post(userRoute + "/findperson", userInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
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
     logout route
     ***********************/
    describe("POST /logout ", () => {
        it("Logout Current User", (done) => {
            let userInfo = {
                googleId: "test1234",
            };
            axios
                .post(userRoute + "/logout", userInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.have.string("User Logged Out");
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
                .delete(userRoute + "/delete", {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    data: {
                        googleId: "test1234",
                    },
                })
                .then((res) => {
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
