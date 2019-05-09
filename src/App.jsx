import React from "react";
import Graph from "./components/graph";
import Table from "./components/table";
import CalanderSelector from "./components/calanderSelector";
import "./App.css";

let chartData = [];
let sortedAPIData = [];
const MAP_OPTION_TO_STATE = {
  date: "ascendingDate",
  game: "ascendingGame",
  revenue: "ascendingRevenue",
  impressions: "ascendingImpressions"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      chartData: [],
      filteredChartData: [],
      sortedData: [],
      from: 1554854400000, // 2019-02-10
      to: 1555632000000, // 2019-02-19
      ascendingDate: false,
      ascendingGame: false,
      ascendingRevenue: false,
      ascendingImpressions: false,
      sliceFrom: 5,
      sliceTo: 10,
      slicedData: []
    };
  }

  handleGraph = () => {
    const { chartData, to, from } = this.state;
    let newChartData = chartData.filter(
      item =>
        new Date(item.x).getTime() >= from && new Date(item.x).getTime() <= to
    );
    this.setState({ filteredChartData: newChartData });
  };

  // get time stamp from IST
  getFromTimestamp = date => {
    this.setState(
      {
        from: new Date(date.target.value).getTime()
      },
      () => this.handleGraph()
    );
  };

  // get time stamp from IST
  getToTimestamp = date => {
    this.setState(
      {
        to: new Date(date.target.value).getTime()
      },
      () => this.handleGraph()
    );
  };

  // Manage state for sort clicks
  handleSortClick = (sortBy = "date") => {
    this.setState(
      {
        [MAP_OPTION_TO_STATE.sortBy]: !this.state[MAP_OPTION_TO_STATE.sortBy]
      },
      () => {
        this.sortApiData(
          sortBy,
          this.state[MAP_OPTION_TO_STATE.sortBy] ? "ascending" : "desc"
        );
      }
    );
  };

  // Sort column based on sortby prop
  sortApiData = (sortBy = "date", order = "ascending") => {
    let slicedData;
    const { sortedData } = this.state;
    if (order === "ascending") {
      if (sortBy === "date") {
        slicedData = sortedData.sort((a, b) =>
          a.timestamp < b.timestamp ? -1 : 1
        );
      } else if (sortBy === "game") {
        slicedData = sortedData.sort((a, b) => (a.game < b.game ? -1 : 1));
      } else if (sortBy === "revenue") {
        slicedData = sortedData.sort((a, b) =>
          a.revenue < b.revenue ? -1 : 1
        );
      } else {
        slicedData = sortedData.sort((a, b) =>
          a.impressions < b.impressions ? -1 : 1
        );
      }
    } else {
      if (sortBy === "date") {
        slicedData = sortedData.sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : 1
        );
      } else if (sortBy === "game") {
        slicedData = sortedData.sort((a, b) => (a.game > b.game ? -1 : 1));
      } else if (sortBy === "revenue") {
        slicedData = sortedData.sort((a, b) =>
          a.revenue > b.revenue ? -1 : 1
        );
      } else {
        slicedData = sortedData.sort((a, b) =>
          a.impressions > b.impressions ? -1 : 1
        );
      }
    }

    sortedAPIData.length = 0;
    slicedData.map(item => {
      sortedAPIData.push({
        timestamp: item.timestamp,
        game: item.game,
        revenue: item.revenue,
        impressions: item.impressions
      });
    });
    this.setState({ sortedData: sortedAPIData.slice(0, 5) });
  };

  // Set sortedData state
  setSortedDataState = () => {
    const { sliceFrom, sliceTo, apiData } = this.state;
    const data = apiData.slice(sliceFrom, sliceTo);
    this.setState({
      sortedData: data
    });
  };

  // Handle previous button
  handlePrevious = () => {
    const { sliceTo, sliceFrom, apiData } = this.state;
    this.setState(
      {
        sliceFrom: sliceFrom < 5 ? sliceFrom : sliceFrom - 5,
        sliceTo: sliceTo < 10 ? sliceTo : sliceTo - 5,
        slicedData: apiData.slice(sliceFrom, sliceTo)
      },
      () => this.setSortedDataState()
    );
  };

  // Handle next button
  handleNext = () => {
    const { sliceTo, sliceFrom, apiData } = this.state;
    this.setState(
      {
        sliceFrom: sliceFrom < apiData.length - 5 ? sliceFrom + 5 : sliceFrom,
        sliceTo: sliceTo > apiData.length - 1 ? apiData.length : sliceTo + 5,
        slicedData: apiData.slice(sliceFrom, sliceTo)
      },
      () => this.setSortedDataState()
    );
  };

  async componentWillMount() {
    const apiData = [];
    await fetch("https://www.mocky.io/v2/5cd04a20320000442200fc10")
      .then(res => res.json())
      .then(data => {
        data.map(item => {
          apiData.push({
            timestamp: item.timestamp,
            game: item.game,
            revenue: item.revenue,
            impressions: item.impressions
          });
          chartData.push({
            x: item.timestamp,
            y: (item.revenue / item.impressions) * 1000
          });
        });
        this.setState(
          {
            apiData: apiData,
            sortedData: apiData,
            chartData,
            filteredChartData: chartData
          },
          () => this.sortApiData("date", "desc")
        );
      });
  }

  render() {
    const { apiData, filteredChartData, sortedData, to, from } = this.state;
    return (
      <div className="container my-5">
        <div className="col-12 mb-5">
          <CalanderSelector
            from={from}
            to={to}
            apiData={apiData}
            getFromTimestamp={this.getFromTimestamp}
            getToTimestamp={this.getToTimestamp}
          />
        </div>
        <div className="col-12 mb-5 bg-dark">
          <Graph filteredChartData={filteredChartData} />
        </div>
        <div className="col-12 mb-5 overflow-auto px-0">
          <Table
            sortedData={sortedData}
            handleSortClick={this.handleSortClick}
            handlePrevious={this.handlePrevious}
            handleNext={this.handleNext}
          />
        </div>
      </div>
    );
  }
}

export default App;
