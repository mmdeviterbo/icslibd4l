//filter field for resources
//components: div container, search filters

import React, { useState } from "react";
import Select from "react-select";
import Link from 'react-router-dom';
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

  const handleFilter = async (event) => {
    event.preventDefault();
    try {
      const filter = {
        type,
        year,
      };
      await ResourceServices.addSpThesis(filter);
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

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div style={{ marginLeft: "2rem" }} className="picker">
          <DatePicker
            selected={year}
            value={year}
            views={["year"]}
            onChange={(year) => setYear(year)}
            animateYearScrolling
            isclearable="true"
            placeholder={"Year"}
            style={{ width: "50px" }}
          />
          <IconButton
            edge="end"
            size="small"
            disabled={!year}
            onClick={() => setYear(null)}
          >
            <ClearIcon />
          </IconButton>
        </div>
      </MuiPickersUtilsProvider>

      {/* <Select
                className="res-filters"
                placeholder={"Related Courses"}
                id="res-related-courses"
                options={courseList}
                isMulti
            />
            <Select className="res-filters" id="res-author/publisher" /> */}
      <button onClick={handleFilter}>Apply Filters</button>

      <div className="res-clrbtn">
        <Link id="res-filters-clear" href="#">
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
        </Link>
      </div>
    </div>
  );
};

export default FiltersContainerRes;
