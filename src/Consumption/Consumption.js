import React, { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_LAST_MONTH } from "../gql/price.gql";
import "./Consumption.css";
import { months } from "./months";

const Consumption = () => {
  const [activeMonth, setActiveMonth] = useState("");
  const { data, loading, error } = useQuery(GET_LAST_MONTH);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // TODO: Make user select a month
  const fromDate = format(new Date(data.viewer.homes[0].consumption.nodes[0].from), "dd.MMM yy");
  const toDate = format(new Date(data.viewer.homes[0].consumption.nodes[0].to), "dd.MMM yy");

  // Variables
  const costPrice = data.viewer.homes[0].consumption.nodes[0].cost.toFixed(2);
  const powerConsumption = data.viewer.homes[0].consumption.nodes[0].consumption.toFixed(2);
  const unitPriceWithVatWithoutMarkUp = data.viewer.homes[0].consumption.nodes[0].unitPrice.toFixed(5) - 0.01;

  // Unused variables
  // const unitPriceWithVat = data.viewer.homes[0].consumption.nodes[0].unitPrice.toFixed(2);
  // const markUpPrice = powerConsumption - powerConsumption * 0.01;
  // const vatPrice = data.viewer.homes[0].consumption.nodes[0].unitPriceVAT.toFixed(2);

  // TODO: Calculate "strømstøtte"

  // TODO: Get selected month. 'before: "MjAyMi0xMC0wMVQwMDowMDowMC4wMDArMDE6MDA=")'.
  // NOTE: 2022-09-01T00:00:00.000 to BASE64 MjAyMi0wOS0wMVQwMDowMDowMC4wMDA=

  return (
    <>
      Month selection not activated
      <div className="month-selection">
        {months.map((month) => {
          return (
            <div
              key={month.id}
              className={activeMonth === month.name ? "month active" : "month"}
              onClick={(e) => setActiveMonth(month.name)}
            >
              {month.name}
            </div>
          );
        })}
      </div>
      {activeMonth !== "" && (
        <>
          <div className="consumption-header">Consumption</div>
          <div className="consumption-description">Below you'll find data for selected period</div>
          <div className="consumption-selected-period">
            {fromDate} - {toDate}
          </div>
          {data.viewer.homes[0].consumption.nodes[0].to}
          <div>
            <div className="consumption-cost-summary">
              Power consumption cost for selected month: <span>{costPrice}</span> kr
            </div>
            <div className="consumption-cost-details">
              {powerConsumption} kWh at {unitPriceWithVatWithoutMarkUp} øre/kWh and 1 øre mark up each kWh (+{powerConsumption * 0.01})
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Consumption;
