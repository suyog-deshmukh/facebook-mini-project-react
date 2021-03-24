import React from 'react';
import './form-input.scss';

const FormInput = ({ handleChange, label, name, ...otherProps }) => {
	return (
		<div className='group'>
			<label
				htmlFor={name}
				className={` form-input-label `}
			>
				{label}
			</label>
			<input
				className='form-input'
				name={name}
				onChange={handleChange}
				{...otherProps}
			/>
	
		</div>
	);
};

export default FormInput;
