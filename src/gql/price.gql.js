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

export const GET_CURRENT_MONTH = gql`
  query getLastMonth {
    viewer {
      homes {
        consumption(resolution: HOURLY, first:744, after:"MjAyMi0xMi0wMVQwMDowMDowMC4wMDArMDE6MDA=") {
          nodes {
            from
            to
            unitPrice
            unitPriceVAT
          }
        }
      }
    }
  }
`;
