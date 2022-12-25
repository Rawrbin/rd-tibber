import { useQuery } from "@apollo/client";
import "./Home.css";
import { GET_USER_AND_HOME } from "../gql/home.gql";
import React from "react";

const Home = () => {
  const { data, loading, error } = useQuery(GET_USER_AND_HOME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div className="home-container">
      <div className="welcome-user">
        Hi, <span>{data?.viewer?.homes[0].owner.firstName}</span>
      </div>
      <div className="address-selection">
        Displaying data for: <span>{data?.viewer?.homes[0].address.address1}</span>
      </div>
      <div>
        Current Price: <span>{data?.viewer?.homes[0].currentSubscription.priceInfo.current.total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Home;
