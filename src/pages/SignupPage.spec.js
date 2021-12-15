import { render, screen } from "@testing-library/react";
import SignupPage from "./SignupPage";

describe("The signup page", () => {
	describe("Layout", () => {
		it("has header", () => {
			render(<SignupPage />);
			const header = screen.queryByRole("heading", { name: "Sign Up" });
			expect(header).toBeInTheDocument();
    });
    
    it('has username input', () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    })
    
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
			expect(input.type).toBe('password');
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
    
    it('has sign up button', () => {
      render(<SignupPage />);
      const signUpButton = screen.queryByRole('button', { name: 'Sign Up' });
      expect(signUpButton).toBeInTheDocument();
    })
    
    it("disables sign up button initially", () => {
			render(<SignupPage />);
			const signUpButton = screen.queryByRole("button", { name: "Sign Up" });
			expect(signUpButton).toBeDisabled();
		});
	});
});
