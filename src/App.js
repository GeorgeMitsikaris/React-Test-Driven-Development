import LanguageSelector from "./components/LanguageSelector";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function App() {
	const { t } = useTranslation();
	const [path, setPath] = useState(window.location.pathname);
	const onClickLink = (e) => {
		e.preventDefault();
		const path = e.target.attributes.href.value;
		window.history.pushState({}, "", path);
		setPath(path);
	};
	return (
		<div className="container">
			<a href="/" title="Home" onClick={onClickLink}>
				Hoaxify
			</a>
			<a href="/signup" title="Sign Up" onClick={onClickLink}>
				{t("signUp")}
			</a>
			<a href="/login" title="Login" onClick={onClickLink}>
				Login
			</a>
			{path === "/" && <HomePage />}
			{path === "/signup" && <SignupPage />}
			{path === "/login" && <LoginPage />}
			{path.startsWith("/user") && <UserPage />}
			<LanguageSelector />
		</div>
	);
}

export default App;
