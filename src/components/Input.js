import React from 'react'

const Input = ({ id, label, onChangeHandler, value, help }) => {
	let inputClasses = 'form-control';

	if (help) {
		inputClasses += ' is-invalid';
	}

  return (
		<div className="mb-3">
			<label className="form-label" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className={inputClasses}
				value={value}
				onChange={onChangeHandler}
			/>
			<span className="invalid-feedback">{help}</span>
		</div>
	);
}

export default Input;
