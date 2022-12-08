import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_MONTH2 } from "../gql/price.gql";
import "./Consumption.css";

const ConsumptionSupport = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_MONTH2);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // TODO: Calculate "strømstøtte"

  const costData = data.viewer.homes[0].currentSubscription.priceInfo.range.nodes;
  const costDataSummary = costData.reduce((a,v) =>  a = a + v.energy , 0 );
  const averageMonthPrice = (costDataSummary / costData.length);
  //const costData = data.viewer.homes[0].consumption.nodes;
  //const costDataSummary = costData.reduce((a,v) =>  a = a + v.unitPrice , 0 );

  return (
    <>
      <div>Nordpool cost for November: {averageMonthPrice}</div>
      <div></div>
    </>
  );
};

export default ConsumptionSupport;
