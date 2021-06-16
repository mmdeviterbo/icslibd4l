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
                "ISBN":"0 98765 432 1",
                "title": "Test Book",
                "authors": [{"fname":"Tester", "lname":"OneUpdated"}, {"fname":"Tester", "lname":"TwoUpdated"}],
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
                    withCredentials: true,
                })
                .then((res) => {
                    expect(res.data).to.have.string("Entry Updated");
                    done();
                })
                .catch((err) => {
                    done(err);
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
                .delete(userRoute + "/delete/" + bookId, bookInfo, {
                    withCredentials: true,
                })
                .then((res) => {
                    expect(res.data).to.have.string("Entry Deleted");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
