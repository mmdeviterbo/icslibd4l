import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import "./summaryReportStyle.css";

function DocumentViewer({ pdfFile }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [fileName, setFileName] = useState("");

    const onDocumentLoadSuccess = ({ numPages, fileName }) => {
        setNumPages(numPages);
        console.log(pdfFile);
        setFileName(String(pdfFile));
    };

    // Handler function for previous page click
    const handlePrevPage = () => {
        // Go to the previous page if not yet on the first page.
        setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber);
    };

    // Handler function for Jump to first page click
    const handleFirstPage = () => {
        setPageNumber(1);
    };

    // Handler function for next page click
    const handleNextPage = () => {
        // Go to the next page if not yet on last page
        setPageNumber(pageNumber < numPages ? pageNumber + 1 : pageNumber);
    };

    const handleLastPage = () => {
        setPageNumber(numPages);
    };

    return (
        <div
            className="pdf-view-container"
            style={{
                height: "100%",
                backgroundColor: "#CFCFCF",
            }}
        >
            <div className="pdf-controls-container">
                <div className="file-label-here">{fileName}</div>

                <div className="pagination-container">
                    <button
                        className="btn pagination-button"
                        onClick={handleFirstPage}
                    >
                        <i className="pagination-icon fa fa-angle-double-left" />
                    </button>
                    <button
                        className="btn pagination-button"
                        onClick={handlePrevPage}
                    >
                        <i className="pagination-icon fa fa-angle-left" />
                    </button>
                    <span className="page-label">
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        className="btn pagination-button"
                        onClick={handleNextPage}
                    >
                        <i className="pagination-icon fa fa-angle-right" />
                    </button>
                    <button
                        className="btn pagination-button"
                        onClick={handleLastPage}
                    >
                        <i className="pagination-icon fa fa-angle-double-right" />
                    </button>
                </div>
                <div className="download-button-container">
                    <button className="btn download-btn">
                        <i className="fa fa-download" />
                    </button>
                </div>
            </div>

            <div className="main-document-container">
                <Document
                    className="pdf-file-container"
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} width={800} />
                </Document>
            </div>
        </div>
    );
}

export default DocumentViewer;
