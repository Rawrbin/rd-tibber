import { gql } from "@apollo/client";
export const GET_LAST_MONTH = gql`
  query getLastMonth {
    viewer {
      homes {
        consumption(resolution: MONTHLY, last: 1) {
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
