import React, { Fragment } from "react";
import "../App.css";

const CalanderSelector = ({
  from,
  to,
  apiData,
  getFromTimestamp,
  getToTimestamp
}) => {
  const to_ISO = new Date(to).toISOString().split("T")[0];
  const from_ISO = new Date(from).toISOString().split("T")[0];
  const minDate =
    apiData.length > 0 ? apiData[apiData.length - 1].timestamp : "2019-04-10";
  const maxDate = apiData.length > 0 ? apiData[0].timestamp : "2019-04-19";
  return (
    <Fragment>
      <p className="pt-4 font-weight-bold">Select Date range to update graph as per requirements.</p>
      <div className="row">
        <div className="col">
          <label htmlFor="fromDate" className="col-sm-2 pl-0 col-form-label">
            From
          </label>
          <input
            type="date"
            name="fromDate"
            id="fromDate"
            min={minDate}
            max={to_ISO}
            onChange={getFromTimestamp}
            className="form-control"
            defaultValue={from_ISO}
          />
        </div>
        <div className="col">
          <label htmlFor="ToDate" className="col-sm-2 pl-0 col-form-label">
            To
          </label>
          <input
            type="date"
            name="ToDate"
            id="ToDate"
            min={from_ISO}
            max={maxDate}
            onChange={getToTimestamp}
            className="form-control"
            defaultValue={to_ISO}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CalanderSelector;
