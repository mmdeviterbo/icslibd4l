const router = require("express").Router();
const authAdmin = require("../middleware/authAdmin");

//for generating reports
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const pdflib = require("pdf-lib");
const path = require("path");
const pdfMerge = require("pdf-merger-js");
const BookModel = require("../models/bookModel");
const ThesisModel = require("../models/spThesisModel");
const { PDFDocument } = require("pdf-lib");
const { pdfDocEncodingDecode } = require("pdf-lib/cjs/utils");

const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

//compile function for pdf format
/****************************************************
 parameters: 
    templateName, data 
 output: 
    html in string format
 **************************************************/
const compile = async function (templateName, data) {
    const filePath = path.join(
        process.cwd(),
        `./server/reportTemplate/${templateName}.hbs`
    );
    const html = await fs.readFile(filePath, "utf-8");
    // Handlebars Helper that formats the date to FullMonth DD YYYY HH:MM AM
    hbs.registerHelper("dateFormatter", function (dateString) {
        var newDate = new Date(dateString);
        var month = monthList[newDate.getMonth()];
        var year = newDate.getFullYear();
        var day = newDate.getDay();
        var hours = newDate.getHours();
        var minutes = newDate.getMinutes();
        var meridiem = "";

        if (hours > 12) {
            hours = hours - 12;
            meridiem = "PM";
        } else {
            meridiem = "AM";
        }

        return `${month} ${day > 9 ? day : `0${day}`} ${year} ${hours}:${minutes > 9 ? minutes : `0${minutes}`} ${meridiem}`;
    });
    return hbs.compile(html)(data);
};
//summary report function
/**************************************************** 
Req object: 
    query: type
    values: [books, spThesis, all]
TODO:
    complete templates in the reportTemplate folder (add placeholders)
    complete the function
GUIDE:
    https://www.youtube.com/watch?v=9VgghGKx_1c
TIP:
    how to generate pdf from multiple html:
    https://stackoverflow.com/questions/48510210/puppeteer-generate-pdf-from-multiple-htmls
********************************************************/
router.get("/report", authAdmin, async (req, res) => {
    //type of report to be generated
    const type = req.query.type;

    try {
        //init
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox"],
        });
        const page = await browser.newPage();
        let books, spThesis;
        let pdfBuffer = [],
            pdfBufferBook = [],
            pdfBufferspThesis = [],
            bookStart = 0,
            spThesisStart = 0;
        //books
        if (type === "all" || type === "books") {
            //query for all book information
            //copied from book router search book function
            books = await BookModel.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: "book_authors",
                        localField: "bookId",
                        foreignField: "bookId",
                        as: "author",
                    },
                },
                {
                    $lookup: {
                        from: "book_subjects",
                        localField: "bookId",
                        foreignField: "bookId",
                        as: "subject",
                    },
                },
            ]);

            //create pdf buffers with 10 items per page for books
            do {
                if (bookStart + 10 > books.length) {
                    const bookContent = await compile(
                        "book",
                        books.slice(bookStart, books.length)
                    );
                    const bookPage = await browser.newPage();
                    await bookPage.setContent(bookContent);
                    await bookPage.pdf({
                        path: "./src/download/Books.pdf",
                        format: "A4",
                        printBackground: true,
                        margin: { top: 40, bottom: 40, left: 40, right: 40 },
                        landscape: true,
                    });
                    pdfBuffer.push(fs.readFileSync("./src/download/Books.pdf"));
                    pdfBufferBook.push(
                        fs.readFileSync("./src/download/Books.pdf")
                    );
                } else {
                    const bookContent = await compile(
                        "book",
                        books.slice(bookStart, bookStart + 10)
                    );
                    const bookPage = await browser.newPage();
                    await bookPage.setContent(bookContent);
                    await bookPage.pdf({
                        path: "./src/download/Books.pdf",
                        format: "A4",
                        printBackground: true,
                        margin: { top: 40, bottom: 40, left: 40, right: 40 },
                        landscape: true,
                    });
                    pdfBuffer.push(fs.readFileSync("./src/download/Books.pdf"));
                    pdfBufferBook.push(
                        fs.readFileSync("./src/download/Books.pdf")
                    );
                }
                bookStart += 10;
            } while (bookStart < books.length);
        }

        //sp and thesis
        if (type === "all" || type === "spThesis") {
            //query for all sp and thesis information
            //copied from spThesisRouter browse function
            spThesis = await ThesisModel.aggregate([
                {
                    $match: {
                        type: {
                            $in: [
                                "Thesis",
                                "Special Problem",
                                "thesis",
                                "sp",
                                "SP",
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_advisers",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "adviser",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_authors",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "author",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_keywords",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "keywords",
                    },
                },
                {
                    $sort: {
                        title: 1,
                        type: 1,
                    },
                },
            ]);

            //create pdf buffers with 20 items per page for spThesis
            do {
                if (spThesisStart + 20 > spThesis.length) {
                    const bookContent = await compile(
                        "spThesis",
                        spThesis.slice(spThesisStart, spThesis.length)
                    );
                    const bookPage = await browser.newPage();
                    await bookPage.setContent(bookContent);
                    await bookPage.pdf({
                        path: "./src/download/spThesis.pdf",
                        format: "A4",
                        printBackground: true,
                        margin: { top: 40, bottom: 40, left: 40, right: 40 },
                        landscape: true,
                    });
                    pdfBuffer.push(
                        fs.readFileSync("./src/download/spThesis.pdf")
                    );
                    pdfBufferspThesis.push(
                        fs.readFileSync("./src/download/spThesis.pdf")
                    );
                } else {
                    const bookContent = await compile(
                        "spThesis",
                        spThesis.slice(spThesisStart, spThesisStart + 20)
                    );
                    const bookPage = await browser.newPage();
                    await bookPage.setContent(bookContent);
                    await bookPage.pdf({
                        path: "./src/download/spThesis.pdf",
                        format: "A4",
                        printBackground: true,
                        margin: { top: 40, bottom: 40, left: 40, right: 40 },
                        landscape: true,
                    });
                    pdfBuffer.push(
                        fs.readFileSync("./src/download/spThesis.pdf")
                    );
                    pdfBufferspThesis.push(
                        fs.readFileSync("./src/download/spThesis.pdf")
                    );
                }
                spThesisStart += 20;
            } while (spThesisStart < spThesis.length);
        }

        //users, not a priority
        if (type === "users") {
            const users = await UserModel.find().sort({ userType: 1 });
        }

        //user logs, not a priority
        if (type === "userLogs") {
            const userLogs = await UserModel.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: "userlogs",
                        localField: "googleId",
                        foreignField: "googleId",
                        as: "logs",
                    },
                    $sort: {},
                },
                {
                    $sort: {
                        userType: -1,
                    },
                },
            ]);
        }

        //merge pdf buffers and save file
        const mergedPdf = await PDFDocument.create();
        for (const pdfBytes of pdfBuffer) {
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(
                pdf,
                pdf.getPageIndices()
            );
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            });
        }

        const buf = await mergedPdf.save();

        let path = "./src/download/Merged.pdf";
        fs.open(path, "w", function (err, fd) {
            fs.write(fd, buf, 0, buf.length, null, function (err) {
                fs.close(fd, function () {});
            });
        });

        const mergedPdfbook = await PDFDocument.create();
        for (const pdfBytes of pdfBufferBook) {
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdfbook.copyPages(
                pdf,
                pdf.getPageIndices()
            );
            copiedPages.forEach((page) => {
                mergedPdfbook.addPage(page);
            });
        }

        const bufbook = await mergedPdfbook.save();

        path = "./src/download/Books.pdf";
        fs.open(path, "w", function (err, fd) {
            fs.write(fd, bufbook, 0, bufbook.length, null, function (err) {
                fs.close(fd, function () {});
            });
        });

        const mergedPdfspthesis = await PDFDocument.create();
        for (const pdfBytes of pdfBufferspThesis) {
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdfspthesis.copyPages(
                pdf,
                pdf.getPageIndices()
            );
            copiedPages.forEach((page) => {
                mergedPdfspthesis.addPage(page);
            });
        }

        const bufspthesis = await mergedPdfspthesis.save();

        path = "./src/download/spThesis.pdf";
        fs.open(path, "w", function (err, fd) {
            fs.write(
                fd,
                bufspthesis,
                0,
                bufspthesis.length,
                null,
                function (err) {
                    fs.close(fd, function () {});
                }
            );
        });

        await browser.close();

        res.status(200).send("Summary Report Created Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;
