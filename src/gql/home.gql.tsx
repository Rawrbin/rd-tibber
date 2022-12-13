import { gql } from "@apollo/client";
export const GET_USER_AND_HOME = gql`
  query getUser {
    viewer {
      homes {
        address {
          address1
        }
        owner {
          firstName
        }
        currentSubscription {
          priceInfo {
            current {
              total
            }
          }
        }
      }
    }
  }
`;
