import React, { useState } from "react";

const SignupPage = () => {
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	let disabled = true;
	if (password && repeatPassword) {
		disabled = password !== repeatPassword;
	}
	return (
		<div>
			<h1>Sign Up</h1>
			<label htmlFor="username">Username</label>
			<input id="username" />
			<label htmlFor="email">Email</label>
			<input id="email" />
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
			<button disabled={disabled}>Sign Up</button>
		</div> 
	);
};

export default SignupPage;
