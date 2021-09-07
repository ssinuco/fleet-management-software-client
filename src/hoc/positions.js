import { gql } from "@apollo/client";

export const POSITIONS = gql`
query Positions($taxiId: String!, $date: String!) {
  trajectories(taxiId: $taxiId, date: $date) {
    id
    taxiId
    date
    latitude
    longitude
  }
}
`
