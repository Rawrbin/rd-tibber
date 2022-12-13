import { gql } from "@apollo/client";

export const GET_CONSUMPTION_DATA_SELECTED_MONTH = gql`
  query getConsumptionData($first: Int, $after: String, $hours: Int, $monthHour: String) {
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
            cost
            unitPrice
            unitPriceVAT
            consumption
            consumptionUnit
          }
        }
        usageWat: consumption(resolution: HOURLY, first: $hours, after: $monthHour) {
          nodes {
            consumption
            from
          }
        }
      }
    }
  }
`;

// currentSubscription - priceInfo will handle monthly average Nordpool price.
// consumption - with hourly can handle average 3 highest consumed hours.
// consumption - with monthly can handle monthly cost, usage and detail break down of cost for the month.
