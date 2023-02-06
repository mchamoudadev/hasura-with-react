import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { DELETE_POST } from "../../graphql/mutations";
import { GET_ALL_POSTS } from "../../graphql/queries";
import {
	Button,
	Category,
	Info,
	InfoContent,
	InfoThumbnail,
	InfoTitle,
	PostInfoCard,
	PostInfoMisc,
} from "../Post/Style";

const GET_POST_INFO = gql`
	query getPostInfo($id: Int) {
		posts(where: { id: { _eq: $id } }) {
			title
			body
			date
			id
			thumbnail
		}
	}
`;

export const PostInfo = () => {
	const { Id } = useParams();
	const navigate = useNavigate();

	const [deletePost] = useMutation(DELETE_POST);

	const { loading, error, data } = useQuery(GET_POST_INFO, {
		variables: { id: Id },
	});

	if (error) {
		return <h2>something went wrong</h2>;
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	// destructing the post
	const { id, thumbnail, title, body, date } = data.posts[0];

	const handleDelete = () => {
		if (!confirm("Are you sure you want to delete this post")) return;

		const { data, error, loading } = deletePost({
			variables: { id: Id },

			update(cache, { data: { deletePost } }) {
				const { posts } = cache.readQuery({
					query: GET_ALL_POSTS,
				});
				cache.writeQuery({
					query: GET_ALL_POSTS,
					data: {
						posts: posts.filter((currentPost) => currentPost.id != Id),
					},
				});
			},
		});
		if (!error) {
			alert("successfully deleted");
			navigate("/");
		}
	};

	return (
		<PostInfoCard>
			<InfoThumbnail src={thumbnail} />
			<InfoTitle>{title}</InfoTitle>
			<PostInfoMisc>
				<Category>
					<span>Coding</span>
				</Category>
				<Info>
					<p>By Mc Hamouda &nbsp;&nbsp;</p> at {new Date(date).toDateString()}
				</Info>
			</PostInfoMisc>
			<InfoContent dangerouslySetInnerHTML={{ __html: body }} />

			<Link to={`/new-post/${id}`}>
				<Button>Update</Button>
			</Link>
			<Button onClick={handleDelete} style={{ background: "red" }}>
				Delete
			</Button>
		</PostInfoCard>
	);
};
