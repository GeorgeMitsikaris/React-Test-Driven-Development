import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupPage from "./SignupPage";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("The signup page", () => {
	describe("Layout", () => {
		it("has header", () => {
			render(<SignupPage />);
			const header = screen.queryByRole("heading", { name: "Sign Up" });
			expect(header).toBeInTheDocument();
		});

		it("has username input", () => {
			render(<SignupPage />);
			const input = screen.getByLabelText("Username");
			expect(input).toBeInTheDocument();
		});

		it("has email input", () => {
			render(<SignupPage />);
			const input = screen.getByLabelText("Email");
			expect(input).toBeInTheDocument();
		});

		it("has password input", () => {
			render(<SignupPage />);
			const input = screen.getByLabelText("Password");
			expect(input).toBeInTheDocument();
		});

		it("has password type for password input", () => {
			render(<SignupPage />);
			const input = screen.getByLabelText("Password");
			expect(input.type).toBe("password");
		});

		it("has password repeat input", () => {
			render(<SignupPage />);
			const input = screen.getByLabelText("Repeat Password");
			expect(input).toBeInTheDocument();
		});

		it("has password type for password repeat input", () => {
			render(<SignupPage />);
			const input = screen.getByLabelText("Repeat Password");
			expect(input.type).toBe("password");
		});

		it("has sign up button", () => {
			render(<SignupPage />);
			const signUpButton = screen.queryByRole("button", { name: "Sign Up" });
			expect(signUpButton).toBeInTheDocument();
		});

		it("disables sign up button initially", () => {
			render(<SignupPage />);
			const signUpButton = screen.queryByRole("button", { name: "Sign Up" });
			expect(signUpButton).toBeDisabled();
		});
	});

	describe("Interactions", () => {
		let signUpButton;
		const setup = () => {
			render(<SignupPage />);
			const usernameInput = screen.getByLabelText("Username");
			const emailInput = screen.getByLabelText("Email");
			const passwordInput = screen.getByLabelText("Password");
			const passwordRepeatInput = screen.getByLabelText("Repeat Password");
			userEvent.type(usernameInput, "user1");
			userEvent.type(emailInput, "user1@mail.com");
			userEvent.type(passwordInput, "P4ssword");
			userEvent.type(passwordRepeatInput, "P4ssword");
			signUpButton = screen.queryByRole("button", { name: "Sign Up" });
		};

		it("enables button after password and repeat password have the same value", () => {
			setup();
			expect(signUpButton).toBeEnabled(); 
		});

		it("sends username, email and password to backend after clicking the button", async () => {
			let requestBody;
			const server = setupServer(
				rest.post("/api/1.0/users", (req, res, ctx) => {
					requestBody = req.body;
					return res(ctx.status(200));
				})
			);
			server.listen();
			setup();
			userEvent.click(signUpButton);

			await screen.findByText(
				"Please check your email to activate your account"
			);

			expect(requestBody).toEqual({
				username: "user1",
				email: "user1@mail.com",
				password: "P4ssword",
			});
		});

		it("disables the button when a request is going on", async () => {
			let counter = 0;
			const server = setupServer(
				rest.post("/api/1.0/users", (req, res, ctx) => {
					counter++;
					return res(ctx.status(200));
				})
			);
			server.listen();
			setup();
			userEvent.click(signUpButton);
			userEvent.click(signUpButton);

			await new Promise((res) => setTimeout(res, 500));

			await screen.findByText(
				"Please check your email to activate your account"
			);
			expect(counter).toBe(1);
		});

		it("displays a spinner after clicking the submit button", async () => {
			const server = setupServer(
				rest.post("/api/1.0/users", (req, res, ctx) => {
					return res(ctx.status(200));
				})
			);
			server.listen();
			setup();
			expect(screen.queryByRole('status')).not.toBeInTheDocument();

			userEvent.click(signUpButton);

			const spinner = screen.getByRole('status');
			expect(spinner).toBeInTheDocument();
			await screen.findByText(
				"Please check your email to activate your account"
			);
		}); 

		it("displays account activation notification after successful sign up request", async () => {
			const server = setupServer(
				rest.post("/api/1.0/users", (req, res, ctx) => {
					return res(ctx.status(200));
				})
			);
			server.listen();
			setup();
			const message = 'Please check your email to activate your account';
			expect(screen.queryByText(message)).not.toBeInTheDocument(); 
			userEvent.click(signUpButton);
			const text = await screen.findByText(message);
			expect(text).toBeInTheDocument();
		});  

		it ('hides the form after successful sign up request', async () => {
			const server = setupServer(
				rest.post("/api/1.0/users", (req, res, ctx) => {
					return res(ctx.status(200));
				})
			);
			server.listen();
			setup();
			const form = screen.getByTestId('form-sign-up');
			userEvent.click(signUpButton);
		  await	waitFor(() => {
				expect(form).not.toBeInTheDocument();
			})
		})
	});
});
