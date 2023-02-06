import { gql, useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { GET_ALL_POSTS } from "../../graphql/queries";
import { GET_ALL_SUBS_POSTS } from "../../graphql/subsciptions";
import { Post } from "../Post/Post";
import { Grid } from "./Style";

export const Posts = () => {
	// useMutation DELETE UPDATE INSERT
	// useQuery  --- READ
	//useSubscriptions -- REAL TIME DATA

	// const { data, loading, error } = useQuery(GET_ALL_POSTS);
	const { data, loading, error } = useSubscription(GET_ALL_SUBS_POSTS);

	// console.log(data.posts);

	if (error) {
		console.error(error);
		return <h2>Oh , uh something went wrong...</h2>;
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<Grid>
			{data.posts.map((post, index) => (
				<Post index={index} key={post.id} {...post} />
			))}
		</Grid>
	);
};
