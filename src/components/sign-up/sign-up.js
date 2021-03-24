import React from 'react';
import './sign-up.scss';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import Button from '../Button/Button';

class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	}
	handleChange = (event) => {
		event.preventDefault();

		console.log(event.target.name);
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password, displayName } = this.state;
		if (this.state.password !== this.state.confirmPassword) {
			alert('password does not match');
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await createUserProfileDocument(user, { displayName });
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (err) {
			console.log(err);
		}
	};
	render() {
		return (
			<div className='sign-up'>
				<h2>I do not have an account</h2>
				<span>Sign up with email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='displayName'
						onChange={this.handleChange}
						required
						label='Display name'
						value={this.state.displayName}
						type='text'
					/>
					<FormInput
						name='email'
						onChange={this.handleChange}
						value={this.state.email}
						type='email'
						label='email'
						required
					/>
					<FormInput
						onChange={this.handleChange}
						required
						label='password'
						value={this.state.password}
						name='password'
						type='password'
					/>
					<FormInput
						onChange={this.handleChange}
						required
						label='confirm password'
						value={this.state.confirmPassword}
						name='confirmPassword'
						type='password'
					/>
					<Button type='submit'>Sign up</Button>
				</form>
			</div>
		);
	}
}

export default SignUp;
