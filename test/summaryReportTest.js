let chai = require("chai");
let chaiHttp = require("chai-http");
const axios = require("axios");
const fs = require("fs");

const expect = chai.expect;
const summaryReportRoute = "http://localhost:3001/reports";

//Assertion style
chai.use(chaiHttp);
describe("Summary Report Router API", () => {
    /**********************
     Generate PDFs route
     ***********************/
    describe("READ /report ", () => {
        it("Generate Summary Report", (done) => {
            // eslint-disable-next-line no-unused-expressions
            axios
                .get(summaryReportRoute + "/report?type=all", {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
                .then((res) => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(fs.existsSync("./src/download/Merged.pdf")).to.be
                        .true;
                    // eslint-disable-next-line no-unused-expressions
                    expect(fs.existsSync("./src/download/Books.pdf")).to.be
                        .true;
                    // eslint-disable-next-line no-unused-expressions
                    expect(fs.existsSync("./src/download/spThesis.pdf")).to.be
                        .true;
                    expect(res.status).to.equal(200);
                    expect(res.data).to.have.string(
                        "Summary Report Created Successfully"
                    );
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
