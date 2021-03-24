import React from 'react';
import Button from '../Button/Button';
import FormInput from '../form-input/form-input';
import { auth } from '../../firebase/firebase.utils';
import './sign-in.scss';

class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			const match = await auth.signInWithEmailAndPassword(email, password);
			console.log(match, 'MATCH');
			this.setState({ email: '', password: '' });
		} catch (err) {
			alert(err.message)
		}
	};

	handleChange = (event) => {
		const { value, name } = event.target;

		this.setState({ [name]: value });
	};
	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						onChange={this.handleChange}
						value={this.state.email}
						type='email'
						label='email'
						required
					/>
					<FormInput
						name='password'
						value={this.state.password}
						type='password'
						onChange={this.handleChange}
						label='password'
						required
					/>
					<div className='buttons'>
						<Button type='submit'>Sign in</Button>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
