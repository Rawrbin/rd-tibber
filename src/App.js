import { useState } from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./Home";
import Consumption from "./Consumption/Consumption";

function App() {
  // State variables
  const [token, setToken] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Static variables
  const queryUrl = "https://api.tibber.com/v1-beta/gql";

  // Unused static variables
  // const feedUrl = "wss://api.tibber.com/v1-beta/gql/subscriptions";

  // Client generation
  const httpLink = createHttpLink({
    uri: queryUrl,
  });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // Handlers
  const handleSubmit = (e) => {
    setToken(inputValue);
    e.preventDefault();
  };

  const handleTokenChange = (e) => {
    const input = e.target.value;
    setInputValue(input);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Welcome</h1>
        {!token && (
          <>
            <div className="token-please">Please enter your Tibber Token</div>
            <form>
              <label aria-label="tibber token">
                <input type="text" value={inputValue} name="token" onChange={(e) => handleTokenChange(e)} />
              </label>
              <div>
                <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)} />
              </div>
            </form>
          </>
        )}
        {token && <Home token={token} />}
        {token && (
          <div className="consumption-container">
            <Consumption />
          </div>
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
