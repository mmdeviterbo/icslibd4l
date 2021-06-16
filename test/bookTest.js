const chai = require("chai");
const chaiHttp = require("chai-http");
const axios = require("axios");
const expect = chai.expect;
const userRoute = "http://localhost:3001/books";

//Assertion style
chai.use(chaiHttp);
let bookId;
describe("Book Router API", () => {
    /**********************
     CREATE route
     ***********************/
    before(() => {});

    describe("POST /create ", () => {
        it("add a book to the database", (done) => {
            let bookInfo = {
                "ISBN":"1 23456 789 0",
                "title": "Test Book",
                "authors": [{"fname":"Tester", "lname":"One"}, {"fname":"Tester", "lname":"Two"}],
                "subjects": ["Subject One", "Subject Two"],
                "physicalDesc": "Physical Description",
                "publisher": "Publisher",
                "numberOfCopies": 2,
                "bookCoverLink": "https://drive.google.com/file/d/1fhkFDaoYJLOX6R9KLwKjG2658jUFxZ2-/view?usp=sharing",
                "datePublished": "2010-09-29",
                "dateAcquired": "2021-04-20"
            };
            axios
                .post(userRoute + "/create", bookInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    bookId = res.data.bookId;
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("POST /create ", () => {
        it("check if book exists", () => {
            let bookInfo = {
                "ISBN":"1 23456 789 0",
                "title": "Test Book",
                "authors": [{"fname":"Tester", "lname":"One"}, {"fname":"Tester", "lname":"Two"}],
                "subjects": ["Subject One", "Subject Two"],
                "physicalDesc": "Physical Description",
                "publisher": "Publisher",
                "numberOfCopies": 2,
                "bookCoverLink": "https://drive.google.com/file/d/1fhkFDaoYJLOX6R9KLwKjG2658jUFxZ2-/view?usp=sharing",
                "datePublished": "2010-09-29",
                "dateAcquired": "2021-04-20"
            };
            axios
                .post(userRoute + "/create", bookInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    withCredentials: true,
                })
                .catch((err) => {
                    expect(err).to.be.instanceOf(Error);
                    expect(err.errorMessage).to.match(/ISBN already exists!/);
                    assert.fail(null, null, "ISBN already exists!");
                });
        });
    });

    describe("POST /create ", () => {
        it("check if ISBN is valid", () => {
            let bookInfo = {
                "ISBN":"1 23456 789 01",
                "title": "Test Book",
                "authors": [{"fname":"Tester", "lname":"One"}, {"fname":"Tester", "lname":"Two"}],
                "subjects": ["Subject One", "Subject Two"],
                "physicalDesc": "Physical Description",
                "publisher": "Publisher",
                "numberOfCopies": 2,
                "bookCoverLink": "https://drive.google.com/file/d/1fhkFDaoYJLOX6R9KLwKjG2658jUFxZ2-/view?usp=sharing",
                "datePublished": "2010-09-29",
                "dateAcquired": "2021-04-20"
            };
            axios
                .post(userRoute + "/create", bookInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    withCredentials: true,
                })
                .catch((err) => {
                    expect(err).to.be.instanceOf(Error);
                    expect(err.errorMessage).to.match(/ISBN must contain 10 or 13 digits./);
                    assert.fail(null, null, "ISBN must contain 10 or 13 digits.");
                    done(err);
                });
        });
    });

    describe("GET /display_latest ", () => {
        it("get the 12 latest book acquisitions", () => {
            axios
                .get(userRoute + "/display_latest")
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

    describe("GET /search-book/:bookId ", () => {
        it("get a book by its bookId", () => {
            let bookInfo = {
                "bookId": bookId,
            };
            axios
                .get(userRoute + "/search-book/" + bookId, bookInfo, {
                    withCredentials: true,
                })
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
     UPDATE route
     ***********************/
    describe("PUT /update ", () => {
        it("update book information", (done) => {
            let bookInfo = {
                "bookId": bookId,
                "ISBN": "0 98765 432 1",
                "title": "Test Book",
                "author": [{"author_fname":"Tester", "author_lname":"OneUpdated"}, {"author_fname":"Tester", "author_lname":"TwoUpdated"}],
                "subjects": ["Subject One Updated", "Subject Two Updated"],
                "physicalDesc": "Physical Description",
                "publisher": "Publisher",
                "numberOfCopies": 2,
                "bookCoverLink": "https://drive.google.com/file/d/1fhkFDaoYJLOX6R9KLwKjG2658jUFxZ2-/view?usp=sharing",
                "datePublished": "2010-09-29",
                "dateAcquired": "2021-04-20"
            };
            axios
                .put(userRoute + "/update", bookInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.have.string("Entry Updated");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("PUT /update ", () => {
        it("update book information - check if ISBN already exists", () => {
            let bookInfo = {
                "bookId": bookId,
                "ISBN": "978-0470902103",
                "title": "Test Book",
                "author": [{"author_fname":"Tester", "author_lname":"OneUpdated2"}, {"author_fname":"Tester", "author_lname":"TwoUpdated2"}],
                "subjects": ["Subject One Updated2", "Subject Two Updated2"],
                "physicalDesc": "Physical Description",
                "publisher": "Publisher",
                "numberOfCopies": 2,
                "bookCoverLink": "https://drive.google.com/file/d/1fhkFDaoYJLOX6R9KLwKjG2658jUFxZ2-/view?usp=sharing",
                "datePublished": "2010-09-29",
                "dateAcquired": "2021-04-20"
            };
            axios
                .put(userRoute + "/update", bookInfo, {
                    headers: {
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
                    withCredentials: true,
                })
                .catch((err) => {
                    expect(err).to.be.instanceOf(Error);
                    expect(err.errorMessage).to.match(/ISBN already exists!/);
                    assert.fail(null, null, "ISBN already exists!");
                });
        });
    });

    /**********************
     DELETE route
     ***********************/
    describe("DELETE /delete/:bookId ", () => {
        it("delete a book from the database using its bookId", (done) => {
            let bookInfo = {
                "bookId": bookId,
            };
            axios
                .delete(userRoute + "/delete/" + bookId, {
                    headers: {
                        data: bookInfo,
                        Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InB1YmxpYyI6bnVsbCwiSUNTbGlicmFyeSI6ImU5NDU0Y2VhN2UwYTc0NWQ2ZGZkYjUzNzRhMmYxMTE3MDIxZDcwZDExZDJkYmI5NmYxZWJkZThhZDFmMzYxZTRhYjRjNDlhMjllMTFkZmFiMGNlNWIzMjczZGExOTVjODM0ODU5MzI0N2MyNmZhYWM5YmUwNTA3MzhlNDBmOGY3NjdhYjBhOGU1YThjZTIxZjFmZGE5YTBhNWU2ZjA0ZjgxZGFmYjNkNGQ2M2Q2Nzc2OTUzZWE5MDljZGExN2I2NTc1ZTE0YTI4YmVmOTdlYzc1NzFiYzg2YmI4NWU2NTQ0NzA5YmNiZjk1MzFhOGM5ZmY4NTc1ZTkxYWFiNTMwMjVmZGE1NTBiZmNjMmU4NGNkZGQ1OWVmMWVlMTJhNGM1MyJ9LCJpYXQiOjE2MjM4MjExNzgsImV4cCI6MTYyMzkwNzU3OH0.F-LPE0_4Odr-5HfNJ1hM_sFYGcLOwjFgMVlOKur5fPk",
                    },
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
