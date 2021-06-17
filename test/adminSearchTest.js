const chai = require("chai");
const chaiHttp = require("chai-http");
const axios = require("axios");
const { query } = require("express");
const expect = chai.expect;
const userRoute = "http://localhost:3001/users";
const adminRoute = "http://localhost:3001/admin";

//Assertion style
chai.use(chaiHttp);
describe("admin router", () => {
    /**********************
     Read user route
     ***********************/
    // eslint-disable-next-line no-undef
    before(() => {});

    describe("GET /search ", () => {
        it("find a user using a keyword", (done) => {
            axios

                .get(
                    adminRoute + "/search",
                    {
                        params: { search: "caleb" },
                        headers: {
                            Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                        },
                    },
                    {
                        withCredentials: true,
                    }
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
