import React, { Fragment } from "react";
import "../App.css";

const OfflinePage = ({ filteredChartData }) => {
  return (
    <Fragment>
      <div className="bg-dark container-fluid py-5 text-center text-white">
        <h1 className="set-pos">App is Offline, Please check internet connectivity</h1>
      </div>
    </Fragment>
  );
};

export default OfflinePage;
