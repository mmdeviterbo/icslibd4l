const chai = require("chai");
const chaiHttp = require("chai-http");
const axios = require("axios");
const expect = chai.expect;
const spRoute = "http://localhost:3001/thesis";

//Assertion style
chai.use(chaiHttp);
let sp_thesis_id;
describe("SP Thesis Router API", () => {
    /**********************
     CREATE route
     ***********************/

    describe("POST /create SP ", () => {
        it("add a SP to the database without 4 file links", (done) => {
            let spInfo = {
                type: "Special Problem",
                title: "Test Title1",
                abstract: "Title Abstract1",
                year: 2020,
                keywords: ["keywords01", "keywords02"],
                authors: [{ fname: "First1", lname: "Last1" }],
                advisers: [{ fname: "First1", lname: "Last1" }],
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res.status);
                    if (res.data.errorMessage === "It already exists!")
                        expect(res).to.have.status(400);
                    else expect(res).to.have.status(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("POST /create Thesis ", () => {
        it("add a Thesis to the database with 4 file links", (done) => {
            let spInfo = {
                type: "Thesis",
                title: "Test Title2",
                abstract: "Title Abstract2",
                year: 2020,
                keywords: ["keywords11", "keywords12"],
                authors: [{ fname: "First2", lname: "Last2" }],
                advisers: [{ fname: "First2", lname: "Last2" }],
                source_code: "www",
                manuscript: "www",
                journal: "www",
                poster: "www",
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res.status);
                    if (res.data.errorMessage === "It already exists!")
                        expect(res).to.have.status(400);
                    else {
                        expect(res).to.have.status(200);
                        expect(res.data).to.be.an("array");
                    }
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("POST /create ", () => {
        it("check if resource already exists", () => {
            let spInfo = {
                type: "Thesis",
                title: "Test Title2",
                abstract: "Title Abstract2",
                year: 2020,
                keywords: ["keywords11", "keywords12"],
                authors: [{ fname: "First2", lname: "Last2" }],
                advisers: [{ fname: "First2", lname: "Last2" }],
                source_code: "www",
                manuscript: "www",
                journal: "www",
                poster: "www",
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    withCredentials: true,
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                })
                .catch((err) => {
                    expect(err).to.be.instanceOf(Error);
                    expect(err.errorMessage).to.match(/SP already exists./);
                    assert.fail(null, null, "SP already exists.");
                });
        });
    });

    describe("POST /create SP ", () => {
        it("add a SP to the database without 4 file links", (done) => {
            let spInfo = {
                type: "Special Problem",
                title: "Test Title1",
                abstract: "Title Abstract1",
                year: 2020,
                keywords: ["keywords01", "keywords02"],
                authors: [{ fname: "First1", lname: "Last1" }],
                advisers: [{ fname: "First1", lname: "Last1" }],
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    sp_thesis_id = res.data.sp_thesis_id;
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
    /**********************
     DOWNLOAD route
    ***********************/

    describe("GET /download", () => {
        it("get poster file link of a SP resource", () => {
            axios
                .get(
                    spRoute + "/download",
                    { query: { search: "La Vie en Rose", type: "poster" } },
                    { withCredentials: true }
                )
                .then((res) => {
                    expect(res.data).to.be.an("string");
                    expect(res.status).to.equal(200);

                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    /**********************
     BROWSE route
    ***********************/

    describe("GET /browse", () => {
        it("get all books, alphabetically sorted", () => {
            axios
                .get(
                    spRoute + "/browse",
                    { query: { type: "book" } },
                    { withCredentials: true }
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

    /**********************
     SEARCH route
    ***********************/

    describe("GET /search", () => {
        it("search all sp based on query", () => {
            axios
                .get(
                    spRoute + "/search",
                    { query: { type: "book", search: "" } },
                    { withCredentials: true }
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

        // search resources from home browse

        describe("From home browse", () => {
            it("get all books", (done) => {
                let searchInfo = {
                    type: "book",
                    search: "",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.have.property("bookId");
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("get all special problems", (done) => {
                let searchInfo = {
                    type: "sp",
                    search: "",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.includes({
                                type: "Special Problem",
                            });
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("get all theses", (done) => {
                let searchInfo = {
                    type: "thesis",
                    search: "",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.includes({ type: "Thesis" });
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });

        // search resources from home search

        describe("From home search", () => {
            it("search all resources based on query", (done) => {
                let searchInfo = {
                    type: "any",
                    search: "test",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        let searchReq = searchInfo.search.toLowerCase();
                        let spThesisArr = res.data.filter(
                            (item) => "sp_thesis_id" in item
                        );
                        let bookArr = res.data.filter(
                            (item) => "bookId" in item
                        );
                        spThesisArr.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });
                        bookArr.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.publisher
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.physicalDesc
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.author.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.subject.some((subj) => {
                                        return subj.subject
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search all books based on query", (done) => {
                let searchInfo = {
                    type: "book",
                    search: "intro",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.have.property("bookId");
                        });
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.publisher
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.physicalDesc
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.author.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.subject.some((subj) => {
                                        return subj.subject
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search all special problems based on query", (done) => {
                let searchInfo = {
                    type: "sp",
                    search: "test",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.includes({
                                type: "Special Problem",
                            });
                        });
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search all theses based on query", (done) => {
                let searchInfo = {
                    type: "thesis",
                    search: "study",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.includes({ type: "Thesis" });
                        });
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });

        // search resources from search and filter page

        describe("From search and filter page", () => {
            it("search and filter resources", (done) => {
                let searchInfo = {
                    type: "any",
                    search: "computer",
                    year: 2011,
                    publisher: "morgan",
                    author: "david",
                    adviser: "",
                    subject: "cmsc 132",
                    keywords: [],
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        let spThesisArr = res.data.filter(
                            (item) => "sp_thesis_id" in item
                        );
                        let bookArr = res.data.filter(
                            (item) => "bookId" in item
                        );

                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        spThesisArr.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });
                        bookArr.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.publisher
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.physicalDesc
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.author.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.subject.some((subj) => {
                                        return subj.subject
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });

                        // test filter
                        spThesisArr.forEach((item) => {
                            expect(item).to.includes({
                                type: { $in: ["Special Problem", "Thesis"] },
                            });
                            expect(item).to.includes({ year: searchInfo.year });
                            expect(
                                item.authors.some((auth) => {
                                    return auth.author_name
                                        .toLowerCase()
                                        .includes(
                                            searchInfo.author.toLowerCase()
                                        );
                                })
                            ).to.be.true;
                            let fnameFilter, lnameFilter;
                            [lnameFilter, fnameFilter] =
                                searchInfo.adviser.split(", ");
                            expect(
                                item.advisers.some((advi) => {
                                    return (
                                        advi.adviser_fname == fnameFilter &&
                                        advi.adviser_lname == lnameFilter
                                    );
                                })
                            ).to.be.true;
                            expect(
                                item.keywords.some((keyw) => {
                                    return searchInfo.keyword.some(
                                        (keyFilter) => {
                                            return keyw.sp_thesis_keyword
                                                .toLowerCase()
                                                .includes(
                                                    keyFilter.toLowerCase()
                                                );
                                        }
                                    );
                                })
                            ).to.be.true;
                        });
                        bookArr.forEach((item) => {
                            expect(item).to.have.property("bookId");
                            expect(item.datePublished).to.includes(
                                searchInfo.year
                            );
                            expect(item.publisher.toLowerCase()).to.includes(
                                searchInfo.publisher.toLowerCase()
                            );
                            expect(
                                item.author.some((auth) => {
                                    return auth.author_name
                                        .toLowerCase()
                                        .includes(
                                            searchInfo.author.toLowerCase()
                                        );
                                })
                            ).to.be.true;
                            expect(
                                item.subject.some((subj) => {
                                    return subj.subject
                                        .toLowerCase()
                                        .includes(
                                            searchInfo.subject.toLowerCase()
                                        );
                                })
                            ).to.be.true;
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search and filter books", (done) => {
                let searchInfo = {
                    type: "book",
                    search: "mit press",
                    year: 1990,
                    publisher: "mit press",
                    author: "stein",
                    subject: "cmsc 142",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);

                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.publisher
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.physicalDesc
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.author.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.subject.some((subj) => {
                                        return subj.subject
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });

                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.have.property("bookId");
                            expect(item.datePublished).to.includes(
                                searchInfo.year
                            );
                            expect(item.publisher.toLowerCase()).to.includes(
                                searchInfo.publisher.toLowerCase()
                            );
                            expect(
                                item.author.some((auth) => {
                                    return auth.author_name
                                        .toLowerCase()
                                        .includes(
                                            searchInfo.author.toLowerCase()
                                        );
                                })
                            ).to.be.true;
                            expect(
                                item.subject.some((subj) => {
                                    return subj.subject
                                        .toLowerCase()
                                        .includes(
                                            searchInfo.subject.toLowerCase()
                                        );
                                })
                            ).to.be.true;
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search and filter special problems", (done) => {
                let searchInfo = {
                    type: "sp",
                    search: "food",
                    year: 2008,
                    author: "sandy",
                    adviser: "Paterno, Margarita Carmen",
                    keyword: ["bluetooth", "mobile"],
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);

                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });

                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.includes({
                                type: "Special Problem",
                            });
                            expect(item).to.includes({ year: searchInfo.year });
                            expect(
                                item.authors.some((auth) => {
                                    return auth.author_name
                                        .toLowerCase()
                                        .includes(
                                            searchInfo.author.toLowerCase()
                                        );
                                })
                            ).to.be.true;
                            let fnameFilter, lnameFilter;
                            [lnameFilter, fnameFilter] =
                                searchInfo.adviser.split(", ");
                            expect(
                                item.advisers.some((advi) => {
                                    return (
                                        advi.adviser_fname == fnameFilter &&
                                        advi.adviser_lname == lnameFilter
                                    );
                                })
                            ).to.be.true;
                            expect(
                                item.keywords.some((keyw) => {
                                    return searchInfo.keyword.some(
                                        (keyFilter) => {
                                            return keyw.sp_thesis_keyword
                                                .toLowerCase()
                                                .includes(
                                                    keyFilter.toLowerCase()
                                                );
                                        }
                                    );
                                })
                            ).to.be.true;
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search and filter theses", (done) => {
                let searchInfo = {
                    type: "thesis",
                    search: "nui",
                    year: 2012,
                    author: "fritz",
                    adviser: "Hermocilla, Joseph Anthony",
                    keyword: ["image", "pattern"],
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);

                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .includes(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .includes(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .includes(searchReq);
                                    })
                            ).to.be.true;
                        });

                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.includes({ type: "Thesis" });
                            expect(item).to.includes({ year: searchInfo.year });
                            expect(
                                item.authors.some((auth) => {
                                    return auth.author_name
                                        .toLowerCase()
                                        .includes(
                                            searchInfo.author.toLowerCase()
                                        );
                                })
                            ).to.be.true;
                            let fnameFilter, lnameFilter;
                            [lnameFilter, fnameFilter] =
                                searchInfo.adviser.split(", ");
                            expect(
                                item.advisers.some((advi) => {
                                    return (
                                        advi.adviser_fname == fnameFilter &&
                                        advi.adviser_lname == lnameFilter
                                    );
                                })
                            ).to.be.true;
                            expect(
                                item.keywords.some((keyw) => {
                                    return searchInfo.keyword.some(
                                        (keyFilter) => {
                                            return keyw.sp_thesis_keyword
                                                .toLowerCase()
                                                .includes(
                                                    keyFilter.toLowerCase()
                                                );
                                        }
                                    );
                                })
                            ).to.be.true;
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });
    });

    describe("GET /search-id", () => {
        it("search database based on query", () => {
            axios
                .get(
                    spRoute + "/search",
                    { query: { type: "book", search: "" } },
                    { withCredentials: true }
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
