import React, { useEffect, useState } from "react";
import Select from "react-select";
import ResourceService from "../../services/resourceService";
import DocumentViewer from "./documentViewer";

import Merged from "../../download/Merged.pdf";
import Books from "../../download/Books.pdf";
import SpThesis from "../../download/spThesis.pdf";

import "./summaryReportStyle.css";

const FilterOptions = [
    { label: "All", value: Merged },
    { label: "Books", value: Books },
    { label: "SP/Thesis", value: SpThesis },
];

export default function SummaryReportPage(user) {
    const [selection, setSelection] = useState(FilterOptions[0].label);
    const [pdfFile, setPdfFile] = useState(Merged);

    // UseEffect to get the summary report from the backend.
    // useEffect(() => {
    //     // Calls backend to generate a new pdf file of the selected resourceType
    //     const generateSummary = async () => {
    //         try {
    //             await ResourceService.generateReport("all");
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     generateSummary();
    // }, []);

    const handleChange = (e) => {
        setSelection(e.label);
        setPdfFile(e.value);
    };

    const ResourceTypeSelect = () => {
        return (
            <div className="summary-header-container">
                <div className="resource-label">
                    <div className="generate-header-label">
                        <h3>View summary report for: </h3>
                    </div>
                    <Select
                        className="resource-type-selector"
                        options={FilterOptions}
                        placeholder={selection}
                        onChange={handleChange}
                    />
                </div>
                <h1>Summary Report</h1>
            </div>
        );
    };

    return (
        <div className="summary-report-container">
            <ResourceTypeSelect className="summary-header" />
            <DocumentViewer pdfFile={pdfFile} />
        </div>
    );
}
