import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupPage from "./SignupPage";
import { setupServer } from 'msw/node';
import { rest } from 'msw';

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
		it("enables button after password and repeat password have the same value", () => {
			render(<SignupPage />);
			const passwordInput = screen.getByLabelText("Password");
			const passwordRepeatInput = screen.getByLabelText("Repeat Password");
			userEvent.type(passwordInput, "P4ssword");
			userEvent.type(passwordRepeatInput, "P4ssword");
			const signUpButton = screen.queryByRole("button", { name: "Sign Up" });
			expect(signUpButton).toBeEnabled();
		});

		it("sends username, email and password to backend after clicking the button", async () => {
			let requestBody;
			const server = setupServer(
				rest.post("/api/1.0/users", (req, res, ctx) => {
					requestBody = req.body; 
					return res(ctx.status(200));
			})); 
			server.listen();
			render(<SignupPage />);
			const usernameInput = screen.getByLabelText("Username");
			const emailInput = screen.getByLabelText("Email");
			const passwordInput = screen.getByLabelText("Password");
			const passwordRepeatInput = screen.getByLabelText("Repeat Password");
			userEvent.type(usernameInput, "user1");
			userEvent.type(emailInput, "user1@mail.com");
			userEvent.type(passwordInput, "P4ssword");
			userEvent.type(passwordRepeatInput, "P4ssword");
			const signUpButton = screen.queryByRole("button", { name: "Sign Up" });
			userEvent.click(signUpButton);

			await new Promise((res) => setTimeout(res, 500));
			
			expect(requestBody).toEqual({ 
				username: "user1",
				email: "user1@mail.com",
				password: "P4ssword",
			});
		});
	});
});
