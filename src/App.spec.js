import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
	rest.post("/api/1.0/users/token/:token", (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.get("/api/1.0/users", (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				content: [],
				page: 0,
				size: 0,
				totalPages: 0,
			})
		);
	})
);

beforeEach(() => {
	server.resetHandlers();
});
beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Routing", () => {
	const setup = (path) => {
		window.history.pushState({}, "", path);
		render(<App />);
	};

	it.each`
		path               | pageTestId
		${"/"}             | ${"home-page"}
		${"/signup"}       | ${"signup-page"}
		${"/login"}        | ${"login-page"}
		${"/user/1"}       | ${"user-page"}
		${"/user/2"}       | ${"user-page"}
		${"/activate/123"} | ${"activation-page"}
		${"/activate/456"} | ${"activation-page"}
	`("displays $pageTestId when path is $path", ({ path, pageTestId }) => {
		setup(path, pageTestId);
		const page = screen.queryByTestId(pageTestId);
		expect(page).toBeInTheDocument();
	});

	it.each`
		path               | pageTestId
		${"/"}             | ${"signup-page"}
		${"/"}             | ${"login-page"}
		${"/"}             | ${"user-page"}
		${"/"}             | ${"activation-page"}
		${"/signup"}       | ${"home-page"}
		${"/signup"}       | ${"login-page"}
		${"/signup"}       | ${"user-page"}
		${"/signup"}       | ${"activation-page"}
		${"/login"}        | ${"home-page"}
		${"/login"}        | ${"signup-page"}
		${"/login"}        | ${"user-page"}
		${"/login"}        | ${"activation-page"}
		${"/user/1"}       | ${"home-page"}
		${"/user/1"}       | ${"signup-page"}
		${"/user/1"}       | ${"login-page"}
		${"/user/1"}       | ${"activation-page"}
		${"/activate/123"} | ${"signup-page"}
		${"/activate/123"} | ${"login-page"}
		${"/activate/123"} | ${"user-page"}
		${"/activate/123"} | ${"home-page"}
	`(
		"does not display $pageTestId when path is $path",
		({ path, pageTestId }) => {
			setup(path);
			const page = screen.queryByTestId(pageTestId);
			expect(page).not.toBeInTheDocument();
		}
	);

	it.each`
		targetPage
		${"Home"}
		${"Sign Up"}
		${"Login"}
	`("has link to homepage on NavBar", ({ targetPage }) => {
		setup("/");
		const link = screen.getByRole("link", { name: targetPage });
		expect(link).toBeInTheDocument();
	});

	it.each` 
		initialPath  | clickinTo    | visiblePage
		${"/"}       | ${"Sign Up"} | ${"signup-page"}
		${"/signup"} | ${"Home"}    | ${"home-page"}
		${"/signup"} | ${"Login"}    | ${"login-page"}
	`(
		"displays sign up page after clicking sign up link",
		({ initialPath, clickinTo, visiblePage }) => {
			setup(initialPath);
			const link = screen.getByRole("link", { name: clickinTo });
			userEvent.click(link);
			expect(screen.getByTestId(visiblePage)).toBeInTheDocument();
		}
	);

	it('displays home page when clicking brand logo', () => {
		setup('/login');
		const logo = screen.queryByAltText('Hoaxify Logo');
		userEvent.click(logo);
		expect(screen.getByTestId('home-page')).toBeInTheDocument();
	})
});

console.error = () => { };
