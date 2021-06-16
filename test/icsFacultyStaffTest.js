let chai = require("chai");
let chaiHttp = require("chai-http");
const axios = require("axios");
const expect = chai.expect;
const icsFacultyStaffRoute = "http://localhost:3001/facultystaff";
var agent;
//Assertion style
chai.use(chaiHttp);
let token;

describe("ICS Staff and Faculty Router API", () => {
    var app;
    before(function () {
        agent = require("supertest").agent(
            require("../server/routes/icsFacultyStaffRouter")
        );
    });
    /**********************
     Read Faculty route
     ***********************/
    describe("READ /readFaculty ", () => {
        it("Get all ICS faculty account information", (done) => {
            axios
                .get(icsFacultyStaffRoute + "/readFaculty", {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
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
            // agent
            //     .get("/readFaculty")
            //     .set(
            //         "Set-Cookie",
            //         "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTYwNmQ2MDJlYWRmNjcxYjg2NDI0M2M2OWVjMTQ5ZGQ5NzhhM2QxNzEwODdlOTlmNmQwMWM2MzkyZGRjNmQxZWEifSwiaWF0IjoxNjIzODA3MTc3LCJleHAiOjE2MjM4OTM1Nzd9.-t0dzysLHpTesyoWDBJuwaBK_Sb6BDgJ-FioNq7uEwQ; Max-Age=31536000; Path=/; Expires=Thu, 16 Jun 2022 01:32:57 GMT"
            //     )
            //     .expect(200)
            //     .end(function (err, res) {
            //         if (err) return done(err);
            //         expect(res.data).to.be.an("array");
            //         expect(res.status).to.equal(200);
            //         done();
            //     });
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
        });
    });
    /**********************
     Read Staff route
     ***********************/
    describe("READ /readStaff ", () => {
        it("Get all ICS Staff account information", (done) => {
            axios
                .get(icsFacultyStaffRoute + "/readStaff", {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
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
