import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../gql/user.gql";
import Home from "../Home/Home";
import Consumption from "../Consumption/Consumption";

type TokenCheckProps = {
  token: String;
};

const TokenCheck: React.FC<TokenCheckProps> = ({ token }) => {
  const { data, loading, error } = useQuery(GET_USER);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! Invalid token</div>;

  // Check if the token is active.
  const subscribed = data.viewer.homes[0].currentSubscription;

  if (subscribed !== null) {
    return (
      <div>
        <Home />
        <Consumption />
      </div>
    );
  } else {
    return <div>You don't have an active subscription</div>;
  }
};

export default TokenCheck;
