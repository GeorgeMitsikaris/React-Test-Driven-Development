import React from 'react'

const Input = ({id, label, onChangeHandler, value, help}) => {
  return (
		<div className="mb-3">
			<label className="form-label" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className="form-control"
				value={value}
				onChange={onChangeHandler}
			/>
			<div>{help}</div>
		</div>
	);
}

export default Input
