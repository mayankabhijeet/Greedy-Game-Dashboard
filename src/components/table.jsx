import React, { Fragment } from "react";
import "../App.css";

const Table = ({ handleSortClick, sortedData, handlePrevious, handleNext }) => {
  return (
    <Fragment>
      <p className="mb-1 small">Sort any column by clicking on column head</p>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col" onClick={() => handleSortClick("date")}>
              Date
            </th>
            <th scope="col" onClick={() => handleSortClick("game")}>
              Game
            </th>
            <th scope="col" onClick={() => handleSortClick("revenue")}>
              Revenue
            </th>
            <th scope="col" onClick={() => handleSortClick("impressions")}>
              Impressions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, i) => {
            return (
              <tr key={i}>
                <th scope="row">{item.timestamp}</th>
                <td>{item.game}</td>
                <td>{item.revenue}</td>
                <td>{item.impressions}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={handlePrevious}>
              Previous
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={handleNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Table;
