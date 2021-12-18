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
		<div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
			<form className="card mt-5">
				<div className="card-header">
					<h1 className="text-center">Sign Up</h1>
				</div>
				<div className="card-body">
					<div className="mb-3">
						<label className="form-label" htmlFor="username">
							Username
						</label>
						<input
							id="username"
							className="form-control"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="email">
							Email
						</label>
						<input
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="password">
							Password
						</label>
						<input
							className="form-control"
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="passwordRepeat">
							Repeat Password
						</label>
						<input
							className="form-control"
							id="passwordRepeat"
							type="password"
							value={repeatPassword}
							onChange={(e) => setRepeatPassword(e.target.value)}
						/>
					</div>
					<div className="text-center">
						<button
							className="btn btn-primary"
							disabled={disabled}
							onClick={submit}
						>
							Sign Up
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignupPage;
