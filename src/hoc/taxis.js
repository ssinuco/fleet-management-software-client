import { gql } from "@apollo/client";

export const TAXIS = gql`
query TaxisQuery($query: String, $page: Int, $pageSize: Int) {
  taxis(query: $query, page: $page, pageSize: $pageSize) {
    id
    plate
  }
}
`
