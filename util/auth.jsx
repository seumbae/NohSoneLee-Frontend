import { useState } from "react";
import { tryLogin, trySignup } from "../services/axios";
import axios from "axios";

const API_KEY = "AIzaSyBAhZwglLf75KnvoPcY9iTkLlS3JQDoxCw";

const authenticate = async (mode, email, password, nickname) => {
	const data = { user_id: email, password: password };
	const [ret, setRet] = useState(null);

	tryLogin(data).then((res) => {
		console.log(res.data.data);
		setRet(res);
	});

	const token = ret.data.data.jwt;
	return token;
};

export const createUser = async (data) => {
	trySignup(data).then((res) => {
		console.log(res.data.success);
	});
};

export const login = async (email, password) => {
	return await authenticate("signInWithPassword", email, password);
};
