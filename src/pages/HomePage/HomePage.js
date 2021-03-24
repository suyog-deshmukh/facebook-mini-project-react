import React from 'react';
import Posts from '../../components/posts/posts';
const HomePage = ({ currentUser }) => {
	console.log(currentUser)
	return (
		<div>
			HOME_PAGE
			<Posts currentUser={currentUser} />
		</div>
	);
};
export default HomePage;
