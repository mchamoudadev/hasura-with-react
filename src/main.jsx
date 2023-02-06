import { ApolloProvider } from "@apollo/client";

// web socket
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { client } from "./apollo";
import App from "./App";
import { Header } from "./components/header/Header";
import { NewPost } from "./components/newPost/NewPost";
import { PostInfo } from "./components/PostInfo/PostInfo";
import { Posts } from "./components/posts/Posts";
import { GlobalStyle } from "./GlobalStyle";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <h2>Error 404</h2>,
		children: [
			{
				path: "/",
				element: <Posts />,
				index: true,
			},
			{
				path: "/posts",
				element: <Posts />,
			},
			{
				path: "/new-post",
				element: <NewPost />,
			},
			{
				path: "/new-post/:Id",
				element: <NewPost />,
			},
			{
				path: "/post/:Id",
				element: <PostInfo />,
			},
		],
	},
	{
		path: "/other",
		element: <h2>Other</h2>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
			<GlobalStyle />
		</ApolloProvider>
	</React.StrictMode>
);
