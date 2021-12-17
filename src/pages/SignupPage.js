import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	let disabled = true;
	if (password && repeatPassword) {
		disabled = password !== repeatPassword;
	}

	const submit = (e) => {
		console.log("ok");
		e.preventDefault();
		const body = {
			username,
			email,
			password,
		};
		axios.post("/api/1.0/users", body);
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<form>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor="passwordRepeat">Repeat Password</label>
				<input
					id="passwordRepeat"
					type="password"
					value={repeatPassword}
					onChange={(e) => setRepeatPassword(e.target.value)}
				/>
				<button disabled={disabled} onClick={submit}>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupPage;
