import React from "react";

const SignupPage = () => {
	return (
		<div>
			<h1>Sign Up</h1>
			<label htmlFor="username">Username</label>
			<input id="username" />
			<label htmlFor="email">Email</label>
			<input id="email" />
			<label htmlFor="password">Password</label>
			<input id="password" type="password" />
			<label htmlFor="passwordRepeat">Repeat Password</label>
      <input id="passwordRepeat" type="password" />
      <button disabled>Sign Up</button>
		</div>
	);
};

export default SignupPage;
