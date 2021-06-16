//filter field for resources
//components: div container, search filters

import React, { useState } from "react";
import Select from "react-select";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";
import ResourceServices from "../../services/resourceService";

const resourceType = [
  { value: "Special Problem", label: "Special Problem" },
  { value: "Thesis", label: "Thesis" },
  { value: "Book", label: "Book" },
];

const FiltersContainerRes = () => {
    const [year, setYear] = useState(0);
    const [type, setType] = useState("");

    //   console.log(year);
    //   console.log(type);

    const handleFilter = async (event) => {
        event.preventDefault();
        try {
        const filter = {
            type,
            year,
        };

        //   console.log(filter);
        const { data } = await ResourceServices.addSpThesis(filter);
        //   console.log(data);
        } catch (err) {
        if (err.response && err.response.data) {
            console.log(err.response.data.errorMessage);
        }
        }
    };

    return (
        <div className="res-filter-container">
            <Select
                className="res-filters"
                id="res-category"
                placeholder={"Resource Type"}
                options={resourceType}
                value={resourceType.find((obj) => obj.value === type)}
                onChange={(e) => setYear(e.target.value)}
            />


        <div className="res-clrbtn">
            <a id="res-filters-clear" href="#">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
            >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Clear all filters
            </a>
        </div>
        </div>
    );
    };

    export default FiltersContainerRes;
