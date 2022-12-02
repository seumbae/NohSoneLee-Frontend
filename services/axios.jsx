import axios from "axios";

const API = axios.create({
	baseURL: "http://54.180.201.167:12854",
	// headers: {
	//   "Content-Type": "application/json",
	// },
});

/* Login */
export const tryLogin = (data) =>{return API.post("/users/login", data);}
export const trySignup = async (data) => await API.post("/users/signup", data);

/* Board */
export const getBoardList = async () => await API.get("/board/list");
export const getBoardDetail = async (id) => await API.get(`/board/${id}`);
export const WriteBoard = async (token, title, content, topic, id) =>
	await API.post(
		"/board/write",
		{ title: title, content: content, topic: topic, school_id: id },
		{
			headers: { "Access-Token": token },
		}
	);
export const EditBoard = async (data) => await API.put("/board/edit", data);

/* Comments */
export const WriteComment = async (token, data) =>
	await API.post("/commnet/write", data, {
		headers: { "Access-Token": token },
	});
export const EditComment = async (data) => await API.put("/comment/edit", data);

/* Follow */
export const getFollowList = async (token) =>
	await API.get(`/users/follow`, {
		headers: { "Access-Token": token },
	});
export const addFollow = async (token, id) =>
	await API.post(
		`/users/follow/add`,
		{ school_id: id },
		{
			headers: { "Access-Token": token },
		}
	);
export const deleteFollow = async (token, id) =>
	await API.delete(`/users/follow/delete`, {
		headers: { "Access-Token": token },
		data: { school_id: id },
	});

/* School */
export const getSchool = async (id) => await API.get(`/school/${id}/info`);

/* Like */
export const addLike = async (token, data) =>
	await API.post(`/users/like/add`, data, {
		headers: { "Access-Token": token },
	});

export const deleteLike = async (token, id) =>
	await API.delete(`/users/like/delete`, {
		headers: { "Access-Token": token },
		data: data,
	});

/* Refer Rank */
export const getRank = async () => await API.get(`/school/ranked/list`);

/* Search */
export const searchBoard = async () => await API.get(`/board?searchWord=학`);

export default API;
