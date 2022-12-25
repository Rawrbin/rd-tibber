import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONSUMPTION_DATA_SELECTED_MONTH } from "../gql/price.gql";
import "./Consumption.css";

const Consumption = () => {
  const [activeMonth, setActiveMonth] = useState("");
  const [amountOfDays, setAmountOfDays] = useState(0);
  const [amountOfHours, setAmountOfHours] = useState(0);
  const [encodedMonth, setEncodedMonth] = useState("");
  const [encodedDays, setEncodedDays] = useState("");

  const { data, loading, error } = useQuery(GET_CONSUMPTION_DATA_SELECTED_MONTH, {
    variables: { first: amountOfDays, after: encodedMonth, hours: amountOfHours, monthHour: encodedDays },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const changeMonth = (month: String) => {
    if (month === "August") {
      setActiveMonth("August");
      setAmountOfDays(31);
      setAmountOfHours(744);
      // 2022-07-31
      setEncodedMonth("MjAyMi0wNy0zMQ==");
      setEncodedDays("MjAyMi0wOC0wMQ==");
    }
    if (month === "September") {
      setActiveMonth("September");
      setAmountOfDays(30);
      setAmountOfHours(720);
      // 2022-08-31
      setEncodedMonth("MjAyMi0wOC0zMQ==");
      setEncodedDays("MjAyMi0wOS0wMQ==");
    }
    if (month === "October") {
      setActiveMonth("October");
      setAmountOfDays(31);
      setAmountOfHours(744);
      // 2022-09-30
      setEncodedMonth("MjAyMi0wOS0zMA==");
      setEncodedDays("MjAyMi0xMC0wMQ==");
    }
    if (month === "November") {
      setActiveMonth("November");
      setAmountOfDays(30);
      setAmountOfHours(720);
      // 2022-10-31
      setEncodedMonth("MjAyMi0xMC0zMQ==");
      setEncodedDays("MjAyMi0xMS0wMQ==");
    }
    if (month === "December") {
      setActiveMonth("December");
      setAmountOfDays(31);
      setAmountOfHours(744);
      setEncodedMonth("MjAyMi0xMS0zMA==");
      setEncodedDays("MjAyMi0xMi0wMQ==");
    }
  };

  // Variables
  // const currency = data.viewer.homes[0].currentSubscription.priceInfo.range.nodes[0].currency;
  const costPrice = data.viewer.homes[0].consumption.nodes[0].cost.toFixed(2);
  const powerConsumption = data.viewer.homes[0].consumption.nodes[0].consumption.toFixed(2);
  const unitPriceWithVatWithoutMarkUp = data.viewer.homes[0].consumption.nodes[0].unitPrice.toFixed(5) - 0.01;

  // Variables strømstøtte
  const dailyNordpoolCostData = data.viewer.homes[0].currentSubscription.priceInfo.range.nodes;
  const averagePriceNordpoolCostData = dailyNordpoolCostData.reduce((a, v) => (a = a + v.energy), 0);
  const averageMonthPrice = averagePriceNordpoolCostData / dailyNordpoolCostData.length;
  const powerSubsidy = (averageMonthPrice * 1.25 - 0.875) * 0.9;
  const estimatedTotalPowerSubsidy = (powerSubsidy * powerConsumption).toFixed(2);

  // Find top 3 usage for a month. Get average.
  const topThreeConsumptionHours = data.viewer.homes[0].usageWat.nodes
    .map((x) => x.consumption)
    .sort((x, y) => y - x)
    .splice(0, 3);
  const averageTopThreeConsumption = topThreeConsumptionHours.reduce((a, v) => (a = a + v), 0) / 3.0;

  return (
    <React.Fragment>
      <div className="month-header">Select a month</div>
      <div className="month-selection">
        {/*<div onClick={() => changeMonth("August")} className={activeMonth === "August" ? "month active" : "month"}>
            August
          </div>*/}
        <div onClick={() => changeMonth("September")} className={activeMonth === "September" ? "month active" : "month"}>
          September
        </div>
        <div onClick={() => changeMonth("October")} className={activeMonth === "October" ? "month active" : "month"}>
          October
        </div>
        <div onClick={() => changeMonth("November")} className={activeMonth === "November" ? "month active" : "month"}>
          November
        </div>
        <div onClick={() => changeMonth("December")} className={activeMonth === "December" ? "month active" : "month"}>
          December
        </div>
      </div>
      {activeMonth !== "" && (
        <>
          <div className="consumption-header">Consumption</div>

          <div className="sub-data">Below you'll find data for {activeMonth}</div>

          <div>
            <div className="consumption-cost-summary">
              Power consumption cost for selected month: <span>{costPrice}</span>
            </div>
            <div className="sub-data">
              {powerConsumption} kWh at {unitPriceWithVatWithoutMarkUp} and 1 øre mark up each kWh (+
              {powerConsumption * 0.01})
            </div>
            <div>
              Your estimated power subsidy for selected month: <span>{estimatedTotalPowerSubsidy}</span>
              <div className="sub-data">
                Based on an average Nordpool price for {activeMonth} set at {averageMonthPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="consumption-top">
            Average top 3 usage: <span>{averageTopThreeConsumption.toFixed(2)}</span> kWh
            <div className="consumption-top-three">
              {topThreeConsumptionHours.map((amount, key) => {
                return (
                  <div className="consumption-top-three-amount" key={key}>
                    {amount}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Consumption;
