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
            axios
                .get(summaryReportRoute + "/report?type=all")
                .then((res) => {
                    expect(fs.existsSync("./src/download/Merged.pdf")).to.be
                        .true;
                    expect(fs.existsSync("./src/download/Books.pdf")).to.be
                        .true;
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
            // let app = require("../server/routes/reportRouter");
            // chai.request(app)
            //     .get("/report")
            //     .query({ type: "all" })
            //     .then((res) => {
            //         expect(fs.existsSync("./src/download/Merged.pdf")).to.be
            //             .true;
            //         expect(res.status).to.equal(200);
            //         expect(res.data).to.have.string(
            //             "Summary Report Created Successfully"
            //         );
            //         done();
            //     })
            //     .catch((err) => {
            //         throw err;
            //     });
        });
    });
});
