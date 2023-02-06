import React from "react";
import { Card, CardInfo, Category, Title } from "./Style";

export const Post = ({ index, id, title, body, thumbnail, date }) => {
	return (
		<Card to={`/post/${id}`} thumbnail={thumbnail} index={index}>
			<CardInfo>
				<Category>
					<span>Coding</span>
				</Category>
				<Title>{title}</Title>

				{index == 0 && (
					<div>
						<span>Mc Hamouda</span>
						<span>{new Date(date).toDateString()}</span>
					</div>
				)}
			</CardInfo>
		</Card>
	);
};
