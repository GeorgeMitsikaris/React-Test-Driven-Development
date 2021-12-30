import LanguageSelector from './components/LanguageSelector';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserPage from "./pages/UserPage";

function App() {
  return (
		<div className="container">
			{window.location.pathname === "/" && <HomePage />}
			{window.location.pathname === "/signup" && <SignupPage />}
			{window.location.pathname === "/login" && <LoginPage />}
			{window.location.pathname.startsWith("/user") && <UserPage />}
			<LanguageSelector />
		</div>
	);
}

export default App;
