import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Select from "react-select";

import "./summaryReportStyle.css";

const scaleValue = [
    { label: "25%", value: 0.25 },
    { label: "33%", value: 0.33 },
    { label: "50%", value: 0.5 },
    { label: "67%", value: 0.67 },
    { label: "75%", value: 0.75 },
    { label: "80%", value: 0.8 },
    { label: "90%", value: 0.9 },
    { label: "100%", value: 1 },
    { label: "110%", value: 1.1 },
    { label: "125%", value: 1.25 },
    { label: "150%", value: 1.5 },
    { label: "170%", value: 1.7 },
    { label: "200%", value: 2 },
    { label: "250%", value: 2.5 },
    { label: "300%", value: 3 },
    { label: "400%", value: 4 },
    { label: "500%", value: 5 },
];

function DocumentViewer({ pdfFile }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageInput, setPageInput] = useState(String(pageNumber));
    const [fileName, setFileName] = useState("");
    const [scaleIndex, setScaleIndex] = useState(7);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        console.log(pdfFile);
        const str = String(pdfFile).split("/");
        console.log(str[str.length - 1]);
        setFileName(str[str.length - 1]);
    };

    // Handler function for previous page click
    const handlePrevPage = () => {
        // Go to the previous page if not yet on the first page.
        setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber);
        setPageInput(pageNumber > 1 ? pageNumber - 1 : pageNumber);
    };

    // Handler function for Jump to first page click
    const handleFirstPage = () => {
        setPageNumber(1);
        setPageInput(1);
    };

    // Handler function for next page click
    const handleNextPage = () => {
        // Go to the next page if not yet on last page
        setPageNumber(pageNumber < numPages ? pageNumber + 1 : pageNumber);
        setPageInput(pageNumber < numPages ? pageNumber + 1 : pageNumber);
    };

    const handleLastPage = () => {
        setPageNumber(numPages);
        setPageInput(numPages);
    };

    const handlePageInput = (e) => {
        if (e.key === "Enter") {
            if (e.target.value > 0 && e.target.value <= numPages) {
                console.log(e.target.value);
                setPageNumber(Number(e.target.value));
            } else {
                console.log("out of bounds");
                setPageNumber(pageNumber);
            }
        }
    };

    const handleScaleChange = (e) => {
        setScaleIndex(scaleValue.findIndex((s) => s.value === e.value));
    };

    const handleZoomIn = () => {
        setScaleIndex(scaleIndex < 16 ? scaleIndex + 1 : scaleIndex);
    };

    const handleZoomOut = () => {
        setScaleIndex(scaleIndex > 0 ? scaleIndex - 1 : scaleIndex);
    };

    const MyDoc = () => {
        return (
            <Document
                className="pdf-file-container"
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page
                    pageNumber={pageNumber}
                    scale={scaleValue[scaleIndex].value}
                />
            </Document>
        );
    };

    return (
        <div className="pdf-view-container">
            <div className="pdf-controls-container">
                <div className="file-label-here">{fileName}</div>

                <div className="pagination-container">
                    <button
                        disabled={pageNumber === 1}
                        className="btn pagination-button"
                        onClick={handleFirstPage}
                    >
                        <i className="pagination-icon fa fa-angle-double-left" />
                    </button>
                    <button
                        disabled={pageNumber === 1}
                        className="btn pagination-button"
                        onClick={handlePrevPage}
                    >
                        <i className="pagination-icon fa fa-angle-left" />
                    </button>
                    <span className="page-label">
                        <input
                            className="page-input"
                            name={"pagenum"}
                            value={pageInput}
                            min={1}
                            max={numPages}
                            onChange={(e) => setPageInput(e.target.value)}
                            onKeyDown={handlePageInput}
                        />{" "}
                        of {numPages}
                    </span>
                    <button
                        disabled={pageNumber === numPages}
                        className="btn pagination-button"
                        onClick={handleNextPage}
                    >
                        <i className="pagination-icon fa fa-angle-right" />
                    </button>
                    <button
                        disabled={pageNumber === numPages}
                        className="btn pagination-button"
                        onClick={handleLastPage}
                    >
                        <i className="pagination-icon fa fa-angle-double-right" />
                    </button>

                    <span>|</span>

                    <button
                        className="btn zoom-in-btn"
                        disabled={scaleIndex === 2}
                        onClick={handleZoomIn}
                    >
                        <i className="fa fa-search-plus" />
                    </button>

                    <Select
                        className="zoom-value-input"
                        options={scaleValue}
                        placeholder={scaleValue[scaleIndex].label}
                        value={scaleValue[scaleIndex].label}
                        onChange={handleScaleChange}
                        isSearchable={false}
                    />

                    <button
                        className="btn zoom-out-btn"
                        disabled={scaleIndex === 0}
                        onClick={handleZoomOut}
                    >
                        <i className="fa fa-search-minus" />
                    </button>
                </div>

                <div className="download-button-container">
                    <a href={pdfFile}>
                        <button className="btn download-btn">
                            <i className="fa fa-download" />
                        </button>
                    </a>
                </div>
            </div>
            <div className="main-document-container">
                <MyDoc />
            </div>
        </div>
    );
}

export default DocumentViewer;
