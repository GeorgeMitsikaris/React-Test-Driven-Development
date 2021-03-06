import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import { signup } from "../api/apiCalls"; 
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const SignupPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [apiProgress, setApiProgress] = useState(false);
	const [signUpSuccess, setSignUpSuccess] = useState(false);
	const [errors, setErrors] = useState({});
	const { t } = useTranslation();

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
			await signup(body); 
			setSignUpSuccess(true);
		} catch (error) {
			setSignUpSuccess(false);
			setApiProgress(false);
			if (error.response.status === 400) {
				setErrors(error.response.data.validationErrors);
			}
		}
	};

	let passwordMismatch = password !== repeatPassword ? t("passwordMismatch") : ""; 

	const usernameChangeHandler = (e) => {
		setUsername(e?.target?.value);
		setErrors({});
	};

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
		<div
			className="col-lg-6 col-md-8 offset-lg-3 offset-md-2"
			data-testid="signup-page"
		>
			{!signUpSuccess && (
				<form className="card" data-testid="form-sign-up">
					<div className="card-header">
						<h1 className="text-center">{t("signUp")}</h1>
					</div>
					<div className="card-body">
						<Input
							id="username"
							type="text"
							label={t("username")}
							onChangeHandler={usernameChangeHandler}
							value={username}
							help={errors.username}
						/>
						<Input
							id="email"
							type="email"
							label={t("email")}
							onChangeHandler={emailChangeHandler}
							value={email}
							help={errors.email}
						/>
						<Input
							id="password"
							type="password"
							label={t("password")}
							onChangeHandler={passwordChangeHandler}
							value={password}
							help={errors.password}
						/>
						<Input
							id="passwordRepeat"
							type="password"
							label={t("passwordRepeat")}
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
									<Spinner />
								)}
								{t("signUp")}
							</button>
						</div>
					</div>
				</form>
			)}
			{signUpSuccess && (
				<Alert> Please check your email to activate your account</Alert>					
			)}
		</div>
	);
};

export default SignupPage;
