import React from 'react';

const Messages = ({ message }) => {
	console.log(message);
	console.log('Hello');
	return (
		<div className='message'>
			{message.message} - by-{message.displayName}
		</div>
	);
};

export default Messages;
