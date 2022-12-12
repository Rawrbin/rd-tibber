import { gql } from "@apollo/client";

export const GET_CONSUMPTION_DATA_SELECTED_MONTH = gql`
  query getConsumptionData($first: Int, $after: String) {
    viewer {
      homes {
        currentSubscription {
          priceInfo {
            range(resolution: DAILY, first: $first, after: $after) {
              nodes {
                energy
                startsAt
                currency
              }
            }
          }
        }
      }
    }
    viewer {
      homes {
        consumption(resolution: MONTHLY, first: 1, after: $after) {
          nodes {
            from
            to
            cost
            unitPrice
            unitPriceVAT
            consumption
            consumptionUnit
          }
        }
      }
    }
  }
`;
