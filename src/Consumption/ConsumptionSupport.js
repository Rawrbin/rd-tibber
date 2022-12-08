import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_MONTH } from "../gql/price.gql";
import "./Consumption.css";

const ConsumptionSupport = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_MONTH);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // TODO: Calculate "strømstøtte"
  const costData = data.viewer.homes[0].consumption.nodes;
  const costDataSummary = costData.reduce((a,v) =>  a = a + v.unitPrice , 0 );

  return (
    <>
      <div>Cost so far this month (hourly summed): {costDataSummary.toFixed(2)}</div>
      <div></div>
    </>
  );
};

export default ConsumptionSupport;
