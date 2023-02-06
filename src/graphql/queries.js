import { gql } from "@apollo/client";

export const GET_POST = gql`
    query myQuery($id: Int) {
    posts(where: {id: {_eq:$id}}) {
        title
        body
        date
        id
        thumbnail
    }
}
`;


export const GET_ALL_POSTS = gql`
	query myQuery {
		posts {
			id
            date
            body
            thumbnail
            title
		}
	}
`;