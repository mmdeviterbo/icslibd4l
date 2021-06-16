import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import ResourceService from "../../services/resourceService";
import PersonService from "../../services/personService";
import SummaryTable from "./summaryTable";
import { jwtPrivateKey } from "../../config.json";
import PropagateLoader from "react-spinners/PropagateLoader";

import "../../styles/summaryReport/summaryReportPage.css";

/****************************************************************************
 * Type: Functional Component
 *
 * Summary:
 * Main container for the summary report page
 ****************************************************************************/
export default function SummaryReportPage({ user }) {
    const FilterOptions = [
        { label: "Books", value: "books" },
        { label: "SP/Thesis", value: "spthesis" },
    ];

    const [selection, setSelection] = useState(FilterOptions[0].label);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    /****************************************************************************
     * Type: React Hooks (useEffect)
     *
     * Summary:
     * Generates new pdf files at page refresh
     ****************************************************************************/
    useEffect(() => {
        const generateSummary = async (type) => {
            try {
                await ResourceService.generateReport(type).then();
            } catch (error) {}
        };
        generateSummary("all");
    }, []);

    /****************************************************************************
     * Type: Function
     *
     * Summary:
     * Checks if the currently logged in user is authorized to access
     * summary report page.
     ****************************************************************************/
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
            setIsLoading(false);
        }, 700);
    };

    /****************************************************************************
     * Type: Function
     *
     * Summary:
     * Handler funmction for when the react-select component selection was change.
     * Sets the current selection to the label fo the currently selected option.
     ****************************************************************************/
    const handleChange = (e) => {
        setSelection(e.label);
    };

    /****************************************************************************
     * Type: Functional Component
     *
     * Summary:
     * React component containing the react-select field with its container.
     ****************************************************************************/
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
                <h1 style={{ whiteSpace: "nowrap" }}>Summary Report</h1>
            </div>
        );
    };

    return (
        <>
            {user && user.userType === 1 ? (
                isLoading ? (
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
                ) : (
                    <div className="summary-report-container">
                        <ResourceTypeSelect className="summary-header" />
                        <SummaryTable resourceFilter={selection} />
                    </div>
                )
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
