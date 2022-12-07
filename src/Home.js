import React from "react";
import { useQuery } from "@apollo/client";
import "./Home.css";
import { GET_USER_AND_HOME } from "./gql/home.gql";

const Home = () => {
  const { data, loading, error } = useQuery(GET_USER_AND_HOME);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div className="welcome-user">
        Hi, <span>{data?.viewer?.name}</span>
      </div>
      <div className="address-selection">
        Displaying data for: <span>{data?.viewer?.homes[0].address.address1}</span>
      </div>
      <div>
        Current Price: <span>{data?.viewer?.homes[0].currentSubscription.priceInfo.current.total.toFixed(2)}</span> NOK kWh
      </div>
    </div>
  );
};

export default Home;
