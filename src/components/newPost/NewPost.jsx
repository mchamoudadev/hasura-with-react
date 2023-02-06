import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { REGISTER_POST, UPDATE_POST } from "../../graphql/mutations";
import { GET_POST } from "../../graphql/queries";
import { Button, Input, Label, PostForm, Preview } from "./Style";

export const NewPost = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [uploaded, setUploaded] = useState(false);
	const [localLoading, setLocalLoading] = useState(false);

	const { Id } = useParams();

	useEffect(() => {
		console.log("uploadaded");
	}, [uploaded]);

	const [registerPost] = useMutation(REGISTER_POST);
	const [updatePost] = useMutation(UPDATE_POST);

	const {
		loading: postLoading,
		data: postData,
		error: postError,
	} = useQuery(GET_POST, {
		variables: { id: Id },
	});

	useEffect(() => {
		if (Id && postData) {
			const { id, thumbnail, title, body, date } = postData.posts[0];

			console.log(id, thumbnail, title, body, date);
			setTitle(title);
			setBody(body);
			setThumbnail(thumbnail);
			setImagePreview(thumbnail);
		}
	}, [postData]);

	const handleUploadImage = async () => {
		try {
			const formData = new FormData();
			formData.append("file", selectedFile);
			formData.append("upload_preset", "apollo-graphql");

			setLocalLoading(true);
			const { data } = await axios.post(
				"https://api.cloudinary.com/v1_1/dbxqm6pz0/image/upload",
				formData
			);
			console.log(data);
			setUploaded(true);
			setThumbnail(data.url);
			setLocalLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleImageSelect = (event) => {
		setUploaded(false);
		const file = event.target.files[0];
		setSelectedFile(file);
		setImagePreview(window.URL.createObjectURL(file));
	};

	const handleQuilChange = (event) => {
		setBody(event);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!thumbnail || !title || !body) return alert("Please fill empty Fields");

		try {
			if (Id) {
				const { data, loading, error } = updatePost({
					variables: {
						id: Id,
						title,
						body,
						thumbnail,
					},
				});
			} else {
				const { data, loading, error } = registerPost({
					variables: {
						title,
						body,
						thumbnail,
					},
				});
			}

			// if (error) return alert("something wrong  please try again");
			// if (loading) setLocalLoading(true);
			setTitle("");
			setBody("");
			setThumbnail("");
			setImagePreview("");
			setSelectedFile("");
			alert("success!");
		} catch (err) {
			alert(err);
			console.log(err);
		}
	};

	return (
		<PostForm onSubmit={handleSubmit}>
			<Label>Post Title</Label>
			<Input
				type="text"
				onChange={(event) => setTitle(event.target.value)}
				placeholder="Post Title"
				id="title"
				name="title"
				value={title}
			/>
			<Label>Post Body</Label>
			<ReactQuill
				onChange={handleQuilChange}
				theme="snow"
				modules={NewPost.modules}
				formats={NewPost.formats}
				value={body}
			/>
			{imagePreview && <Preview src={imagePreview} />}
			<Input type="file" id="fname" name="fname" onChange={handleImageSelect} />
			<Button type="button" disabled={localLoading} onClick={handleUploadImage}>
				{localLoading ? "uploading..." : "upload"}
			</Button>

			<Button type="submit" disabled={localLoading}>
				{localLoading ? "loading..." : Id ? "Update" : "Register"}
			</Button>
		</PostForm>
	);
};

NewPost.modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image", "video"],
		["clean"],
		["code-block"],
	],
};

NewPost.formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"link",
	"image",
	"video",
	"code-block",
];
