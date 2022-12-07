import { gql } from "@apollo/client";
export const qglWebsocketSubscriptionUrl = gql`
  query getWebsocketSubscriptionUrl {
    viewer {
      websocketSubscriptionUrl
    }
  }
`;
