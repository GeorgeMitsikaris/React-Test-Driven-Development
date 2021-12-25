import React, { useState } from "react";
import axios from "axios";
import Input from "../components/Input";

const SignupPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [apiProgress, setApiProgress] = useState(false);
	const [signUpSuccess, setSignUpSuccess] = useState(false);
	const [errors, setErrors] = useState({});

	let disabled = true;
	if (password && repeatPassword) {
		disabled = password !== repeatPassword;
	}

	const submit = async (e) => {
		e.preventDefault();
		const body = {
			username,
			email,
			password,
		};
		setApiProgress(true);
		try {
			await axios.post("/api/1.0/users", body)
			setSignUpSuccess(true)				
		} catch (error) {
			setSignUpSuccess(false);		
			setApiProgress(false); 
			if (error.response.status === 400) {
				setErrors(error.response.data.validationErrors);
			}
		} 
	};

	let passwordMismatch = password !== repeatPassword ? 'Password mismatch' : '';

	const usernameChangeHandler = e => {
		setUsername(e?.target?.value); 
		setErrors({});
	}

	const emailChangeHandler = (e) => {
		setEmail(e?.target?.value);
		setErrors({});
	};

	const passwordChangeHandler = (e) => {
		setPassword(e?.target?.value);
		setErrors({});
	};

	const passwordRepeatChangeHandler = (e) => {
		setRepeatPassword(e?.target?.value);
	};

	return (
		<div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
			{!signUpSuccess && (
				<form className="card mt-5" data-testid="form-sign-up">
					<div className="card-header">
						<h1 className="text-center">Sign Up</h1> 
					</div>
					<div className="card-body">
						<Input
							id="username"
							type="text"
							label="Username"
							onChangeHandler={usernameChangeHandler}
							value={username}
							help={errors.username}
						/>
						<Input
							id="email"
							type="email"
							label="Email"
							onChangeHandler={emailChangeHandler}
							value={email}
							help={errors.email}
						/>
						<Input
							id="password"
							type="password"
							label="Password"
							onChangeHandler={passwordChangeHandler}
							value={password}
							help={errors.password}
						/>
						<Input
							id="passwordRepeat"
							type="password"
							label="Repeat Password"
							onChangeHandler={passwordRepeatChangeHandler}
							value={repeatPassword}
							help={passwordMismatch} 
						/>						
						<div className="text-center">
							<button
								className="btn btn-primary"
								disabled={disabled || apiProgress}
								onClick={submit}
							>
								{apiProgress && (
									<span
										className="spinner-border spinner-border-sm"
										role="status"
									></span>
								)}
								Sign Up
							</button>
						</div>
					</div>
				</form>
			)}
			{signUpSuccess && (
				<div className="alert alert-success mt-3">
					Please check your email to activate your account
				</div>
			)}
		</div>
	);
};

export default SignupPage;
