import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

import './Header.scss';
const Header = ({ currentUser }) => {
	return (
		<div className='header'>
			<div className='logo-container'>
				<Link to='/'>LOGO</Link>
			</div>
			<div className='options'>
				<Link className='option' to='/my-posts'>
					My posts
				</Link>
				{currentUser ? (
					<div className='option' onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				) : (
					<Link className='option' to='/signin'>
						SIGN IN
					</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
