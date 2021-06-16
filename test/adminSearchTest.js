const chai = require("chai");
const chaiHttp = require("chai-http");
const axios = require("axios");
const { query } = require("express");
const expect = chai.expect;
const userRoute = "http://localhost:3001/users";
const adminRoute = "http://localhost:3001/admin";

//Assertion style
chai.use(chaiHttp);
let token;
describe("admin router", () => {
    /**********************
     Read user route
     ***********************/
    // eslint-disable-next-line no-undef
    before(() => {});

    describe("GET /search ", () => {
        it("find a user using a keyword", (done) => {
            axios
                
                .get(adminRoute + "/search", {params: {search: "caleb"} }) 
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