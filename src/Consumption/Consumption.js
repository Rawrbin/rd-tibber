import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONSUMPTION_DATA_SELECTED_MONTH } from "../gql/price.gql";
import "./Consumption.css";

const Consumption = () => {
  const [activeMonth, setActiveMonth] = useState("");
  const [encodedMonth, setEncodedMonth] = useState("");

  const { data, loading, error } = useQuery(GET_CONSUMPTION_DATA_SELECTED_MONTH, {
    variables: { after: encodedMonth },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // TODO: Make user select a month
  const changeMonth = (month) => {
    if (month === "nov") {
      setActiveMonth("nov");
      setEncodedMonth("MjAyMi0xMC0zMVQwMDowMDowMC4wMDArMDE6MDA=");
    }
    if (month === "dec") {
      setActiveMonth("dec");
      setEncodedMonth("MjAyMi0xMS0zMFQwMDowMDowMC4wMDArMDE6MDA=");
    }
  };

  // Variables
  const costPrice = data.viewer.homes[0].consumption.nodes[0].cost.toFixed(2);
  const powerConsumption = data.viewer.homes[0].consumption.nodes[0].consumption.toFixed(2);
  const unitPriceWithVatWithoutMarkUp = data.viewer.homes[0].consumption.nodes[0].unitPrice.toFixed(5) - 0.01;

  // Variables strømstøtte
  const dailyNordpoolCostData = data.viewer.homes[0].currentSubscription.priceInfo.range.nodes;
  const averagePriceNordpoolCostData = dailyNordpoolCostData.reduce((a, v) => (a = a + v.energy), 0);
  const averageMonthPrice = averagePriceNordpoolCostData / dailyNordpoolCostData.length;
  const powerSubsidy = (averageMonthPrice * 1.25 - 0.875) * 0.9;
  const estimatedTotalPowerSubsidy = (powerSubsidy * powerConsumption).toFixed(2);

  return (
    <>
      <div className="month-header">Select a month</div>
      <div className="month-selection">
        <div onClick={() => changeMonth("nov")} className={activeMonth === "nov" ? "month active" : "month"}>
          November
        </div>
        <div onClick={() => changeMonth("dec")} className={activeMonth === "dec" ? "month active" : "month"}>
          December
        </div>
      </div>
      {activeMonth !== "" && (
        <>
          <div className="consumption-header">Consumption</div>
          <div className="consumption-description">Below you'll find data for selected period</div>
          <div>
            <div className="consumption-cost-summary">
              Power consumption cost for selected month: <span>{costPrice}</span> kr
            </div>
            <div className="consumption-cost-details">
              {powerConsumption} kWh at {unitPriceWithVatWithoutMarkUp} kr/kWh and 1 øre mark up each kWh (+{powerConsumption * 0.01})
            </div>
          </div>
          <div>
            Your estimated power subsidy for selected month: <span>{estimatedTotalPowerSubsidy} kr</span>
          </div>
          <div className="consumption-cost-details">
            Subsidy based by {powerSubsidy.toFixed(4)} kr/kWh with usage of {powerConsumption} kWh
          </div>
          <div>Nordpool average kWh cost for November: {averageMonthPrice.toFixed(4)}</div>
        </>
      )}
    </>
  );
};

export default Consumption;
