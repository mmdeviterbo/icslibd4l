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
    before(() => {});

    describe("POST /create SP ", () => {
        it("add a SP to the database without 4 file links", (done) => {
            let spInfo = {
                type: "Special Problem",
                title: "Test Title",
                abstract: "Title Abstract",
                year: "2020",
                keywords: ["keywords1", "keywords2"],
                authors: [{ fname: "First", lname: "Last" }],
                advisers: [{ fname: "First", lname: "Last" }],
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
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

    describe("POST /create Thesis ", () => {
        it("add a Thesis to the database with 4 file links", (done) => {
            let spInfo = {
                type: "Thesis",
                title: "La Vie en Rose",
                abstract: "Panorama",
                year: "2020",
                keywords: ["keywords1", "keywords2"],
                authors: [{ fname: "Kim", lname: "Chaewon" }],
                advisers: [{ fname: "Miyawaki", lname: "Sakura" }],
                source_code: "wwww",
                manuscript: "wwww",
                journal: "www",
                poster: "www",
            };
            axios
                .post(spRoute + "/create", spInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
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
            it("get all books", () => {
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

            it("get all special problems", () => {
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
                            expect(item).to.include({
                                type: "Special Problem",
                            });
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("get all theses", () => {
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
                            expect(item).to.include({ type: "Thesis" });
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
            it("search all resources based on query", () => {
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
                        expect(
                            spThesisArr.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;
                        expect(
                            bookArr.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.publisher
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.physicalDesc
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.author.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.subject.some((subj) => {
                                        return subj.subject
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search all books based on query", () => {
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
                        expect(
                            res.data.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.publisher
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.physicalDesc
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.author.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.subject.some((subj) => {
                                        return subj.subject
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search all special problems based on query", () => {
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
                            expect(item).to.include({
                                type: "Special Problem",
                            });
                        });
                        let searchReq = searchInfo.search.toLowerCase();
                        expect(
                            res.data.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });

            it("search all theses based on query", () => {
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
                            expect(item).to.include({ type: "Thesis" });
                        });
                        let searchReq = searchInfo.search.toLowerCase();
                        expect(
                            res.data.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });

        // search resources from search and filter page

        describe("From search and filter page", () => {
            it("search and filter resources", () => {
                let searchInfo = {
                    type: "any",
                    search: "computer",
                    year: 2011,
                    publisher: "morgan",
                    author: "david",
                    adviser: "",
                    subject: "CMSC 132",
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
                        expect(
                            spThesisArr.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;
                        expect(
                            bookArr.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.publisher
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.physicalDesc
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.author.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.subject.some((subj) => {
                                        return subj.subject
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;

                        // test filter
                        spThesisArr.forEach((item) => {
                            expect(item).to.include({
                                type: { $in: ["Special Problem", "Thesis"] },
                            });
                            expect(item).to.include({ year: searchInfo.year });
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
                            expect(item.datePublished.getFullYear()).to.eql(
                                searchInfo.year
                            );
                            expect(item.publisher).to.include(
                                searchInfo.publisher
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

            it("search and filter books", () => {
                let searchInfo = {
                    type: "book",
                    search: "MIT Press",
                    year: 1990,
                    publisher: "MIT Press",
                    author: "Stein",
                    subject: "CMSC 142",
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);

                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        expect(
                            res.data.forEach((item) => {
                                return (
                                    expect(item).to.have.property("bookId") &&
                                    (item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                        item.publisher
                                            .toLowerCase()
                                            .include(searchReq) ||
                                        item.physicalDesc
                                            .toLowerCase()
                                            .include(searchReq) ||
                                        item.author.some((auth) => {
                                            return auth.author_name
                                                .toLowerCase()
                                                .include(searchReq);
                                        }) ||
                                        item.subject.some((subj) => {
                                            return subj.subject
                                                .toLowerCase()
                                                .include(searchReq);
                                        }))
                                );
                            })
                        ).to.be.true;

                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.have.property("bookId");
                            expect(item.datePublished.getFullYear()).to.eql(
                                searchInfo.year
                            );
                            expect(item.publisher).to.include(
                                searchInfo.publisher
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

            it("search and filter special problems", () => {
                let searchInfo = {
                    type: "sp",
                    search: "Food",
                    year: 2008,
                    author: "Sandy",
                    adviser: "Paterno, Margarita Carmen",
                    keyword: ["Bluetooth", "Mobile"],
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);

                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        expect(
                            res.data.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;

                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.include({
                                type: "Special Problem",
                            });
                            expect(item).to.include({ year: searchInfo.year });
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

            it("search and filter theses", () => {
                let searchInfo = {
                    type: "thesis",
                    search: "NUI",
                    year: 2012,
                    author: "Fritz",
                    adviser: "Hermocilla, Joseph Anthony",
                    keyword: ["Image", "Pattern"],
                };
                axios
                    .get(spRoute + "/search", { params: searchInfo })
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);

                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        expect(
                            res.data.forEach((item) => {
                                return (
                                    item.title
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.abstract
                                        .toLowerCase()
                                        .include(searchReq) ||
                                    item.authors.some((auth) => {
                                        return auth.author_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.advisers.some((advi) => {
                                        return advi.adviser_name
                                            .toLowerCase()
                                            .include(searchReq);
                                    }) ||
                                    item.keywords.some((keyw) => {
                                        return keyw.sp_thesis_keyword
                                            .toLowerCase()
                                            .include(searchReq);
                                    })
                                );
                            })
                        ).to.be.true;

                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.include({ type: "Thesis" });
                            expect(item).to.include({ year: searchInfo.year });
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
