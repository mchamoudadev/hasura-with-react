import React from "react";
import { Logo, Menu, MenuItem, Nav } from "./Style";

export const Header = () => {
	return (
		<Nav>
			<Logo to="/">Hacker News</Logo>
			<Menu>
				<MenuItem to="/posts">Posts</MenuItem>
				<MenuItem to="/new-post">New Post</MenuItem>
				<MenuItem to="/other">Other Page</MenuItem>
			</Menu>
		</Nav>
	);
};
