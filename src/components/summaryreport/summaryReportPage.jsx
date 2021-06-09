import React, { useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
// import ResourceService from "../../services/resourceService";
import PersonService from "../../services/personService";
import DocumentViewer from "./documentViewer";
import { jwtPrivateKey } from "../../config.json";
import PropagateLoader from "react-spinners/PropagateLoader";

import Merged from "../../download/Merged.pdf";
import Books from "../../download/Books.pdf";
import SpThesis from "../../download/spThesis.pdf";

import "./summaryReportStyle.css";

export default function SummaryReportPage({ user }) {
    const FilterOptions = [
        { label: "All", value: Merged },
        { label: "Books", value: Books },
        { label: "SP/Thesis", value: SpThesis },
    ];

    const [selection, setSelection] = useState(FilterOptions[0].label);
    const [pdfFile, setPdfFile] = useState(Merged);
    const history = useHistory();

    // UseEffect to get the summary report from the backend.
    // useEffect(() => {
    //     generateSummary();
    // }, []);

    // const generateSummary = async () => {
    //     try {
    //         await ResourceService.generateReport("all");
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     return "";
    // };

    const accessPrivilege = () => {
        setTimeout(() => {
            try {
                const user = PersonService.decryptToken(
                    localStorage.getItem(jwtPrivateKey)
                );
                if (!user || (user && user.userType !== 1))
                    return history.push("/unauthorized");
            } catch (err) {
                return history.push("/unauthorized");
            }
        }, 700);
    };

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
                <h1 style={{"whiteSpace": "nowrap"}}>Summary Report</h1>
            </div>
        );
    };

    return (
        <>
            {user && user.userType === 1 ? (
                <div className="summary-report-container">
                    {/* {generateSummary()} */}
                    <ResourceTypeSelect className="summary-header" />
                    <DocumentViewer pdfFile={pdfFile} />
                </div>
            ) : (
                <div
                    style={{
                        minHeight: "80vh",
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <PropagateLoader
                        color={"#0067a1"}
                        speedMultiplier={2}
                        loading={true}
                        size={20}
                    />
                    {accessPrivilege()}
                </div>
            )}
        </>
    );
}
