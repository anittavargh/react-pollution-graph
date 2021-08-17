import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chart from "react-apexcharts";
import "./Graph.css";
import { fetchData } from "../redux";

function Graph() {
  // const [pollutionData, setPollutionData] = useState([]);
  const [date, setDate] = useState();
  const [dateTime, setDateTime] = useState([]);
  const [pollutantValue, setPollutantValue] = useState([]);

  const dispatch = useDispatch();
  const pollutionData = useSelector((state) => state && state.users);
  console.log("data-pollution", pollutionData);

  useEffect(() => {
    dispatch(fetchData());

    // fetch(
    //   "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2021-08-06T08%3A55%3A00%2B00%3A00&limit=1000&page=1&offset=0&sort=desc&parameter=o3&radius=1000&country_id=IN&city=Delhi&location_id=10487&order_by=datetime"
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const dateValues = data.results.map((obj) => {
    //       return {
    //         date: obj.date.utc,
    //         pollutant_value: obj.value,
    //       };
    //     });
    //     setPollutionData(dateValues);
    //   });
  }, [date]);

  const handleData = (date) => {
    setDateTime([]);
    setPollutantValue([]);
    setDate(date);
    console.log("selected date", date);
    // const requiredData = Object.values(pollutionData)
    const requiredData = Object.values(pollutionData)

      .map((ele) => {
        var convertDatetimeToDate = new Date(ele.date);
        const convertedToDate = convertDatetimeToDate
          .toISOString()
          .substring(0, 10);
        if (convertedToDate == date) {
          return ele;
        }
      })
      .filter((e) => e);
    // console.log("req",requiredData)

    requiredData.map((ele) =>
      setDateTime((prevArray) => [...prevArray, ele.date])
    );
    requiredData.map((ele) =>
      setPollutantValue((prevArray) => [...prevArray, ele.pollutant_value])
    );
  };

  const chartCharachteristics = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: dateTime,
      },
    },
    series: [
      {
        name: "series-1",
        data: pollutantValue,
      },
    ],
  };

  return (
    <div className="graph-page">
      <h1>
        Graph for finding the pollutant value of city Anand Vihar for the
        selected date
      </h1>
      <form>
        <div className="form-group">
          <input
            name="date"
            type="date"
            placeholder="Enter date"
            value={date}
            onChange={(e) => {
              handleData(e.target.value);
            }}
          />
        </div>
      </form>
      <Chart {...chartCharachteristics} width="1000" />
    </div>
  );
}

export default Graph;
