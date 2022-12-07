import { gql } from "@apollo/client";
export const GET_USER_AND_HOME = gql`
  query getUser {
    viewer {
      name
    }
    viewer {
      homes {
        timeZone
        address {
          address1
          postalCode
          city
        }
        owner {
          firstName
          lastName
          contactInfo {
            email
            mobile
          }
        }
        consumption(resolution: HOURLY, last: 1) {
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
        currentSubscription {
          status
          priceInfo {
            current {
              total
              energy
              tax
              startsAt
            }
          }
        }
      }
    }
  }
`;

export const GET_HOME = gql`
  query getHome {
    viewer {
      homes {
        address {
          address1
          address2
          address3
          postalCode
          city
          country
          latitude
          longitude
        }
      }
    }
  }
`;
