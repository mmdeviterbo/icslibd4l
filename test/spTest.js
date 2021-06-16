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
                "type": "Special Problem",
                "title": "Test Title",
                "abstract": "Title Abstract",
                "year": "2020",
                "keywords" : ["keywords1", "keywords2"],
                "authors": [
                    {	"fname" : "First",
                        "lname" : "Last"	
                    }
                ],
                "advisers": [
                    {	"fname" : "First",
                        "lname" : "Last"	
                    }
                ],
            };
            axios
                .post(spRoute + "/create", spInfo, {
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

    describe("POST /create Thesis ", () => {
        it("add a Thesis to the database with 4 file links", (done) => {
            let spInfo = {
                "type": "Thesis",
                "title": "La Vie en Rose",
                "abstract": "Panorama",
                "year": "2020",
                "keywords" : ["keywords1", "keywords2"],
                "authors": [
                    {	"fname" : "Kim",
                        "lname" : "Chaewon"	
                    }
                ],
                "advisers": [
                    {	"fname" : "Miyawaki",
                        "lname" : "Sakura"	
                    }
                ],
                "source_code": "wwww",
                "manuscript": "wwww",
                "journal": "www",
                "poster": "www"
            };
            axios
                .post(spRoute + "/create", spInfo, {
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
                .get(spRoute + "/download", 
                    {query: {search: "La Vie en Rose", type: "poster"}}, 
                    {withCredentials: true,}
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
                .get(spRoute + "/browse", 
                    {query: {type: "book"}}, 
                    {withCredentials: true,}
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
                .get(spRoute + "/search", 
                    {query: {type: "book", search:""}}, 
                    {withCredentials: true,}
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
                    search: ""
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
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
                    search: ""
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.includes( {type: "Special Problem"} );
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
                    search: ""
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.includes( {type: "Thesis"} );
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
                    search: "test"
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        let searchReq = searchInfo.search.toLowerCase();
                        let spThesisArr = res.data.filter((item) => "sp_thesis_id" in item);
                        let bookArr = res.data.filter((item) => "bookId" in item);
                        spThesisArr.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.abstract.toLowerCase().includes(searchReq) ||
                                item.authors.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.advisers.some((advi) => {
                                    return advi.adviser_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.keywords.some((keyw) => {
                                    return keyw.sp_thesis_keyword.toLowerCase().includes(searchReq);
                                })
                            ).to.be.true;
                        });
                        bookArr.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.publisher.toLowerCase().includes(searchReq) ||
                                item.physicalDesc.toLowerCase().includes(searchReq) ||
                                item.author.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.subject.some((subj) => {
                                    return subj.subject.toLowerCase().includes(searchReq);
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
                    search: "intro"
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
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
                                item.publisher.toLowerCase().includes(searchReq) ||
                                item.physicalDesc.toLowerCase().includes(searchReq) ||
                                item.author.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.subject.some((subj) => {
                                    return subj.subject.toLowerCase().includes(searchReq);
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
                    search: "test"
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.includes( {type: "Special Problem"} );
                        });
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.abstract.toLowerCase().includes(searchReq) ||
                                item.authors.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.advisers.some((advi) => {
                                    return advi.adviser_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.keywords.some((keyw) => {
                                    return keyw.sp_thesis_keyword.toLowerCase().includes(searchReq);
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
                    search: "study"
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        res.data.forEach((item) => {
                            expect(item).to.includes( {type: "Thesis"} );
                        });
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.abstract.toLowerCase().includes(searchReq) ||
                                item.authors.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.advisers.some((advi) => {
                                    return advi.adviser_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.keywords.some((keyw) => {
                                    return keyw.sp_thesis_keyword.toLowerCase().includes(searchReq);
                                })
                            ).to.be.true;
                        })
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
                    keywords: []
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        let spThesisArr = res.data.filter((item) => "sp_thesis_id" in item);
                        let bookArr = res.data.filter((item) => "bookId" in item);
                        
                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        spThesisArr.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.abstract.toLowerCase().includes(searchReq) ||
                                item.authors.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.advisers.some((advi) => {
                                    return advi.adviser_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.keywords.some((keyw) => {
                                    return keyw.sp_thesis_keyword.toLowerCase().includes(searchReq);
                                })
                            ).to.be.true;
                        });
                        bookArr.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.publisher.toLowerCase().includes(searchReq) ||
                                item.physicalDesc.toLowerCase().includes(searchReq) ||
                                item.author.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.subject.some((subj) => {
                                    return subj.subject.toLowerCase().includes(searchReq);
                                })
                            ).to.be.true;
                        });
                        
                        // test filter
                        spThesisArr.forEach((item) => {
                            expect(item).to.includes( {type: {$in: ["Special Problem", "Thesis"]} } );
                            expect(item).to.includes( {year: searchInfo.year} );
                            expect(item.authors.some((auth) => {
                                return auth.author_name
                                    .toLowerCase()
                                    .includes(searchInfo.author.toLowerCase());
                            })).to.be.true;
                            let fnameFilter, lnameFilter;
                            [lnameFilter, fnameFilter] = searchInfo.adviser.split(", ");
                            expect(item.advisers.some((advi) => {
                                return (
                                    advi.adviser_fname == fnameFilter &&
                                    advi.adviser_lname == lnameFilter
                                );
                            })).to.be.true;
                            expect(item.keywords.some((keyw) => {
                                return searchInfo.keyword.some((keyFilter) => {
                                    return keyw.sp_thesis_keyword
                                        .toLowerCase()
                                        .includes(keyFilter.toLowerCase());
                                });
                            })).to.be.true;
                        });
                        bookArr.forEach((item) => {
                            expect(item).to.have.property("bookId");
                            expect(item.datePublished).to.includes(searchInfo.year);
                            expect(item.publisher.toLowerCase()).to.includes(searchInfo.publisher.toLowerCase());
                            expect(item.author.some((auth) => {
                                return auth.author_name
                                    .toLowerCase()
                                    .includes(searchInfo.author.toLowerCase());
                            })).to.be.true;
                            expect(item.subject.some((subj) => {
                                return subj.subject
                                    .toLowerCase()
                                    .includes(searchInfo.subject.toLowerCase());
                            })).to.be.true;
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
                    subject: "cmsc 142"
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        
                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.publisher.toLowerCase().includes(searchReq) ||
                                item.physicalDesc.toLowerCase().includes(searchReq) ||
                                item.author.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.subject.some((subj) => {
                                    return subj.subject.toLowerCase().includes(searchReq);
                                })
                            ).to.be.true;
                        });
                        
                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.have.property("bookId");
                            expect(item.datePublished).to.includes(searchInfo.year);
                            expect(item.publisher.toLowerCase()).to.includes(searchInfo.publisher.toLowerCase());
                            expect(item.author.some((auth) => {
                                return auth.author_name
                                    .toLowerCase()
                                    .includes(searchInfo.author.toLowerCase());
                            })).to.be.true;
                            expect(item.subject.some((subj) => {
                                return subj.subject
                                    .toLowerCase()
                                    .includes(searchInfo.subject.toLowerCase());
                            })).to.be.true;
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
                    keyword: [
                        "bluetooth",
                        "mobile"
                    ]
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        
                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.abstract.toLowerCase().includes(searchReq) ||
                                item.authors.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.advisers.some((advi) => {
                                    return advi.adviser_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.keywords.some((keyw) => {
                                    return keyw.sp_thesis_keyword.toLowerCase().includes(searchReq);
                                })
                            ).to.be.true;
                        });
                        
                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.includes( {type: "Special Problem"} );
                            expect(item).to.includes( {year: searchInfo.year} );
                            expect(item.authors.some((auth) => {
                                return auth.author_name
                                    .toLowerCase()
                                    .includes(searchInfo.author.toLowerCase());
                            })).to.be.true;
                            let fnameFilter, lnameFilter;
                            [lnameFilter, fnameFilter] = searchInfo.adviser.split(", ");
                            expect(item.advisers.some((advi) => {
                                return (
                                    advi.adviser_fname == fnameFilter &&
                                    advi.adviser_lname == lnameFilter
                                );
                            })).to.be.true;
                            expect(item.keywords.some((keyw) => {
                                return searchInfo.keyword.some((keyFilter) => {
                                    return keyw.sp_thesis_keyword
                                        .toLowerCase()
                                        .includes(keyFilter.toLowerCase());
                                });
                            })).to.be.true;
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
                    keyword: [
                        "image",
                        "pattern"
                    ]
                };
                axios
                    .get(spRoute + "/search", {params: searchInfo} )
                    .then((res) => {
                        expect(res.data).to.be.an("array");
                        expect(res.status).to.equal(200);
                        
                        // test search
                        let searchReq = searchInfo.search.toLowerCase();
                        res.data.forEach((item) => {
                            expect(
                                item.title.toLowerCase().includes(searchReq) ||
                                item.abstract.toLowerCase().includes(searchReq) ||
                                item.authors.some((auth) => {
                                    return auth.author_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.advisers.some((advi) => {
                                    return advi.adviser_name.toLowerCase().includes(searchReq);
                                }) ||
                                item.keywords.some((keyw) => {
                                    return keyw.sp_thesis_keyword.toLowerCase().includes(searchReq);
                                })
                            ).to.be.true;
                        });
                        
                        // test filter
                        res.data.forEach((item) => {
                            expect(item).to.includes( {type: "Thesis"} );
                            expect(item).to.includes( {year: searchInfo.year} );
                            expect(item.authors.some((auth) => {
                                return auth.author_name
                                    .toLowerCase()
                                    .includes(searchInfo.author.toLowerCase());
                            })).to.be.true;
                            let fnameFilter, lnameFilter;
                            [lnameFilter, fnameFilter] = searchInfo.adviser.split(", ");
                            expect(item.advisers.some((advi) => {
                                return (
                                    advi.adviser_fname == fnameFilter &&
                                    advi.adviser_lname == lnameFilter
                                );
                            })).to.be.true;
                            expect(item.keywords.some((keyw) => {
                                return searchInfo.keyword.some((keyFilter) => {
                                    return keyw.sp_thesis_keyword
                                        .toLowerCase()
                                        .includes(keyFilter.toLowerCase());
                                });
                            })).to.be.true;
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
                .get(spRoute + "/search", 
                    {query: {type: "book", search:""}}, 
                    {withCredentials: true,}
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
