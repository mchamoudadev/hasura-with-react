import { gql } from "@apollo/client";

export const REGISTER_POST = gql`

    mutation registerPost($title: String, $body: String, $thumbnail: String){
        insert_posts(objects: {title: $title, body: $body, thumbnail: $thumbnail }){
            returning{
                id
                title
                body
                thumbnail
            }
        }
    }

`;


export const UPDATE_POST = gql`

    mutation updatePost($id:Int, $title: String, $body: String, $thumbnail: String){
        update_posts(where: {id: {_eq: $id}}, _set: {body: $body, thumbnail: $thumbnail, title: $title}){
            returning{
                id
                date
                body
                thumbnail
                title
            }
        }
    }

`;



export const DELETE_POST = gql`
    mutation deletePost($id: Int) {
    delete_posts(where: {id: {_eq: $id}}) {
        returning{
        id
        date
        body
        thumbnail
        title

    }
    }
}
`;