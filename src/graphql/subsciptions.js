import { gql } from "@apollo/client";

export const GET_ALL_SUBS_POSTS = gql`
	subscription myQuery {
        posts(order_by: {date: desc}) {
                body
                id
                date
                thumbnail
                title
  }
	}
`;